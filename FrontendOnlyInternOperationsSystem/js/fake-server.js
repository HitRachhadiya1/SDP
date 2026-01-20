/**
 * Fake Server / Mock API
 * Simulates async backend operations with latency and random errors
 */
(function() {
    window.InternSystem = window.InternSystem || {};

    const DELAY_MIN = 300;
    const DELAY_MAX = 800;

    // Helper to simulate network latency
    const simulateNetwork = (callback) => {
        const delay = Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN + 1)) + DELAY_MIN;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(callback());
            }, delay);
        });
    };

    window.InternSystem.Server = {
        /**
         * Check if an email is unique among interns
         * @param {string} email - Email to check
         * @returns {Promise<{unique: boolean, message: string}>}
         */
        checkEmailUniqueness: (email) => {
            return simulateNetwork(() => {
                const state = window.InternSystem.State.getState();
                const exists = state.interns.some(intern => intern.email.toLowerCase() === email.toLowerCase());
                return {
                    unique: !exists,
                    message: exists ? 'Email already exists.' : 'Email is available.'
                };
            });
        },

        /**
         * Simulate saving a new intern
         * @param {Object} internData - The intern object to save
         * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
         */
        saveIntern: (internData) => {
            return simulateNetwork(() => {
                // Simulate random server error (5% chance)
                if (Math.random() < 0.05) {
                    return { success: false, data: null, error: 'Internal Server Error: Could not save intern.' };
                }

                // In a real app, we would assign ID here, but our Rules engine does it before calling save
                // We just return the data effectively echoing back the "saved" entity
                return { success: true, data: internData, error: null };
            });
        },

        /**
         * Simulate saving a new task
         * @param {Object} taskData - The task object to save
         * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
         */
        saveTask: (taskData) => {
            return simulateNetwork(() => {
                 // Simulate random server error (2% chance)
                 if (Math.random() < 0.02) {
                    return { success: false, data: null, error: 'Internal Server Error: Could not save task.' };
                }
                return { success: true, data: taskData, error: null };
            });
        },

        /**
         * Update an intern's status
         * @param {string} internId - ID of the intern
         * @param {string} newStatus - New status string
         * @returns {Promise<{success: boolean, data: Object|null}>}
         */
        updateInternStatus: (internId, newStatus) => {
            return simulateNetwork(() => {
                const state = window.InternSystem.State.getState();
                const intern = state.interns.find(i => i.id === internId);
                
                if (!intern) {
                    return { success: false, data: null, error: 'Intern not found' };
                }
                
                const updatedIntern = { ...intern, status: newStatus };
                return { success: true, data: updatedIntern };
            });
        },

        /**
         * Validate task dependencies for circular references
         * @param {string} taskId - ID of the task being updated/created
         * @param {string[]} dependencyIds - Array of dependency IDs
         * @returns {Promise<{valid: boolean, circularDependency: boolean, message: string}>}
         */
        validateTaskDependencies: (taskId, dependencyIds) => {
            return simulateNetwork(() => {
                const state = window.InternSystem.State.getState();
                const tasks = state.tasks;

                // Simple DFS to detect cycle
                const hasCycle = (currentId, visited) => {
                    if (visited.has(currentId)) return true;
                    if (currentId === taskId) return true; // Cycle back to self

                    visited.add(currentId);
                    const task = tasks.find(t => t.id === currentId);
                    if (!task || !task.dependencies) return false;

                    for (const depId of task.dependencies) {
                        if (hasCycle(depId, new Set(visited))) return true;
                    }
                    return false;
                };

                for (const depId of dependencyIds) {
                    if (depId === taskId) {
                        return { valid: false, circularDependency: true, message: 'Task cannot depend on itself.' };
                    }
                    if (hasCycle(depId, new Set())) {
                         return { valid: false, circularDependency: true, message: 'Circular dependency detected.' };
                    }
                }

                return { valid: true, circularDependency: false, message: 'Dependencies are valid.' };
            });
        },
        
        // Expose mock fetch for list views if needed
        getInterns: () => {
             return simulateNetwork(() => {
                 return window.InternSystem.State.getState().interns;
             });
        }
    };

    console.log('Fake Server Initialized');
})();
