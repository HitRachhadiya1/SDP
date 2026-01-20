/**
 * Main Application Entry Point
 * Wires together all modules and handles application lifecycle
 */
(function() {
    'use strict';

    const { State, Renderer, Server, Rules, Validators } = window.InternSystem;

    // =====================================================
    // UTILITY FUNCTIONS
    // =====================================================

    /**
     * Debounce function to limit rapid calls
     * @param {Function} func 
     * @param {number} wait 
     * @returns {Function}
     */
    const debounce = (func, wait = 300) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    /**
     * Show success toast message
     * @param {string} message 
     */
    const showSuccessMessage = (message) => {
        // Create success toast
        const toast = document.createElement('div');
        toast.className = 'toast success-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">✓ ${message}</span>
                <button class="toast-close">&times;</button>
            </div>
        `;
        document.body.appendChild(toast);

        // Inject success styles if needed
        injectSuccessToastStyles();

        // Auto-remove after 3 seconds
        setTimeout(() => toast.remove(), 3000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    };

    /**
     * Show custom confirm dialog
     * @param {string} message 
     * @param {Function} onConfirm 
     * @param {Function} onCancel 
     */
    const showConfirmDialog = (message, onConfirm, onCancel = () => {}) => {
        const dialog = document.createElement('div');
        dialog.className = 'modal-overlay';
        dialog.id = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <h3>Confirm Action</h3>
                <p>${message}</p>
                <div class="modal-actions mt-4">
                    <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
                    <button class="btn btn-primary" id="confirm-ok">Confirm</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);

        document.getElementById('confirm-cancel').addEventListener('click', () => {
            dialog.remove();
            onCancel();
        });

        document.getElementById('confirm-ok').addEventListener('click', () => {
            dialog.remove();
            onConfirm();
        });
    };

    /**
     * Show custom alert dialog
     * @param {string} title 
     * @param {string} message 
     * @param {Function} onOk 
     */
    const showAlertDialog = (title, message, onOk = () => {}) => {
        const dialog = document.createElement('div');
        dialog.className = 'modal-overlay';
        dialog.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <h3>${title}</h3>
                <div class="mt-2 text-secondary">${message}</div>
                <div class="modal-actions mt-4" style="justify-content: flex-end;">
                    <button class="btn btn-primary" id="alert-ok">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);

        document.getElementById('alert-ok').addEventListener('click', () => {
            dialog.remove();
            onOk();
        });
    };

    /**
     * Inject success toast styles
     */
    const injectSuccessToastStyles = () => {
        if (document.getElementById('success-toast-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'success-toast-styles';
        styles.textContent = `
            .success-toast {
                position: fixed;
                top: var(--spacing-xl);
                right: var(--spacing-xl);
                background-color: var(--bg-surface);
                border-left: 4px solid var(--success-color);
                box-shadow: var(--shadow-lg);
                border-radius: var(--radius-md);
                padding: var(--spacing-md) var(--spacing-lg);
                z-index: 1100;
                animation: slideIn 0.3s ease;
            }
            @keyframes slideIn {
                from { transform: translateX(20px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    };

    // =====================================================
    // 6. RENDER CURRENT VIEW
    // =====================================================

    /**
     * Render the current view based on state
     */
    const renderCurrentView = () => {
        const state = State.getState();

        // Security check
        if (!state.isAuthenticated) {
            Renderer.renderLogin();
            return;
        }

        switch (state.currentView) {
            case 'login':
                Renderer.renderLogin();
                break;
            case 'dashboard':
                Renderer.renderDashboard();
                break;
            case 'interns':
                Renderer.renderInternList();
                break;
            case 'tasks':
                Renderer.renderTaskList();
                break;
            default:
                Renderer.renderDashboard();
        }
    };

    // =====================================================
    // 2. NAVIGATION HANDLERS
    // =====================================================

    /**
     * Setup navigation event listeners
     */
    const setupNavigation = () => {
        // Handle hash-based navigation
        window.addEventListener('hashchange', handleHashChange);

        // Initial route
        handleHashChange();

        // Subscribe to state changes
        State.subscribeToState((newState) => {
            renderCurrentView();
            Renderer.renderNavigation();
        });
    };

    /**
     * Handle hash changes for navigation
     */
    const handleHashChange = () => {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const currentState = State.getState();

        if (currentState.currentView !== hash) {
            State.updateState({ currentView: hash });
            State.addLog('NAVIGATE', `Navigated to ${hash}`);
        } else {
            // Still render for initial load
            renderCurrentView();
            Renderer.renderNavigation();
        }
    };

    /**
     * Setup keyboard shortcuts
     */
    const setupKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            // Alt + D = Dashboard
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                window.location.hash = 'dashboard';
            }
            // Alt + I = Interns
            if (e.altKey && e.key === 'i') {
                e.preventDefault();
                window.location.hash = 'interns';
            }
            // Alt + T = Tasks
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                window.location.hash = 'tasks';
            }
            // Escape = Close modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal-overlay');
                if (modal) modal.remove();
            }
        });
    };

    // =====================================================
    // 3. INTERN MANAGEMENT EVENT HANDLERS
    // =====================================================

    /**
     * Handle intern form submission
     * @param {Event} event 
     * @param {string} mode - 'create' or 'edit'
     * @param {string} internId - For edit mode
     */
    const handleInternFormSubmit = async (event, mode, internId = null) => {
        event.preventDefault();

        const form = event.target;
        const nameValue = form.querySelector('#intern-name').value;
        const emailValue = form.querySelector('#intern-email').value;
        const skillCheckboxes = form.querySelectorAll('input[name="intern-skill"]:checked');
        const skills = Array.from(skillCheckboxes).map(cb => cb.value);
        const statusSelect = form.querySelector('#intern-status');
        const status = statusSelect ? statusSelect.value : 'ONBOARDING';

        const formData = { name: nameValue, email: emailValue, skills, status };

        // Validate
        const validation = Validators.validateInternForm(formData, internId);
        if (!validation.isValid) {
            validation.errors.forEach(err => {
                const errorEl = document.getElementById(`${err.field}-error`);
                if (errorEl) errorEl.textContent = err.message;
            });
            return;
        }

        Renderer.renderLoading(true);

        try {
            // Check email uniqueness for new interns
            if (mode === 'create') {
                const emailCheck = await Server.checkEmailUniqueness(emailValue);
                if (!emailCheck.unique) {
                    Renderer.renderLoading(false);
                    Renderer.renderError('Email already exists');
                    return;
                }
            }

            if (mode === 'create') {
                const newId = Rules.generateInternId();
                const password = Math.random().toString(36).slice(2, 9).padEnd(7, 'x'); // Ensure 7 chars

                const newIntern = {
                    id: newId,
                    name: nameValue.trim(),
                    email: emailValue.trim().toLowerCase(),
                    password: password,
                    skills,
                    status: 'ONBOARDING',
                    createdAt: new Date()
                };

                const result = await Server.saveIntern(newIntern);
                if (result.success) {
                    const state = State.getState();
                    State.updateState({
                        interns: [...state.interns, newIntern],
                        lastInternId: state.lastInternId + 1
                    });
                    State.addLog('ADD_INTERN', `Added intern: ${newIntern.name}`);
                    
                    showAlertDialog(
                        'Intern Account Created',
                        `<div>
                            <p class="mb-2">The intern has been successfully added.</p>
                            <div style="background: #f8f9fa; padding: 1rem; border-radius: 6px; border: 1px solid #e9ecef;">
                                <div style="margin-bottom: 0.5rem;"><strong>Email:</strong> ${newIntern.email}</div>
                                <div><strong>Password:</strong> <span style="font-family: monospace; font-size: 1.25em; font-weight: bold; color: var(--primary-color);">${password}</span></div>
                            </div>
                            <p class="mt-2" style="font-size: 0.875rem; color: #6c757d;">Please share these credentials with the intern.</p>
                        </div>`,
                        () => {
                            window.location.hash = 'interns';
                        }
                    );
                } else {
                    Renderer.renderError(result.error || 'Failed to save intern');
                }
            } else {
                // Edit mode
                const state = State.getState();
                const currentIntern = state.interns.find(i => i.id === internId);
                
                // Check status transition if status changed
                if (currentIntern && currentIntern.status !== status) {
                    const canTransition = Rules.canTransitionStatus(currentIntern.status, status);
                    if (!canTransition.allowed) {
                        Renderer.renderLoading(false);
                        Renderer.renderError(canTransition.reason);
                        return;
                    }
                }

                const updatedInterns = state.interns.map(i => {
                    if (i.id === internId) {
                        return { ...i, name: nameValue.trim(), email: emailValue.trim().toLowerCase(), skills, status };
                    }
                    return i;
                });

                const result = await Server.saveIntern(formData);
                if (result.success) {
                    State.updateState({ interns: updatedInterns });
                    State.addLog('UPDATE_INTERN', `Updated intern: ${nameValue}`);
                    showSuccessMessage(`Intern "${nameValue}" updated successfully`);
                    window.location.hash = 'interns';
                } else {
                    Renderer.renderError(result.error || 'Failed to update intern');
                }
            }
        } catch (error) {
            console.error('Intern form submission error:', error);
            Renderer.renderError('An error occurred while saving');
        } finally {
            Renderer.renderLoading(false);
        }
    };

    /**
     * Handle intern status change
     * @param {string} internId 
     * @param {string} newStatus 
     */
    const handleInternStatusChange = async (internId, newStatus) => {
        const state = State.getState();
        const intern = state.interns.find(i => i.id === internId);
        if (!intern) return;

        // Check transition rules
        const canTransition = Rules.canTransitionStatus(intern.status, newStatus);
        if (!canTransition.allowed) {
            Renderer.renderError(canTransition.reason);
            return;
        }

        showConfirmDialog(
            `Change ${intern.name}'s status from ${intern.status} to ${newStatus}?`,
            async () => {
                Renderer.renderLoading(true);
                try {
                    const result = await Server.updateInternStatus(internId, newStatus);
                    if (result.success) {
                        const updatedInterns = state.interns.map(i =>
                            i.id === internId ? { ...i, status: newStatus } : i
                        );
                        State.updateState({ interns: updatedInterns });
                        State.addLog('STATUS_CHANGE', `${intern.name}: ${intern.status} → ${newStatus}`);
                        showSuccessMessage(`Status updated to ${newStatus}`);
                        renderCurrentView();
                    } else {
                        Renderer.renderError('Failed to update status');
                    }
                } catch (error) {
                    Renderer.renderError('An error occurred');
                } finally {
                    Renderer.renderLoading(false);
                }
            }
        );
    };

    /**
     * Handle intern edit
     * @param {string} internId 
     */
    const handleInternEdit = (internId) => {
        Renderer.renderInternForm('edit', internId);
    };

    /**
     * Handle intern delete
     * @param {string} internId 
     */
    const handleInternDelete = (internId) => {
        const state = State.getState();
        const intern = state.interns.find(i => i.id === internId);
        if (!intern) return;

        // Check if intern has assigned tasks
        const assignedTasks = state.tasks.filter(t => t.assignedTo === internId);
        
        let message = `Are you sure you want to delete intern "${intern.name}"?`;
        if (assignedTasks.length > 0) {
            message += `\n\n⚠ Warning: This intern has ${assignedTasks.length} assigned task(s). They will be unassigned.`;
        }

        showConfirmDialog(message, () => {
            // Unassign tasks
            const updatedTasks = state.tasks.map(t =>
                t.assignedTo === internId ? { ...t, assignedTo: null } : t
            );
            
            // Remove intern
            const updatedInterns = state.interns.filter(i => i.id !== internId);

            State.updateState({ interns: updatedInterns, tasks: updatedTasks });
            State.addLog('DELETE_INTERN', `Deleted intern: ${intern.name}`);
            showSuccessMessage(`Intern "${intern.name}" deleted`);
            renderCurrentView();
        });
    };

    // =====================================================
    // 4. TASK MANAGEMENT EVENT HANDLERS
    // =====================================================

    /**
     * Handle task form submission
     * @param {Event} event 
     * @param {string} mode 
     * @param {string} taskId 
     */
    const handleTaskFormSubmit = async (event, mode, taskId = null) => {
        event.preventDefault();

        const form = event.target;
        const titleValue = form.querySelector('#task-title').value;
        const descValue = form.querySelector('#task-description').value;
        const hoursValue = form.querySelector('#task-hours').value;
        const skillCheckboxes = form.querySelectorAll('input[name="task-skill"]:checked');
        const requiredSkills = Array.from(skillCheckboxes).map(cb => cb.value);
        const depCheckboxes = form.querySelectorAll('input[name="task-dep"]:checked');
        const dependencies = Array.from(depCheckboxes).map(cb => cb.value);
        const assigneeSelect = form.querySelector('#task-assignee');
        const assignedTo = assigneeSelect.value || null;
        const statusSelect = form.querySelector('#task-status');
        const status = statusSelect ? statusSelect.value : 'TODO';

        const formData = {
            title: titleValue,
            description: descValue,
            requiredSkills,
            estimatedHours: parseFloat(hoursValue),
            dependencies
        };

        // Validate
        const validation = Validators.validateTaskForm(formData, taskId);
        if (!validation.isValid) {
            validation.errors.forEach(err => {
                const errorEl = document.getElementById(`${err.field}-error`);
                if (errorEl) errorEl.textContent = err.message;
            });
            return;
        }

        // Check circular dependencies
        const circularCheck = Rules.detectCircularDependency(taskId || 'NEW', dependencies);
        if (circularCheck.hasCircular) {
            Renderer.renderError('Cannot save: Circular dependency detected');
            return;
        }

        // Verify intern eligibility if assigning
        if (assignedTo) {
            const state = State.getState();
            const intern = state.interns.find(i => i.id === assignedTo);
            const taskData = { requiredSkills, assignedTo };
            if (intern) {
                const canAssign = Rules.canAssignTask(intern, taskData);
                if (!canAssign.canAssign) {
                    Renderer.renderError(canAssign.reason);
                    return;
                }
            }
        }

        Renderer.renderLoading(true);

        try {
            if (mode === 'create') {
                const newId = Rules.generateTaskId();
                const newTask = {
                    id: newId,
                    title: titleValue.trim(),
                    description: descValue.trim(),
                    requiredSkills,
                    estimatedHours: parseFloat(hoursValue),
                    dependencies,
                    assignedTo,
                    status: 'TODO',
                    createdAt: new Date()
                };

                const result = await Server.saveTask(newTask);
                if (result.success) {
                    const state = State.getState();
                    State.updateState({ tasks: [...state.tasks, newTask] });
                    State.addLog('ADD_TASK', `Created task: ${newTask.title}`);
                    showSuccessMessage(`Task "${newTask.title}" created successfully`);
                    window.location.hash = 'tasks';
                } else {
                    Renderer.renderError(result.error || 'Failed to create task');
                }
            } else {
                const state = State.getState();
                const updatedTasks = state.tasks.map(t => {
                    if (t.id === taskId) {
                        return {
                            ...t,
                            title: titleValue.trim(),
                            description: descValue.trim(),
                            requiredSkills,
                            estimatedHours: parseFloat(hoursValue),
                            dependencies,
                            assignedTo,
                            status
                        };
                    }
                    return t;
                });

                const result = await Server.saveTask(formData);
                if (result.success) {
                    State.updateState({ tasks: updatedTasks });
                    State.addLog('UPDATE_TASK', `Updated task: ${titleValue}`);
                    showSuccessMessage(`Task "${titleValue}" updated successfully`);
                    window.location.hash = 'tasks';
                } else {
                    Renderer.renderError(result.error || 'Failed to update task');
                }
            }
        } catch (error) {
            console.error('Task form submission error:', error);
            Renderer.renderError('An error occurred while saving');
        } finally {
            Renderer.renderLoading(false);
        }
    };

    /**
     * Handle task assignment
     * @param {string} taskId 
     * @param {string} internId 
     */
    const handleTaskAssignment = (taskId, internId) => {
        const state = State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        const intern = internId ? state.interns.find(i => i.id === internId) : null;

        if (!task) return;

        // Check assignment rules
        if (intern) {
            const canAssign = Rules.canAssignTask(intern, task);
            if (!canAssign.canAssign) {
                Renderer.renderError(canAssign.reason);
                return;
            }
        }

        const updatedTasks = state.tasks.map(t =>
            t.id === taskId ? { ...t, assignedTo: internId } : t
        );

        State.updateState({ tasks: updatedTasks });

        const internName = intern ? intern.name : 'Unassigned';
        State.addLog('TASK_ASSIGN', `${task.title} assigned to ${internName}`);
        showSuccessMessage(`Task assigned to ${internName}`);
        renderCurrentView();
    };

    /**
     * Handle task status update
     * @param {string} taskId 
     * @param {string} newStatus 
     */
    const handleTaskStatusUpdate = (taskId, newStatus) => {
        const state = State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return;

        // Check if can mark as done
        if (newStatus === 'DONE') {
            const canMark = Rules.canMarkTaskDone(taskId);
            if (!canMark.canMark) {
                Renderer.renderError(`Cannot mark as DONE. Blocked by: ${canMark.blockedBy.join(', ')}`);
                return;
            }
        }

        const updatedTasks = state.tasks.map(t =>
            t.id === taskId ? { ...t, status: newStatus } : t
        );

        State.updateState({ tasks: updatedTasks });
        State.addLog('TASK_STATUS', `${task.title}: ${task.status} → ${newStatus}`);
        showSuccessMessage(`Task status updated to ${newStatus}`);

        // Check and notify about unblocked tasks
        if (newStatus === 'DONE') {
            const blockedTasks = Rules.getBlockedTasks(taskId);
            blockedTasks.forEach(blockedId => {
                const blockedTask = state.tasks.find(t => t.id === blockedId);
                if (blockedTask) {
                    const stillBlocked = Rules.canMarkTaskDone(blockedId);
                    if (stillBlocked.canMark) {
                        console.log(`Task "${blockedTask.title}" is now unblocked!`);
                    }
                }
            });
        }

        renderCurrentView();
    };

    // =====================================================
    // 5. FILTER HANDLERS
    // =====================================================

    /**
     * Handle filter changes
     * @param {string} filterType 
     * @param {any} value 
     */
    const handleFilterChange = (filterType, value) => {
        const state = State.getState();
        const newFilters = { ...state.filters };

        switch (filterType) {
            case 'status':
                newFilters.status = value;
                break;
            case 'skills':
                newFilters.skills = value;
                break;
            default:
                break;
        }

        State.updateState({ filters: newFilters });
        renderCurrentView();
    };

    // Debounced filter handler for search inputs
    const debouncedFilterChange = debounce(handleFilterChange, 300);

    // =====================================================
    // 7. GLOBAL ERROR HANDLER
    // =====================================================

    /**
     * Handle global errors
     * @param {ErrorEvent} event 
     */
    const handleGlobalError = (event) => {
        console.error('Global error:', event.error);
        Renderer.renderError('An unexpected error occurred. Please refresh the page.');
    };

    /**
     * Handle unhandled promise rejections
     * @param {PromiseRejectionEvent} event 
     */
    const handleUnhandledRejection = (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        Renderer.renderError('An unexpected error occurred.');
    };

    // =====================================================
    // 8. AUTHENTICATION HANDLERS
    // =====================================================

    /**
     * Handle user login
     * @param {string} email
     * @param {string} password
     */
    const handleLogin = async (email, password) => {
        // Simple auth check
        const state = State.getState();
        let user = null;
        
        // HR Admin check (hardcoded as per requirements)
        if (email === 'hr.cc@gmail.com' && password === 'admin@123') {
            user = { name: 'HR Admin', email: 'hr.cc@gmail.com', role: 'ADMIN' };
        } else {
            // Intern check
            const intern = state.interns.find(i => i.email === email && (i.password === password || password === 'password123')); // Fallback for old seeds
            if (intern) {
                user = { ...intern, role: 'INTERN' };
            }
        }

        if (user) {
            State.updateState({
                currentUser: user,
                isAuthenticated: true,
                currentView: 'dashboard'
            });
            showSuccessMessage(`Welcome back, ${user.name}!`);
            Renderer.renderNavigation();
            renderCurrentView();
            return true;
        } else {
            Renderer.renderError('Invalid credentials');
            return false;
        }
    };

    /**
     * Handle user logout
     */
    const handleLogout = () => {
        State.updateState({
            currentUser: null,
            isAuthenticated: false,
            currentView: 'login'
        });
        showSuccessMessage('Logged out successfully');
        Renderer.renderNavigation();
        Renderer.renderLogin();
    };

    // =====================================================
    // 1. APP INITIALIZATION & DATA SEEDING
    // =====================================================

    /**
     * Seed initial data if state is empty
     */
    const seedInitialData = () => {
        const state = State.getState();
        // Only seed if both interns and tasks are empty
        if (state.interns.length > 0 || state.tasks.length > 0) return;

        const interns = [
            {
                id: '2026-001',
                name: 'Alice Smith',
                email: 'alice.smith@example.com',
                password: 'password123',
                skills: ['JavaScript', 'React'],
                status: 'ACTIVE',
                createdAt: new Date('2026-01-10T09:00:00')
            },
            {
                id: '2026-002',
                name: 'Bob Jones',
                email: 'bob.jones@example.com',
                password: 'password123',
                skills: ['HTML', 'CSS', 'Design'],
                status: 'ONBOARDING',
                createdAt: new Date('2026-01-15T10:30:00')
            },
            {
                id: '2026-003',
                name: 'Charlie Brown',
                email: 'charlie.brown@example.com',
                password: 'password123',
                skills: ['Python', 'Data Science'],
                status: 'EXITED',
                createdAt: new Date('2025-11-01T09:00:00')
            }
        ];

        const tasks = [
            {
                id: 'TASK-001',
                title: 'Complete Onboarding Documentation',
                description: 'Read and sign all required HR documents.',
                requiredSkills: [],
                assignedTo: '2026-002',
                status: 'IN_PROGRESS',
                estimatedHours: 4,
                dependencies: [],
                createdAt: new Date('2026-01-15T11:00:00')
            },
            {
                id: 'TASK-002',
                title: 'Implement Login Page',
                description: 'Create responsive login form with validation.',
                requiredSkills: ['JavaScript', 'HTML'],
                assignedTo: '2026-001',
                status: 'TODO',
                estimatedHours: 8,
                dependencies: [],
                createdAt: new Date('2026-01-16T09:00:00')
            },
            {
                id: 'TASK-003',
                title: 'Review Legacy Code',
                description: 'Analyze the old codebase for potential refactoring.',
                requiredSkills: ['Python'],
                assignedTo: null,
                status: 'TODO',
                estimatedHours: 6,
                dependencies: [],
                createdAt: new Date('2026-01-18T14:00:00')
            }
        ];

        // Apply seed data
        State.updateState({
            interns: interns,
            tasks: tasks,
            lastInternId: 3
        });
        
        State.addLog('SYSTEM_INIT', 'Seeded initial data');
        console.log('🌱 Seeded initial data');
    };

    /**
     * Initialize the application
     */
    const initApp = () => {
        console.log('🚀 Initializing Intern Management System Application...');

        // Seed data if empty
        seedInitialData();

        // Check if state has data
        const state = State.getState();
        console.log(`📊 Loaded ${state.interns.length} interns and ${state.tasks.length} tasks`);

        // Setup navigation
        setupNavigation();

        // Setup keyboard shortcuts
        setupKeyboardShortcuts();

        // Setup global error handlers
        window.addEventListener('error', handleGlobalError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        // Initial render
        renderCurrentView();
        Renderer.renderNavigation();

        console.log('✅ Intern Management System Application Initialized');
        console.log('⌨️ Keyboard shortcuts: Alt+D (Dashboard), Alt+I (Interns), Alt+T (Tasks), Esc (Close modals)');
    };

    // =====================================================
    // 8. DOM CONTENT LOADED
    // =====================================================

    document.addEventListener('DOMContentLoaded', initApp);

    // =====================================================
    // EXPOSE APP API FOR EXTERNAL USE
    // =====================================================

    window.InternSystem.App = {
        // Utility
        showSuccessMessage,
        showConfirmDialog,
        showAlertDialog,
        renderCurrentView,
        debounce,

        // Auth handlers
        handleLogin,
        handleLogout,

        // Intern handlers
        handleInternFormSubmit,
        handleInternStatusChange,
        handleInternEdit,
        handleInternDelete,

        // Task handlers
        handleTaskFormSubmit,
        handleTaskAssignment,
        handleTaskStatusUpdate,

        // Filter handlers
        handleFilterChange,
        debouncedFilterChange,

        // Dependency analysis handlers
        handleDependencyAnalysis,
        handleTaskCompletionWithNotify
    };

    // =====================================================
    // 9. DEPENDENCY ANALYSIS HANDLERS
    // =====================================================

    /**
     * Handle dependency analysis - show impact of a task
     * @param {string} taskId 
     */
    function handleDependencyAnalysis(taskId) {
        Renderer.showDependencyImpactModal(taskId);
    }

    /**
     * Handle task completion with automatic notification of unblocked tasks
     * @param {string} taskId 
     */
    async function handleTaskCompletionWithNotify(taskId) {
        const state = State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return;

        // Check if can mark as done
        const canMark = Rules.canMarkTaskDone(taskId);
        if (!canMark.canMark) {
            Renderer.renderError(`Cannot mark as DONE. Blocked by: ${canMark.blockedBy.join(', ')}`);
            return;
        }

        // Update task status
        const updatedTasks = state.tasks.map(t =>
            t.id === taskId ? { ...t, status: 'DONE' } : t
        );
        State.updateState({ tasks: updatedTasks });
        State.addLog('TASK_STATUS', `${task.title}: ${task.status} → DONE`);

        showSuccessMessage(`Task "${task.title}" marked as DONE`);

        // Check and notify about unblocked tasks
        Renderer.checkAndNotifyUnblockedTasks(taskId);

        renderCurrentView();
    }

    /**
     * Handle real-time dependency validation in task form
     * @param {string} taskId 
     * @param {string[]} selectedDeps 
     * @returns {Object} Validation result
     */
    function validateDependenciesRealTime(taskId, selectedDeps) {
        const circularCheck = Rules.detectCircularDependency(taskId, selectedDeps);
        
        return {
            isValid: !circularCheck.hasCircular,
            hasCircular: circularCheck.hasCircular,
            cyclePath: circularCheck.cycle,
            previewHtml: Renderer.renderDependencyValidationPreview(taskId, selectedDeps)
        };
    }

    // Expose the new handlers
    window.InternSystem.App.handleDependencyAnalysis = handleDependencyAnalysis;
    window.InternSystem.App.handleTaskCompletionWithNotify = handleTaskCompletionWithNotify;
    window.InternSystem.App.validateDependenciesRealTime = validateDependenciesRealTime;

})();

