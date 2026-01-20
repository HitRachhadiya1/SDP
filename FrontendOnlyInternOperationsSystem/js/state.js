/**
 * State Management System
 * centralized store for application state
 */
(function() {
    window.InternSystem = window.InternSystem || {};

    // Initial State Definition
    const initialState = {
        interns: [],
        tasks: [],
        logs: [],
        currentView: 'login', // Default to login page
        currentUser: null,    // { id, name, email, role: 'HR' | 'INTERN' }
        isAuthenticated: false,
        filters: { status: 'ALL', skills: [] },
        lastInternId: 0,
        loading: false,
        error: null
    };

    // Private State Variable
    let state = { ...initialState };
    const listeners = [];
    const STORAGE_KEY = 'internSystemState';

    // --- Persistence Helpers ---

    const saveStateToLocalStorage = () => {
        try {
            const serializableState = JSON.stringify(state);
            localStorage.setItem(STORAGE_KEY, serializableState);
        } catch (error) {
            console.error('Failed to save state to localStorage:', error);
        }
    };

    const loadStateFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return null;
            
            const parsed = JSON.parse(saved);
            
            // Revive dates if needed (naive approach for now, or just let strings be strings)
            // Ideally we should convert date strings back to Date objects
            // For now we will rely on applications handling strings or simple reviver
            return parsed;
        } catch (error) {
            console.error('Failed to load state from localStorage:', error);
            return null;
        }
    };

    // Initialize State
    const loadedState = loadStateFromLocalStorage();
    if (loadedState) {
        state = { ...initialState, ...loadedState };
        // Revive Date objects manually for critical fields if necessary
        // A simple pass to convert known date fields could be done here if needed
        // For this simple app, we might rely on string parsing or add a small reviver
        if (state.interns) state.interns.forEach(i => i.createdAt = new Date(i.createdAt));
        if (state.tasks) state.tasks.forEach(t => t.createdAt = new Date(t.createdAt));
        if (state.logs) state.logs.forEach(l => l.timestamp = new Date(l.timestamp));
        
        // Enforce login if not authenticated
        if (!state.isAuthenticated) {
            state.currentView = 'login';
            state.currentUser = null;
        }

        console.log('State loaded from localStorage');
    } else {
        console.log('No saved state found, using default empty state');
    }

    // Public API
    window.InternSystem.State = {
        /**
         * Get a readonly copy of the current state
         */
        getState: () => {
            return JSON.parse(JSON.stringify(state)); // Deep copy for safety
        },

        /**
         * Update state and notify listeners
         * @param {Object} updates - Partial state object to merge
         */
        updateState: (updates) => {
            state = { ...state, ...updates };
            
            // Notify all subscribers
            listeners.forEach(listener => {
                try {
                    listener(state);
                } catch (e) {
                    console.error('Error in state listener:', e);
                }
            });
            
            // Save to persistence
            saveStateToLocalStorage();
            
            // Debug log
            console.log('State Updated:', updates, state);
        },

        /**
         * Subscribe to state changes
         * @param {Function} callback - Function called with new state on update
         * @returns {Function} - Unsubscribe function
         */
        subscribeToState: (callback) => {
            listeners.push(callback);
            return () => {
                const index = listeners.indexOf(callback);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };
        },

        /**
         * Reset filters to default
         */
        resetFilters: () => {
            const updates = { filters: { status: 'ALL', skills: [] } };
            window.InternSystem.State.updateState(updates);
        },

        /**
         * Add an audit log entry
         * @param {string} action - Action name (e.g., 'ADD_INTERN')
         * @param {string} details - Details about the action
         */
        addLog: (action, details) => {
            const newLog = {
                id: Date.now(),
                action,
                details,
                timestamp: new Date()
            };
            
            // Append to logs array immutably
            const newLogs = [...state.logs, newLog];
            window.InternSystem.State.updateState({ logs: newLogs });
        },

        /**
         * Clear all data and reset to initial state
         */
        clearState: () => {
            state = { ...initialState };
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
        }
    };

    console.log('InternSystem State Module Initialized');
})();
