/**
 * Rules Engine
 * Encapsulates all business logic and complex validations
 */
(function() {
    window.InternSystem = window.InternSystem || {};

    const VALID_STATUSES = ['ONBOARDING', 'ACTIVE', 'EXITED'];

    window.InternSystem.Rules = {
        
        // --- 1. Intern Lifecycle ---

        /**
         * Check if a status transition is allowed
         * @param {string} currentStatus 
         * @param {string} newStatus 
         * @returns {{allowed: boolean, reason: string}}
         */
        canTransitionStatus: (currentStatus, newStatus) => {
            if (!VALID_STATUSES.includes(newStatus)) {
                return { allowed: false, reason: 'Invalid status.' };
            }
            if (currentStatus === newStatus) {
                return { allowed: false, reason: 'Already in this status.' };
            }

            if (currentStatus === 'ONBOARDING' && newStatus === 'ACTIVE') {
                return { allowed: true, reason: 'Onboarding complete.' };
            }
            if (currentStatus === 'ACTIVE' && newStatus === 'EXITED') {
                return { allowed: true, reason: 'Intern exiting program.' };
            }
            if (currentStatus === 'EXITED' && newStatus === 'ACTIVE') {
                return { allowed: false, reason: 'Exited interns cannot return to Active status directly.' };
            }
            if (currentStatus === 'ONBOARDING' && newStatus === 'EXITED') {
                return { allowed: false, reason: 'Cannot exit during onboarding without activation.' };
            }
            
            // Allow backward transition for correction? Let's say no for strict rules, 
            // but maybe Active -> Onboarding is weird. 
            // Default deny for unspecified transitions.
            return { allowed: false, reason: `Transition from ${currentStatus} to ${newStatus} is not allowed.` };
        },

        // --- 2. Task Assignment ---

        /**
         * Check if task can be assigned to intern
         * @param {Object} intern 
         * @param {Object} task 
         * @returns {{canAssign: boolean, reason: string}}
         */
        canAssignTask: (intern, task) => {
            if (intern.status !== 'ACTIVE') {
                 return { canAssign: false, reason: 'Intern must be ACTIVE to receive tasks.' };
            }
            
            // Check matching skills
            // Example: Task requires ['JS'], Intern has ['JS', 'HTML'] -> OK
            // Example: Task requires ['JS', 'React'], Intern has ['JS'] -> Fail
            const missingSkills = task.requiredSkills.filter(skill => !intern.skills.includes(skill));
            if (missingSkills.length > 0) {
                return { canAssign: false, reason: `Missing required skills: ${missingSkills.join(', ')}` };
            }

            if (task.assignedTo === intern.id) {
                 return { canAssign: false, reason: 'Task already assigned to this intern.' };
            }

            return { canAssign: true, reason: 'Assignment valid.' };
        },

        /**
         * Get list of eligible interns for a task
         * @param {Object} task 
         * @returns {Object[]} Array of eligible intern objects
         */
        getEligibleInternsForTask: (task) => {
            const state = window.InternSystem.State.getState();
            return state.interns.filter(intern => {
                const check = window.InternSystem.Rules.canAssignTask(intern, task);
                return check.canAssign;
            });
        },

        // --- 3. Dependency Management (Enhanced with DFS) ---

        /**
         * Build a dependency graph from all tasks
         * Creates an adjacency list representation where each task points to its dependencies
         * @returns {Object} Graph in format { taskId: [dependencyId1, dependencyId2, ...] }
         */
        buildDependencyGraph: () => {
            const state = window.InternSystem.State.getState();
            const graph = {};
            
            // Initialize all tasks in the graph
            state.tasks.forEach(task => {
                graph[task.id] = task.dependencies || [];
            });
            
            return graph;
        },

        /**
         * Detect circular dependency using Depth-First Search (DFS) algorithm
         * 
         * Algorithm explanation:
         * 1. We use three states for each node: UNVISITED, VISITING, VISITED
         * 2. UNVISITED: Node hasn't been explored yet
         * 3. VISITING: Node is currently in the DFS stack (part of current path)
         * 4. VISITED: Node and all its descendants have been fully explored
         * 5. If we encounter a VISITING node during DFS, we've found a cycle
         * 
         * @param {string} taskId - The task being edited/created
         * @param {string[]} proposedDependencies - New dependencies to check
         * @returns {{hasCircular: boolean, path: string[], cycle: string[]}}
         */
        detectCircularDependency: (taskId, proposedDependencies) => {
            const state = window.InternSystem.State.getState();
            
            // Build graph with proposed dependencies
            const graph = {};
            state.tasks.forEach(task => {
                if (task.id === taskId) {
                    // Use proposed dependencies for the task being edited
                    graph[task.id] = proposedDependencies || [];
                } else {
                    graph[task.id] = task.dependencies || [];
                }
            });
            
            // If taskId is new (not in state), add it to the graph
            if (!graph[taskId]) {
                graph[taskId] = proposedDependencies || [];
            }

            // DFS state constants
            const UNVISITED = 0;
            const VISITING = 1;  // Currently in the recursion stack
            const VISITED = 2;   // Fully processed

            // Initialize all nodes as unvisited
            const nodeState = {};
            Object.keys(graph).forEach(id => nodeState[id] = UNVISITED);

            // Track the path for debugging
            let cyclePath = [];
            let foundCycle = false;

            /**
             * DFS helper function
             * @param {string} nodeId - Current node being visited
             * @param {string[]} path - Current path in the DFS traversal
             * @returns {boolean} - True if cycle detected
             */
            const dfs = (nodeId, path) => {
                // If already found a cycle, stop searching
                if (foundCycle) return true;

                // If node doesn't exist in graph (invalid dependency), skip
                if (nodeState[nodeId] === undefined) {
                    return false;
                }

                // If we're visiting a node that's currently in our path, we found a cycle!
                if (nodeState[nodeId] === VISITING) {
                    foundCycle = true;
                    // Extract the cycle from the path
                    const cycleStart = path.indexOf(nodeId);
                    cyclePath = [...path.slice(cycleStart), nodeId];
                    return true;
                }

                // If already fully visited, no cycle through this path
                if (nodeState[nodeId] === VISITED) {
                    return false;
                }

                // Mark as visiting (in current recursion stack)
                nodeState[nodeId] = VISITING;
                path.push(nodeId);

                // Visit all dependencies (edges going FROM this node)
                const dependencies = graph[nodeId] || [];
                for (const depId of dependencies) {
                    if (dfs(depId, path)) {
                        return true;
                    }
                }

                // Mark as fully visited and remove from current path
                nodeState[nodeId] = VISITED;
                path.pop();

                return false;
            };

            // Start DFS from the task being edited
            dfs(taskId, []);

            return {
                hasCircular: foundCycle,
                path: cyclePath,
                cycle: cyclePath  // Alias for clarity
            };
        },

        /**
         * Get all tasks that depend on a given task (tasks blocked by this task)
         * @param {string} taskId 
         * @returns {string[]} List of task IDs that depend on this task
         */
        getBlockedTasks: (taskId) => {
            const state = window.InternSystem.State.getState();
            return state.tasks
                .filter(t => t.dependencies && t.dependencies.includes(taskId))
                .map(t => t.id);
        },

        /**
         * Get all tasks that will be unblocked if this task is marked as DONE
         * @param {string} taskId 
         * @returns {{taskId: string, title: string, willBeReady: boolean}[]}
         */
        getUnblockedIfCompleted: (taskId) => {
            const state = window.InternSystem.State.getState();
            const blockedTaskIds = window.InternSystem.Rules.getBlockedTasks(taskId);
            
            return blockedTaskIds.map(blockedId => {
                const blockedTask = state.tasks.find(t => t.id === blockedId);
                if (!blockedTask) return null;

                // Check if all OTHER dependencies (excluding current task) are DONE
                const otherDeps = blockedTask.dependencies.filter(d => d !== taskId);
                const allOthersDone = otherDeps.every(depId => {
                    const depTask = state.tasks.find(t => t.id === depId);
                    return depTask && depTask.status === 'DONE';
                });

                return {
                    taskId: blockedId,
                    title: blockedTask.title,
                    status: blockedTask.status,
                    willBeReady: allOthersDone
                };
            }).filter(Boolean);
        },

        /**
         * Get the complete dependency chain for a task (all dependencies, recursively)
         * @param {string} taskId 
         * @param {Set} visited - To prevent infinite loops
         * @returns {Object[]} Array of dependency info objects with depth
         */
        getDependencyChain: (taskId, visited = new Set()) => {
            const state = window.InternSystem.State.getState();
            const task = state.tasks.find(t => t.id === taskId);
            
            if (!task || visited.has(taskId)) return [];
            visited.add(taskId);

            const chain = [];
            const dependencies = task.dependencies || [];

            dependencies.forEach(depId => {
                const depTask = state.tasks.find(t => t.id === depId);
                if (depTask) {
                    chain.push({
                        id: depTask.id,
                        title: depTask.title,
                        status: depTask.status,
                        isBlocking: depTask.status !== 'DONE'
                    });
                    // Recursively get sub-dependencies
                    const subDeps = window.InternSystem.Rules.getDependencyChain(depId, visited);
                    chain.push(...subDeps.map(d => ({ ...d, depth: (d.depth || 0) + 1 })));
                }
            });

            return chain;
        },

        /**
         * Analyze the impact of completing a task
         * @param {string} taskId 
         * @returns {Object} Impact analysis
         */
        analyzeDependencyImpact: (taskId) => {
            const state = window.InternSystem.State.getState();
            const task = state.tasks.find(t => t.id === taskId);
            if (!task) return null;

            const blockedTasks = window.InternSystem.Rules.getBlockedTasks(taskId);
            const unblockedTasks = window.InternSystem.Rules.getUnblockedIfCompleted(taskId);
            const dependencyChain = window.InternSystem.Rules.getDependencyChain(taskId);
            const blockingDeps = dependencyChain.filter(d => d.isBlocking);

            return {
                taskId,
                taskTitle: task.title,
                currentStatus: task.status,
                totalBlockedTasks: blockedTasks.length,
                tasksWillBeReady: unblockedTasks.filter(t => t.willBeReady).length,
                unblockedDetails: unblockedTasks,
                dependencyChain,
                blockingDependencies: blockingDeps,
                canComplete: blockingDeps.length === 0
            };
        },

        /**
         * Check if a task can be marked as DONE
         * @param {string} taskId 
         * @returns {{canMark: boolean, blockedBy: string[]}}
         */
        canMarkTaskDone: (taskId) => {
            const state = window.InternSystem.State.getState();
            const task = state.tasks.find(t => t.id === taskId);
            
            if (!task) return { canMark: false, blockedBy: [] };
            
            const blockedBy = [];
            task.dependencies.forEach(depId => {
                const depTask = state.tasks.find(t => t.id === depId);
                // If dependency task exists and is not DONE, it blocks
                if (depTask && depTask.status !== 'DONE') {
                    blockedBy.push(depTask.title || depId);
                }
            });

            return { canMark: blockedBy.length === 0, blockedBy };
        },

        // --- 4. Calculations ---

        calculateInternTaskCount: (internId) => {
            const state = window.InternSystem.State.getState();
            return state.tasks.filter(t => t.assignedTo === internId).length;
        },

        calculateTotalEstimatedHours: (internId) => {
            const state = window.InternSystem.State.getState();
             return state.tasks
                .filter(t => t.assignedTo === internId)
                .reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
        },

        getTaskCompletionPercentage: (internId) => {
            const state = window.InternSystem.State.getState();
            const tasks = state.tasks.filter(t => t.assignedTo === internId);
            if (tasks.length === 0) return 0;
            
            const doneCount = tasks.filter(t => t.status === 'DONE').length;
            return Math.round((doneCount / tasks.length) * 100);
        },

        // --- 5. ID Generation ---

        generateInternId: () => {
            const state = window.InternSystem.State.getState();
            const nextNum = (state.lastInternId || 0) + 1;
            // Pad 3 digits
            const seq = String(nextNum).padStart(3, '0');
            return `2026-${seq}`;
        },

        generateTaskId: () => {
            const state = window.InternSystem.State.getState();
            // Just count tasks for simple ID generation for now
            // Or better: parse max ID logic. 
            // Simple logic for this prototype:
            const nextId = state.tasks.length + 1;
            const seq = String(nextId).padStart(3, '0');
            return `TASK-${seq}`;
        }
    };
    
    console.log('Rules Engine Initialized');
})();
