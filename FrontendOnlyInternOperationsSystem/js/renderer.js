/**
 * Renderer Module - Part 1: Core Rendering Functions
 * Handles all DOM manipulation and view rendering
 */
(function() {
    window.InternSystem = window.InternSystem || {};

    // --- DOM References ---
    const getContentArea = () => document.querySelector('.content-area');
    const getLoadingOverlay = () => document.getElementById('loading');
    const getErrorToast = () => document.getElementById('error-toast');
    const getNavLinks = () => document.querySelectorAll('.nav-link');

    // --- Helper Functions ---

    /**
     * Format timestamp to relative time (e.g., "2 hours ago")
     * @param {Date|string} timestamp 
     * @returns {string}
     */
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    /**
     * Format status to colored badge HTML
     * @param {string} status 
     * @returns {string} HTML string
     */
    const formatStatus = (status) => {
        const statusLower = status.toLowerCase();
        let badgeClass = 'badge';
        
        switch(status) {
            case 'ONBOARDING':
                badgeClass += ' badge-onboarding';
                break;
            case 'ACTIVE':
            case 'DONE':
                badgeClass += ' badge-active';
                break;
            case 'EXITED':
                badgeClass += ' badge-exited';
                break;
            case 'TODO':
                badgeClass += ' badge-onboarding';
                break;
            case 'IN_PROGRESS':
                badgeClass += ' badge-active';
                break;
            default:
                break;
        }
        return `<span class="${badgeClass}">${status.replace('_', ' ')}</span>`;
    };

    /**
     * Format skills array to pill tags HTML
     * @param {string[]} skills 
     * @returns {string} HTML string
     */
    const formatSkills = (skills) => {
        if (!skills || skills.length === 0) return '<span class="text-secondary">None</span>';
        return skills.map(skill => `<span class="pill-skill">${skill}</span>`).join('');
    };

    /**
     * Get action type color class
     * @param {string} action 
     * @returns {string}
     */
    const getLogActionColor = (action) => {
        if (action.includes('ADD') || action.includes('CREATE')) return 'success-text';
        if (action.includes('DELETE') || action.includes('REMOVE') || action.includes('EXITED')) return 'danger-text';
        if (action.includes('UPDATE') || action.includes('EDIT')) return 'warning-text';
        return 'text-secondary';
    };

    // --- 5. Clear Main Content ---

    /**
     * Clear the main content area
     */
    const clearMainContent = () => {
        const content = getContentArea();
        if (content) {
            content.innerHTML = '';
        }
    };

    // --- 1. Render Navigation ---

    /**
     * Render and update navigation state
     */
    /**
     * Render and update navigation state
     */
    const renderNavigation = () => {
        const state = window.InternSystem.State.getState();
        const nav = document.querySelector('.main-nav');
        
        if (!state.isAuthenticated) {
            if (nav) nav.style.display = 'none';
            return;
        }

        if (nav) nav.style.display = 'block';

        // Update nav item visibility based on Role
        const isIntern = state.currentUser?.role === 'INTERN';
        const navLinks = getNavLinks();

        navLinks.forEach(link => {
            const page = link.getAttribute('data-page') || link.getAttribute('href').substring(1);
            
            // Hide "Interns" tab from Interns (based on prompt: "intern can only see information and assign tasks")
            // Wait, "intern can only see information" = their own info. 
            // "see information and assign tasks" -> "Tasks" tab should be visible.
            // "Interns" tab implies showing list of interns. If restricted to self, maybe better to just have "My Profile"?
            // User: "if user is Intern then only his or her data should be shown"
            // So if they click "Interns", show only themselves. Keep the link.
            
            // Update active state
            if (page === state.currentView) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }

            // Remove old listeners and add new ones
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.InternSystem.State.updateState({ currentView: page });
                window.InternSystem.State.addLog('NAVIGATE', `Navigated to ${page}`);
            });
        });

        // Add/Update Logout Button
        let logoutBtn = document.getElementById('logout-btn');
        
        if (!logoutBtn) {
            const navList = document.querySelector('.main-nav ul');
            if (navList) {
                const li = document.createElement('li');
                li.innerHTML = '<a href="#" id="logout-btn" class="nav-link">Logout</a>';
                navList.appendChild(li);
                logoutBtn = li.querySelector('#logout-btn');
            }
        }

        // Ensure listener is attached (by replacing element to clear old listeners)
        if (logoutBtn) {
            const newBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.InternSystem.App && window.InternSystem.App.handleLogout) {
                    if (window.InternSystem.App.showConfirmDialog) {
                        window.InternSystem.App.showConfirmDialog(
                            'Are you sure you want to log out?',
                            () => {
                                window.InternSystem.App.handleLogout();
                            }
                        );
                    } else {
                        window.InternSystem.App.handleLogout();
                    }
                } else {
                    console.error('Logout handler not initialized');
                }
            });
        }
    };

    /**
     * Render the login view
     */
    const renderLogin = () => {
        const content = getContentArea();
        if (!content) return;
        
        clearMainContent();
        
        content.innerHTML = `
            <div class="login-container">
                <div class="login-card card">
                    <h2 class="section-title text-center mb-4">Login</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label class="label">Email Address</label>
                            <input type="email" id="login-email" class="input" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label class="label">Password</label>
                            <input type="password" id="login-password" class="input" placeholder="Enter password" required>
                        </div>
                        <div id="login-error" class="error-message text-center mb-4"></div>
                        <button type="submit" class="btn btn-primary w-100" style="width: 100%;">Login</button>
                    </form>
                </div>
            </div>
        `;
        
        injectLoginStyles();

        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            window.InternSystem.App.handleLogin(email, password);
        });
    };

    const injectLoginStyles = () => {
        if (document.getElementById('login-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'login-styles';
        styles.textContent = `
            .login-container { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
            .login-card { width: 100%; max-width: 400px; padding: 2rem; }
            .w-100 { width: 100%; }
        `;
        document.head.appendChild(styles);
    };

    // --- 2. Render Loading ---

    /**
     * Show or hide the loading overlay
     * @param {boolean} show 
     */
    const renderLoading = (show) => {
        const overlay = getLoadingOverlay();
        if (!overlay) return;

        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    };

    // --- 3. Render Error ---

    let errorTimeout = null;

    /**
     * Show error toast notification
     * @param {string} message 
     * @param {number} duration - Auto-hide duration in ms
     */
    const renderError = (message, duration = 5000) => {
        const toast = getErrorToast();
        if (!toast) return;

        const messageEl = toast.querySelector('.toast-message');
        const closeBtn = toast.querySelector('.toast-close');

        if (messageEl) messageEl.textContent = message;

        // Show toast
        toast.classList.remove('hidden');

        // Clear any existing timeout
        if (errorTimeout) clearTimeout(errorTimeout);

        // Auto-hide after duration
        errorTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, duration);

        // Close button handler
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            newCloseBtn.addEventListener('click', () => {
                toast.classList.add('hidden');
                if (errorTimeout) clearTimeout(errorTimeout);
            });
        }
    };

    // --- 4. Render Dashboard ---

    /**
     * Render the dashboard view
     */
    const renderDashboard = () => {
        const state = window.InternSystem.State.getState();
        const content = getContentArea();
        if (!content) return;

        const isIntern = state.currentUser?.role === 'INTERN';

        if (isIntern) {
            // --- INTERN DASHBOARD ---
            const myIntern = state.interns.find(i => i.email === state.currentUser?.email);
            const myId = myIntern ? myIntern.id : null;
            
            if (!myId) {
                content.innerHTML = '<div class="card"><p class="text-danger">Error: Could not link your account to an intern profile.</p></div>';
                return;
            }

            const myTasks = state.tasks.filter(t => t.assignedTo === myId);
            const todoTasks = myTasks.filter(t => t.status === 'TODO').length;
            const inProgressTasks = myTasks.filter(t => t.status === 'IN_PROGRESS').length;
            const doneTasks = myTasks.filter(t => t.status === 'DONE').length;

            content.innerHTML = `
                <div class="section-header">
                    <h1 class="section-title">My Dashboard</h1>
                    <div class="user-badge">${state.currentUser.email}</div>
                </div>

                <!-- My Stats -->
                <div class="grid grid-cols-3 mb-4">
                    <div class="card">
                        <div class="card-label">Assigned Tasks</div>
                        <div class="card-value">${myTasks.length}</div>
                    </div>
                    <div class="card">
                        <div class="card-label">In Progress</div>
                        <div class="card-value" style="color: var(--primary-color);">${inProgressTasks}</div>
                    </div>
                    <div class="card">
                        <div class="card-label">Completed</div>
                        <div class="card-value" style="color: var(--success-color);">${doneTasks}</div>
                    </div>
                </div>

                <!-- My Tasks List -->
                <div class="card mt-4">
                    <h3 class="card-title">My Recent Tasks</h3>
                    ${myTasks.length > 0 ? `
                        <div class="table-container mt-4">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Due</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${myTasks.slice(0, 5).map(t => `
                                        <tr>
                                            <td><strong>${t.title}</strong></td>
                                            <td>${formatStatus(t.status)}</td>
                                            <td>${formatDate(t.createdAt)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                         <div class="mt-4 text-right">
                             <a href="#tasks" class="btn btn-secondary btn-sm">View All My Tasks</a>
                         </div>
                    ` : '<p class="text-secondary mt-2">You have no assigned tasks.</p>'}
                </div>
            `;

        } else {
            // --- HR/ADMIN DASHBOARD (Existing Logic) ---
            
            // Calculate metrics
            const totalInterns = state.interns.length;
            const activeInterns = state.interns.filter(i => i.status === 'ACTIVE').length;
            const onboardingInterns = state.interns.filter(i => i.status === 'ONBOARDING').length;
            const exitedInterns = state.interns.filter(i => i.status === 'EXITED').length;

            const totalTasks = state.tasks.length;
            const todoTasks = state.tasks.filter(t => t.status === 'TODO').length;
            const inProgressTasks = state.tasks.filter(t => t.status === 'IN_PROGRESS').length;
            const doneTasks = state.tasks.filter(t => t.status === 'DONE').length;

            // Recent logs (last 10)
            const recentLogs = [...state.logs].reverse().slice(0, 10);

            // Calculate percentages for bar chart
            const taskTotal = totalTasks || 1; // Avoid division by zero
            const todoPercent = Math.round((todoTasks / taskTotal) * 100);
            const inProgressPercent = Math.round((inProgressTasks / taskTotal) * 100);
            const donePercent = Math.round((doneTasks / taskTotal) * 100);

            content.innerHTML = `
                <div class="section-header">
                    <h1 class="section-title">Dashboard</h1>
                    <div class="user-badge">HR Admin</div>
                </div>

                <!-- Summary Cards -->
                <div class="grid grid-cols-4 mb-4">
                    <div class="card">
                        <div class="card-label">Total Interns</div>
                        <div class="card-value">${totalInterns}</div>
                    </div>
                    <div class="card">
                        <div class="card-label">Active Interns</div>
                        <div class="card-value" style="color: var(--success-color);">${activeInterns}</div>
                    </div>
                    <div class="card">
                        <div class="card-label">Total Tasks</div>
                        <div class="card-value">${totalTasks}</div>
                    </div>
                    <div class="card">
                        <div class="card-label">Pending Tasks</div>
                        <div class="card-value" style="color: var(--warning-color);">${todoTasks + inProgressTasks}</div>
                    </div>
                </div>

                <!-- Quick Stats & Activity Row -->
                <div class="grid grid-cols-2">
                    <!-- Task Status Chart -->
                    <div class="card">
                        <h3 class="card-title">Tasks by Status</h3>
                        <div class="status-chart mt-4">
                            <div class="chart-bar">
                                <div class="chart-segment todo" style="width: ${todoPercent}%;" title="TODO: ${todoTasks}"></div>
                                <div class="chart-segment in-progress" style="width: ${inProgressPercent}%;" title="In Progress: ${inProgressTasks}"></div>
                                <div class="chart-segment done" style="width: ${donePercent}%;" title="Done: ${doneTasks}"></div>
                            </div>
                            <div class="chart-legend mt-4">
                                <span class="legend-item"><span class="legend-dot todo"></span> TODO (${todoTasks})</span>
                                <span class="legend-item"><span class="legend-dot in-progress"></span> In Progress (${inProgressTasks})</span>
                                <span class="legend-item"><span class="legend-dot done"></span> Done (${doneTasks})</span>
                            </div>
                        </div>

                        <h3 class="card-title mt-4">Interns by Status</h3>
                        <div class="intern-breakdown mt-4">
                            <div class="breakdown-item">
                                ${formatStatus('ACTIVE')} <span class="breakdown-count">${activeInterns}</span>
                            </div>
                            <div class="breakdown-item">
                                ${formatStatus('ONBOARDING')} <span class="breakdown-count">${onboardingInterns}</span>
                            </div>
                            <div class="breakdown-item">
                                ${formatStatus('EXITED')} <span class="breakdown-count">${exitedInterns}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="card">
                        <h3 class="card-title">Recent Activity</h3>
                        <div class="activity-list mt-4">
                            ${recentLogs.length > 0 ? recentLogs.map(log => `
                                <div class="activity-item">
                                    <span class="activity-action ${getLogActionColor(log.action)}">${log.action}</span>
                                    <span class="activity-details">${log.details}</span>
                                    <span class="activity-time">${formatDate(log.timestamp)}</span>
                                </div>
                            `).join('') : '<p class="text-secondary">No recent activity</p>'}
                        </div>
                    </div>
                </div>
            `;
        }

        // Inject additional dashboard styles if not present
        injectDashboardStyles();
    };

    /**
     * Inject dashboard-specific styles
     */
    const injectDashboardStyles = () => {
        if (document.getElementById('dashboard-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'dashboard-styles';
        styles.textContent = `
            .card-label { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
            .card-value { font-size: 2rem; font-weight: 700; color: var(--text-primary); }
            .card-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); }
            
            .status-chart { margin-top: 1rem; }
            .chart-bar { display: flex; height: 24px; border-radius: var(--radius-md); overflow: hidden; background: var(--bg-body); }
            .chart-segment { height: 100%; transition: width 0.3s ease; }
            .chart-segment.todo { background-color: var(--warning-color); }
            .chart-segment.in-progress { background-color: var(--primary-color); }
            .chart-segment.done { background-color: var(--success-color); }
            
            .chart-legend { display: flex; gap: 1rem; flex-wrap: wrap; }
            .legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; }
            .legend-dot { width: 12px; height: 12px; border-radius: 50%; }
            .legend-dot.todo { background-color: var(--warning-color); }
            .legend-dot.in-progress { background-color: var(--primary-color); }
            .legend-dot.done { background-color: var(--success-color); }
            
            .breakdown-item { display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); }
            .breakdown-item:last-child { border-bottom: none; }
            .breakdown-count { font-weight: 600; }
            
            .activity-list { max-height: 300px; overflow-y: auto; }
            .activity-item { display: flex; flex-direction: column; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color); }
            .activity-item:last-child { border-bottom: none; }
            .activity-action { font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
            .activity-details { font-size: 0.875rem; color: var(--text-primary); margin: 0.25rem 0; }
            .activity-time { font-size: 0.75rem; color: var(--text-secondary); }
            
            .success-text { color: var(--success-color); }
            .danger-text { color: var(--danger-color); }
            .warning-text { color: var(--warning-color); }
            .text-secondary { color: var(--text-secondary); }
        `;
        document.head.appendChild(styles);
    };

    // =====================================================
    // PART 2: INTERN RENDERING FUNCTIONS
    // =====================================================

    // Available skills for selection
    const AVAILABLE_SKILLS = ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Python', 'Git', 'Design', 'Data Science'];

    // --- Helper: Create Skill Checkboxes ---
    /**
     * Generate skill checkbox UI
     * @param {string[]} selectedSkills 
     * @param {string} namePrefix - Prefix for input names
     * @returns {string} HTML string
     */
    const createSkillCheckboxes = (selectedSkills = [], namePrefix = 'skill') => {
        return AVAILABLE_SKILLS.map(skill => {
            const isChecked = selectedSkills.includes(skill) ? 'checked' : '';
            const id = `${namePrefix}-${skill.toLowerCase().replace(/\s+/g, '-')}`;
            return `
                <label class="checkbox-label" for="${id}">
                    <input type="checkbox" id="${id}" name="${namePrefix}" value="${skill}" ${isChecked} class="checkbox">
                    <span>${skill}</span>
                </label>
            `;
        }).join('');
    };

    // --- Helper: Create Intern Table Row ---
    /**
     * Generate table row HTML for an intern
     * @param {Object} intern 
     * @returns {string} HTML string
     */
    const createInternRow = (intern) => {
        const state = window.InternSystem.State.getState();
        const isIntern = state.currentUser?.role === 'INTERN';
        const taskCount = window.InternSystem.Rules.calculateInternTaskCount(intern.id);
        
        let actions = `
            <button class="btn btn-secondary btn-sm" data-action="view" data-id="${intern.id}" aria-label="View ${intern.name}">View</button>
        `;
        
        if (!isIntern) {
            actions += `
                <button class="btn btn-secondary btn-sm" data-action="edit" data-id="${intern.id}" aria-label="Edit ${intern.name}">Edit</button>
                <button class="btn btn-secondary btn-sm" data-action="status" data-id="${intern.id}" aria-label="Change status for ${intern.name}">Status</button>
            `;
        }

        return `
            <tr data-intern-id="${intern.id}">
                <td>${intern.id}</td>
                <td>${intern.name}</td>
                <td>${intern.email}</td>
                <td>${formatSkills(intern.skills)}</td>
                <td>${formatStatus(intern.status)}</td>
                <td>${taskCount}</td>
                <td class="action-cell">
                    ${actions}
                </td>
            </tr>
        `;
    };

    // --- 4. Apply Intern Filters ---
    /**
     * Filter interns based on state.filters
     * @returns {Object[]} Filtered interns array
     */
    const applyInternFilters = () => {
        const state = window.InternSystem.State.getState();
        let filtered = [...state.interns];

        // Filter by status
        if (state.filters.status && state.filters.status !== 'ALL') {
            filtered = filtered.filter(i => i.status === state.filters.status);
        }

        // Filter by skills (AND logic - intern must have ALL selected skills)
        if (state.filters.skills && state.filters.skills.length > 0) {
            filtered = filtered.filter(intern => 
                state.filters.skills.every(skill => intern.skills.includes(skill))
            );
        }

        return filtered;
    };

    // --- 1. Render Intern List ---
    /**
     * Render the interns list view with filters
     */
    const renderInternList = () => {
        const state = window.InternSystem.State.getState();
        const content = getContentArea();
        if (!content) return;

        const isIntern = state.currentUser?.role === 'INTERN';
        let filteredInterns = [];
        let sectionTitle = 'Interns';

        // Filter Logic based on Role
        if (isIntern) {
            sectionTitle = 'My Profile';
            const myIntern = state.interns.find(i => i.email === state.currentUser?.email);
            if (myIntern) filteredInterns = [myIntern];
        } else {
            filteredInterns = applyInternFilters();
        }

        const allSkills = [...new Set(state.interns.flatMap(i => i.skills))];

        let html = `
            <div class="section-header">
                <h1 class="section-title">${sectionTitle}</h1>
                ${!isIntern ? '<button class="btn btn-primary" id="add-intern-btn">+ Add Intern</button>' : ''}
            </div>
        `;

        if (!isIntern) {
            html += `
                <!-- Filters Section -->
                <div class="card filter-section mb-4">
                    <div class="filter-row">
                        <div class="filter-group">
                            <label class="label" for="status-filter">Status</label>
                            <select id="status-filter" class="select" aria-label="Filter by status">
                                <option value="ALL" ${state.filters.status === 'ALL' ? 'selected' : ''}>All Statuses</option>
                                <option value="ONBOARDING" ${state.filters.status === 'ONBOARDING' ? 'selected' : ''}>Onboarding</option>
                                <option value="ACTIVE" ${state.filters.status === 'ACTIVE' ? 'selected' : ''}>Active</option>
                                <option value="EXITED" ${state.filters.status === 'EXITED' ? 'selected' : ''}>Exited</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label class="label">Skills</label>
                            <div class="skill-filters">
                                ${allSkills.map(skill => `
                                    <label class="checkbox-label">
                                        <input type="checkbox" class="skill-filter-cb" value="${skill}" 
                                            ${state.filters.skills.includes(skill) ? 'checked' : ''}>
                                        <span>${skill}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        <div class="filter-actions">
                            <button class="btn btn-primary" id="apply-filters-btn">Apply Filters</button>
                            <button class="btn btn-secondary" id="reset-filters-btn">Reset</button>
                        </div>
                    </div>
                </div>
            `;
        }

        html += `
            <!-- Interns Table -->
            ${filteredInterns.length > 0 ? `
                <div class="table-container card">
                    <table class="table" aria-label="Interns list">
                        <thead>
                            <tr>
                                <th class="col-id">ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th class="col-skills">Skills</th>
                                <th class="col-status">Status</th>
                                <th>Tasks</th>
                                <th class="col-actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredInterns.map(createInternRow).join('')}
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="empty-state card">
                    <p>No interns found matching the current filters.</p>
                    ${!isIntern ? '<button class="btn btn-secondary mt-4" id="reset-filters-btn-empty">Reset Filters</button>' : ''}
                </div>
            `}
        `;

        content.innerHTML = html;
        injectInternStyles();
        attachInternListEvents();
    };

    /**
     * Attach event listeners for intern list
     */
    const attachInternListEvents = () => {
        // Add Intern Button
        const addBtn = document.getElementById('add-intern-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => renderInternForm('create'));
        }

        // Apply Filters
        const applyBtn = document.getElementById('apply-filters-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                const statusSelect = document.getElementById('status-filter');
                const skillCheckboxes = document.querySelectorAll('.skill-filter-cb:checked');
                
                const newFilters = {
                    status: statusSelect ? statusSelect.value : 'ALL',
                    skills: Array.from(skillCheckboxes).map(cb => cb.value)
                };
                
                window.InternSystem.State.updateState({ filters: newFilters });
                renderInternList();
            });
        }

        // Reset Filters
        const resetBtns = document.querySelectorAll('#reset-filters-btn, #reset-filters-btn-empty');
        resetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                window.InternSystem.State.resetFilters();
                renderInternList();
            });
        });

        // Table action buttons
        const actionBtns = document.querySelectorAll('.action-cell button');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const id = e.target.dataset.id;
                
                switch(action) {
                    case 'view':
                        renderInternDetail(id);
                        break;
                    case 'edit':
                        renderInternForm('edit', id);
                        break;
                    case 'status':
                        showStatusChangeModal(id);
                        break;
                }
            });
        });
    };

    // --- Helper: Get Known Skills ---
    const getKnownSkills = () => {
        const state = window.InternSystem.State.getState();
        const skills = new Set([
            'JavaScript', 'HTML', 'CSS', 'Python', 'React', 'Node.js', 
            'Java', 'SQL', 'Git', 'Excel', 'Communication'
        ]);
        
        state.interns.forEach(i => i.skills.forEach(s => skills.add(s)));
        state.tasks.forEach(t => t.requiredSkills.forEach(s => skills.add(s)));
        
        return Array.from(skills).sort();
    };

    // --- Helper: Render Dynamic Skill Selector ---
    const renderDynamicSkillSelector = (selected = [], name = 'skill') => {
        const allSkills = getKnownSkills();
        selected.forEach(s => { if (!allSkills.includes(s)) allSkills.push(s); });
        
        return `
            <div class="skill-selector-wrapper">
                <div class="skills-grid" id="${name}-grid">
                    ${allSkills.map(skill => `
                        <label class="checkbox-label">
                            <input type="checkbox" name="${name}" value="${skill}" ${selected.includes(skill) ? 'checked' : ''}>
                            <span>${skill}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="add-skill-row mt-2" style="display:flex; gap:0.5rem; align-items: center;">
                    <input type="text" id="new-${name}-input" class="input" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;" placeholder="New skill...">
                    <button type="button" class="btn btn-secondary btn-sm" id="add-${name}-btn">Add</button>
                </div>
            </div>
        `;
    };

    // --- 2. Render Intern Form ---
    /**
     * Render intern create/edit form
     * @param {string} mode - 'create' or 'edit'
     * @param {string|null} internId - Intern ID for edit mode
     */
    const renderInternForm = (mode = 'create', internId = null) => {
        const content = getContentArea();
        if (!content) return;

        const state = window.InternSystem.State.getState();
        let intern = null;

        if (mode === 'edit' && internId) {
            intern = state.interns.find(i => i.id === internId);
            if (!intern) {
                renderError('Intern not found');
                renderInternList();
                return;
            }
        }

        const title = mode === 'create' ? 'Add New Intern' : `Edit Intern: ${intern.name}`;

        content.innerHTML = `
            <div class="section-header">
                <h1 class="section-title">${title}</h1>
            </div>

            <div class="card form-card">
                <form id="intern-form" novalidate aria-label="${title}">
                    <div class="form-group">
                        <label class="label" for="intern-name">Name *</label>
                        <input type="text" id="intern-name" class="input" 
                            value="${intern ? intern.name : ''}" 
                            placeholder="Enter full name"
                            required
                            aria-required="true"
                            aria-describedby="name-error">
                        <span class="error-message" id="name-error" role="alert"></span>
                    </div>

                    <div class="form-group">
                        <label class="label" for="intern-email">Email *</label>
                        <div class="input-with-spinner">
                            <input type="email" id="intern-email" class="input" 
                                value="${intern ? intern.email : ''}" 
                                placeholder="Enter email address"
                                required
                                aria-required="true"
                                aria-describedby="email-error">
                            <span class="email-spinner hidden" id="email-spinner"></span>
                        </div>
                        <span class="error-message" id="email-error" role="alert"></span>
                    </div>

                    <div class="form-group">
                        <label class="label">Skills * (select at least one)</label>
                        <div role="group" aria-label="Skills selection">
                            ${renderDynamicSkillSelector(intern ? intern.skills : [], 'intern-skill')}
                        </div>
                        <span class="error-message" id="skills-error" role="alert"></span>
                    </div>

                    ${mode === 'edit' ? `
                        <div class="form-group">
                            <label class="label" for="intern-status">Status</label>
                            <select id="intern-status" class="select" aria-describedby="status-info">
                                <option value="ONBOARDING" ${intern.status === 'ONBOARDING' ? 'selected' : ''}>Onboarding</option>
                                <option value="ACTIVE" ${intern.status === 'ACTIVE' ? 'selected' : ''}>Active</option>
                                <option value="EXITED" ${intern.status === 'EXITED' ? 'selected' : ''}>Exited</option>
                            </select>
                            <span class="helper-text" id="status-info">Status changes follow lifecycle rules</span>
                        </div>
                    ` : ''}

                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-form-btn">Cancel</button>
                        <button type="submit" class="btn btn-primary" id="save-intern-btn">
                            ${mode === 'create' ? 'Add Intern' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        `;

        // Inject form styles
        injectFormStyles();

        // Attach form event listeners
        attachInternFormEvents(mode, internId);
    };

    /**
     * Attach event listeners for intern form
     */
    const attachInternFormEvents = (mode, internId) => {
        const form = document.getElementById('intern-form');
        const cancelBtn = document.getElementById('cancel-form-btn');
        const emailInput = document.getElementById('intern-email');

        // Cancel button
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => renderInternList());
        }

        // Real-time name validation
        const nameInput = document.getElementById('intern-name');
        if (nameInput) {
            nameInput.addEventListener('blur', () => {
                const error = document.getElementById('name-error');
                if (!window.InternSystem.Validators.isValidName(nameInput.value)) {
                    error.textContent = 'Name must be 2-50 characters, letters only';
                    nameInput.classList.add('input-error');
                } else {
                    error.textContent = '';
                    nameInput.classList.remove('input-error');
                }
            });
        }

        // Real-time email validation with async check
        if (emailInput) {
            let emailTimeout;
            emailInput.addEventListener('blur', async () => {
                const error = document.getElementById('email-error');
                const spinner = document.getElementById('email-spinner');
                
                if (!window.InternSystem.Validators.isValidEmail(emailInput.value)) {
                    error.textContent = 'Please enter a valid email address';
                    emailInput.classList.add('input-error');
                    return;
                }

                // Show spinner for async check
                spinner.classList.remove('hidden');
                error.textContent = '';
                
                clearTimeout(emailTimeout);
                emailTimeout = setTimeout(async () => {
                    try {
                        const result = await window.InternSystem.Server.checkEmailUniqueness(emailInput.value);
                        spinner.classList.add('hidden');
                        
                        // Exclude current intern in edit mode
                        const dupCheck = window.InternSystem.Validators.checkDuplicateEmail(emailInput.value, internId);
                        
                        if (dupCheck.isDuplicate) {
                            error.textContent = 'Email is already in use';
                            emailInput.classList.add('input-error');
                        } else {
                            error.textContent = '';
                            emailInput.classList.remove('input-error');
                        }
                    } catch (e) {
                        spinner.classList.add('hidden');
                    }
                }, 300);
            });
        }

        // Custom Skill Button
        const addSkillBtn = document.getElementById('add-intern-skill-btn');
        if (addSkillBtn) {
            addSkillBtn.addEventListener('click', () => {
                const input = document.getElementById('new-intern-skill-input');
                const skill = input.value.trim();
                const container = document.getElementById('intern-skill-grid');
                
                if (skill && container) {
                    // Check if exists (case insensitive)
                    const normalizedSkill = skill.toLowerCase();
                    const existingInput = Array.from(container.querySelectorAll('input')).find(i => i.value.toLowerCase() === normalizedSkill);
                    
                    if (existingInput) {
                        existingInput.checked = true;
                    } else {
                        const label = document.createElement('label');
                        label.className = 'checkbox-label';
                        label.innerHTML = `
                            <input type="checkbox" name="intern-skill" value="${skill}" checked>
                            <span>${skill}</span>
                        `;
                        container.appendChild(label);
                    }
                    input.value = '';
                }
            });
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const nameValue = document.getElementById('intern-name').value;
                const emailValue = document.getElementById('intern-email').value;
                const skillCheckboxes = document.querySelectorAll('input[name="intern-skill"]:checked');
                const skills = Array.from(skillCheckboxes).map(cb => cb.value);
                
                const statusSelect = document.getElementById('intern-status');
                const status = statusSelect ? statusSelect.value : 'ONBOARDING';

                const formData = { name: nameValue, email: emailValue, skills, status };
                const validation = window.InternSystem.Validators.validateInternForm(formData, internId);

                if (!validation.isValid) {
                    validation.errors.forEach(err => {
                        const errorEl = document.getElementById(`${err.field}-error`);
                        if (errorEl) errorEl.textContent = err.message;
                    });
                    return;
                }

                // Submit form
                renderLoading(true);
                try {
                    if (mode === 'create') {
                        const newId = window.InternSystem.Rules.generateInternId();
                        const password = Math.random().toString(36).slice(2, 9).padEnd(7, 'x'); // Generate 7-char password
                        
                        const newIntern = {
                            id: newId,
                            name: nameValue.trim(),
                            email: emailValue.trim().toLowerCase(),
                            password: password,
                            skills,
                            status: 'ONBOARDING',
                            createdAt: new Date()
                        };

                        const result = await window.InternSystem.Server.saveIntern(newIntern);
                        if (result.success) {
                            const state = window.InternSystem.State.getState();
                            window.InternSystem.State.updateState({
                                interns: [...state.interns, newIntern],
                                lastInternId: state.lastInternId + 1
                            });
                            window.InternSystem.State.addLog('ADD_INTERN', `Added intern: ${newIntern.name}`);
                            
                            // Show password alert
                            if (window.InternSystem.App.showAlertDialog) {
                                window.InternSystem.App.showAlertDialog(
                                    'Intern Account Created',
                                    `<div>
                                        <p style="margin-bottom: 0.75rem;">The intern has been successfully added.</p>
                                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 6px; border: 1px solid #e9ecef;">
                                            <div style="margin-bottom: 0.5rem;"><strong>Email:</strong> ${newIntern.email}</div>
                                            <div><strong>Password:</strong> <span style="font-family: monospace; font-size: 1.25em; font-weight: bold; color: var(--primary-color);">${password}</span></div>
                                        </div>
                                        <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #6c757d;">Please share these credentials with the intern.</p>
                                    </div>`,
                                    () => {
                                        renderInternList();
                                    }
                                );
                            } else {
                                renderInternList();
                            }
                        } else {
                            renderError(result.error || 'Failed to save intern');
                        }
                    } else {
                        // Edit mode
                        const state = window.InternSystem.State.getState();
                        const updatedInterns = state.interns.map(i => {
                            if (i.id === internId) {
                                return { ...i, name: nameValue.trim(), email: emailValue.trim().toLowerCase(), skills, status };
                            }
                            return i;
                        });

                        const result = await window.InternSystem.Server.saveIntern(formData);
                        if (result.success) {
                            window.InternSystem.State.updateState({ interns: updatedInterns });
                            window.InternSystem.State.addLog('UPDATE_INTERN', `Updated intern: ${nameValue}`);
                            renderInternList();
                        } else {
                            renderError(result.error || 'Failed to update intern');
                        }
                    }
                } catch (error) {
                    renderError('An error occurred while saving');
                } finally {
                    renderLoading(false);
                }
            });
        }
    };

    // --- 3. Render Intern Detail ---
    /**
     * Render intern detail view
     * @param {string} internId 
     */
    const renderInternDetail = (internId) => {
        const state = window.InternSystem.State.getState();
        const content = getContentArea();
        if (!content) return;

        const intern = state.interns.find(i => i.id === internId);
        if (!intern) {
            renderError('Intern not found');
            renderInternList();
            return;
        }

        const assignedTasks = state.tasks.filter(t => t.assignedTo === internId);
        const totalHours = window.InternSystem.Rules.calculateTotalEstimatedHours(internId);
        const completionPercent = window.InternSystem.Rules.getTaskCompletionPercentage(internId);

        content.innerHTML = `
            <div class="section-header">
                <button class="btn btn-secondary" id="back-to-list-btn">← Back to List</button>
            </div>

            <div class="grid grid-cols-2">
                <!-- Intern Info Card -->
                <div class="card">
                    <h2 class="card-title">${intern.name}</h2>
                    <div class="detail-row mt-4">
                        <span class="detail-label">ID:</span>
                        <span class="detail-value">${intern.id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${intern.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value">${formatStatus(intern.status)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Skills:</span>
                        <span class="detail-value">${formatSkills(intern.skills)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Joined:</span>
                        <span class="detail-value">${formatDate(intern.createdAt)}</span>
                    </div>

                    <div class="detail-actions mt-4">
                        <button class="btn btn-primary" id="edit-intern-btn">Edit</button>
                        <button class="btn btn-secondary" id="change-status-btn">Change Status</button>
                    </div>
                </div>

                <!-- Stats Card -->
                <div class="card">
                    <h3 class="card-title">Workload</h3>
                    <div class="stats-grid mt-4">
                        <div class="stat-item">
                            <div class="stat-value">${assignedTasks.length}</div>
                            <div class="stat-label">Assigned Tasks</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${totalHours}h</div>
                            <div class="stat-label">Total Hours</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${completionPercent}%</div>
                            <div class="stat-label">Completion</div>
                        </div>
                    </div>

                    <h3 class="card-title mt-4">Assigned Tasks</h3>
                    <div class="task-list mt-4">
                        ${assignedTasks.length > 0 ? assignedTasks.map(task => `
                            <div class="task-item">
                                <span class="task-title">${task.title}</span>
                                ${formatStatus(task.status)}
                            </div>
                        `).join('') : '<p class="text-secondary">No tasks assigned</p>'}
                    </div>
                </div>
            </div>
        `;

        // Inject detail styles
        injectDetailStyles();

        // Attach events
        document.getElementById('back-to-list-btn').addEventListener('click', () => renderInternList());
        document.getElementById('edit-intern-btn').addEventListener('click', () => renderInternForm('edit', internId));
        document.getElementById('change-status-btn').addEventListener('click', () => showStatusChangeModal(internId));
    };

    // --- Status Change Modal ---
    const showStatusChangeModal = (internId) => {
        const state = window.InternSystem.State.getState();
        const intern = state.interns.find(i => i.id === internId);
        if (!intern) return;

        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'status-modal';
        modal.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <h3 id="modal-title">Change Status: ${intern.name}</h3>
                <p>Current status: ${formatStatus(intern.status)}</p>
                <div class="form-group mt-4">
                    <label class="label" for="new-status">New Status</label>
                    <select id="new-status" class="select">
                        <option value="ONBOARDING" ${intern.status === 'ONBOARDING' ? 'selected' : ''}>Onboarding</option>
                        <option value="ACTIVE" ${intern.status === 'ACTIVE' ? 'selected' : ''}>Active</option>
                        <option value="EXITED" ${intern.status === 'EXITED' ? 'selected' : ''}>Exited</option>
                    </select>
                    <span class="error-message" id="status-change-error" role="alert"></span>
                </div>
                <div class="modal-actions mt-4">
                    <button class="btn btn-secondary" id="cancel-status-btn">Cancel</button>
                    <button class="btn btn-primary" id="confirm-status-btn">Update Status</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Inject modal styles
        injectModalStyles();

        // Events
        document.getElementById('cancel-status-btn').addEventListener('click', () => modal.remove());
        document.getElementById('confirm-status-btn').addEventListener('click', async () => {
            const newStatus = document.getElementById('new-status').value;
            const errorEl = document.getElementById('status-change-error');
            
            // Check transition rules
            const canTransition = window.InternSystem.Rules.canTransitionStatus(intern.status, newStatus);
            if (!canTransition.allowed) {
                errorEl.textContent = canTransition.reason;
                return;
            }

            renderLoading(true);
            try {
                const result = await window.InternSystem.Server.updateInternStatus(internId, newStatus);
                if (result.success) {
                    const updatedInterns = state.interns.map(i => 
                        i.id === internId ? { ...i, status: newStatus } : i
                    );
                    window.InternSystem.State.updateState({ interns: updatedInterns });
                    window.InternSystem.State.addLog('STATUS_CHANGE', `${intern.name}: ${intern.status} → ${newStatus}`);
                    modal.remove();
                    renderInternList();
                } else {
                    errorEl.textContent = 'Failed to update status';
                }
            } catch (e) {
                errorEl.textContent = 'An error occurred';
            } finally {
                renderLoading(false);
            }
        });
    };

    // --- Style Injections ---
    const injectInternStyles = () => {
        if (document.getElementById('intern-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'intern-styles';
        styles.textContent = `
            .filter-section { padding: 1rem; }
            .filter-row { display: flex; gap: 1.5rem; align-items: flex-end; flex-wrap: wrap; }
            .filter-group { flex: 1; min-width: 200px; }
            .skill-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
            .filter-actions { display: flex; gap: 0.5rem; }
            .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); }
            .checkbox-label:hover { background: var(--bg-body); }
            .action-cell { display: flex; gap: 0.5rem; align-items: center; }
            .btn-sm { padding: 0.25rem 0.5rem; font-size: 0.75rem; }
            .empty-state { text-align: center; padding: 3rem; }
        `;
        document.head.appendChild(styles);
    };

    const injectFormStyles = () => {
        if (document.getElementById('form-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'form-styles';
        styles.textContent = `
            .form-card { max-width: 600px; }
            .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
            .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem; }
            .input-error { border-color: var(--danger-color); }
            .error-message { color: var(--danger-color); font-size: 0.75rem; margin-top: 0.25rem; display: block; }
            .helper-text { color: var(--text-secondary); font-size: 0.75rem; margin-top: 0.25rem; }
            .input-with-spinner { position: relative; }
            .email-spinner { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; border: 2px solid var(--border-color); border-top-color: var(--primary-color); border-radius: 50%; animation: spin 0.8s linear infinite; }
            .email-spinner.hidden { display: none; }
        `;
        document.head.appendChild(styles);
    };

    const injectDetailStyles = () => {
        if (document.getElementById('detail-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'detail-styles';
        styles.textContent = `
            .detail-row { display: flex; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); }
            .detail-row:last-of-type { border-bottom: none; }
            .detail-label { width: 100px; color: var(--text-secondary); font-weight: 500; }
            .detail-value { flex: 1; }
            .detail-actions { display: flex; gap: 0.5rem; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
            .stat-item { text-align: center; padding: 1rem; background: var(--bg-body); border-radius: var(--radius-md); }
            .stat-value { font-size: 1.5rem; font-weight: 700; color: var(--primary-color); }
            .stat-label { font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem; }
            .task-list { max-height: 200px; overflow-y: auto; }
            .task-item { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); }
            .task-item:last-child { border-bottom: none; }
            .task-title { font-weight: 500; }
        `;
        document.head.appendChild(styles);
    };

    const injectModalStyles = () => {
        if (document.getElementById('modal-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
            .modal { background: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-lg); min-width: 400px; box-shadow: var(--shadow-lg); }
            .modal h3 { font-size: 1.25rem; font-weight: 600; }
            .modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
        `;
        document.head.appendChild(styles);
    };

    // =====================================================
    // PART 3: TASK RENDERING FUNCTIONS
    // =====================================================

    // --- Helper: Get Intern Name by ID ---
    const getInternNameById = (internId) => {
        if (!internId) return '<span class="text-secondary">Unassigned</span>';
        const state = window.InternSystem.State.getState();
        const intern = state.interns.find(i => i.id === internId);
        return intern ? intern.name : '<span class="text-secondary">Unknown</span>';
    };

    // --- Helper: Get Dependency Tasks Info ---
    const getDependencyTasksInfo = (dependencyIds) => {
        if (!dependencyIds || dependencyIds.length === 0) return [];
        const state = window.InternSystem.State.getState();
        return dependencyIds.map(id => {
            const task = state.tasks.find(t => t.id === id);
            return task ? { id: task.id, title: task.title, status: task.status } : null;
        }).filter(Boolean);
    };

    // --- Helper: Filter Interns by Skills ---
    const filterInternsBySkills = (requiredSkills) => {
        const state = window.InternSystem.State.getState();
        return state.interns.filter(intern => {
            // Allow ACTIVE and ONBOARDING interns (exclude EXITED)
            if (intern.status === 'EXITED') return false;
            if (!requiredSkills || requiredSkills.length === 0) return true;
            return requiredSkills.every(skill => intern.skills.includes(skill));
        });
    };

    // --- Helper: Check if Task Status Can Be Updated ---
    const canUpdateTaskStatus = (task) => {
        return window.InternSystem.Rules.canMarkTaskDone(task.id);
    };

    // --- Helper: Create Task Table Row ---
    const createTaskRow = (task) => {
        const state = window.InternSystem.State.getState();
        const isIntern = state.currentUser?.role === 'INTERN';
        
        const assigneeName = getInternNameById(task.assignedTo);
        const depCount = task.dependencies ? task.dependencies.length : 0;
        const depInfo = getDependencyTasksInfo(task.dependencies);
        const depTooltip = depInfo.map(d => `${d.title} (${d.status})`).join('\\n');

        let actions = `
            <button class="btn btn-secondary btn-sm" data-action="view" data-id="${task.id}">View</button>
        `;
        
        if (!isIntern) {
            actions += `
                <button class="btn btn-secondary btn-sm" data-action="edit" data-id="${task.id}">Edit</button>
                <button class="btn btn-secondary btn-sm" data-action="assign" data-id="${task.id}">Assign</button>
                <button class="btn btn-secondary btn-sm" data-action="status" data-id="${task.id}">Status</button>
            `;
        }

        return `
            <tr data-task-id="${task.id}">
                <td>${task.id}</td>
                <td class="task-title-cell">${task.title}</td>
                <td>${formatSkills(task.requiredSkills)}</td>
                <td>${assigneeName}</td>
                <td>${formatStatus(task.status)}</td>
                <td>${task.estimatedHours}h</td>
                <td>
                    <span class="dep-count" title="${depTooltip || 'No dependencies'}">${depCount} dep${depCount !== 1 ? 's' : ''}</span>
                </td>
                <td class="action-cell">
                    ${actions}
                </td>
            </tr>
        `;
    };

    // --- Apply Task Filters ---
    const applyTaskFilters = () => {
        const state = window.InternSystem.State.getState();
        let filtered = [...state.tasks];

        // Get filter values from DOM if present
        const statusFilter = document.getElementById('task-status-filter');
        const assignedFilter = document.getElementById('task-assigned-filter');

        if (statusFilter && statusFilter.value !== 'ALL') {
            filtered = filtered.filter(t => t.status === statusFilter.value);
        }

        if (assignedFilter) {
            if (assignedFilter.value === 'ASSIGNED') {
                filtered = filtered.filter(t => t.assignedTo !== null);
            } else if (assignedFilter.value === 'UNASSIGNED') {
                filtered = filtered.filter(t => t.assignedTo === null);
            }
        }

        return filtered;
    };

    // --- 1. Render Task List ---
    const renderTaskList = () => {
        const state = window.InternSystem.State.getState();
        const content = getContentArea();
        if (!content) return;

        const isIntern = state.currentUser?.role === 'INTERN';
        
        let displayedTasks = state.tasks;
        let showFilters = !isIntern;
        let title = 'Tasks';

        if (isIntern) {
            title = 'My Assigned Tasks';
            const myIntern = state.interns.find(i => i.email === state.currentUser?.email);
            const myId = myIntern ? myIntern.id : null;
            displayedTasks = state.tasks.filter(t => t.assignedTo === myId);
        }

        let html = `
            <div class="section-header">
                <h1 class="section-title">${title}</h1>
                ${!isIntern ? '<button class="btn btn-primary" id="add-task-btn">+ Add Task</button>' : ''}
            </div>
        `;

        if (showFilters) {
            html += `
            <!-- Filters Section -->
            <div class="card filter-section mb-4">
                <div class="filter-row">
                    <div class="filter-group">
                        <label class="label" for="task-status-filter">Status</label>
                        <select id="task-status-filter" class="select">
                            <option value="ALL">All Statuses</option>
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="label" for="task-assigned-filter">Assignment</label>
                        <select id="task-assigned-filter" class="select">
                            <option value="ALL">All Tasks</option>
                            <option value="ASSIGNED">Assigned</option>
                            <option value="UNASSIGNED">Unassigned</option>
                        </select>
                    </div>
                    <div class="filter-actions">
                        <button class="btn btn-primary" id="apply-task-filters-btn">Apply Filters</button>
                        <button class="btn btn-secondary" id="reset-task-filters-btn">Reset</button>
                    </div>
                </div>
            </div>
            `;
        }

        html += `
            <!-- Tasks Table -->
            <div id="tasks-table-container">
                ${renderTasksTable(displayedTasks)}
            </div>
        `;

        content.innerHTML = html;
        injectTaskStyles();
        attachTaskListEvents();
    };

    const renderTasksTable = (tasks) => {
        if (tasks.length === 0) {
            return `
                <div class="empty-state card">
                    <p>No tasks found.</p>
                </div>
            `;
        }

        return `
            <div class="table-container">
                <table class="table" aria-label="Tasks list">
                    <thead>
                        <tr>
                            <th class="col-id">ID</th>
                            <th>Title</th>
                            <th class="col-skills">Required Skills</th>
                            <th>Assigned To</th>
                            <th class="col-status">Status</th>
                            <th>Est. Hours</th>
                            <th>Dependencies</th>
                            <th class="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tasks.map(createTaskRow).join('')}
                    </tbody>
                </table>
            </div>
        `;
    };

    const attachTaskListEvents = () => {
        // Add Task Button
        document.getElementById('add-task-btn')?.addEventListener('click', () => renderTaskForm('create'));

        // Apply Filters
        document.getElementById('apply-task-filters-btn')?.addEventListener('click', () => {
            const filtered = applyTaskFilters();
            document.getElementById('tasks-table-container').innerHTML = renderTasksTable(filtered);
            attachTaskTableEvents();
        });

        // Reset Filters
        document.getElementById('reset-task-filters-btn')?.addEventListener('click', () => {
            document.getElementById('task-status-filter').value = 'ALL';
            document.getElementById('task-assigned-filter').value = 'ALL';
            const state = window.InternSystem.State.getState();
            document.getElementById('tasks-table-container').innerHTML = renderTasksTable(state.tasks);
            attachTaskTableEvents();
        });

        attachTaskTableEvents();
    };

    const attachTaskTableEvents = () => {
        document.querySelectorAll('#tasks-table-container .action-cell button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const id = e.target.dataset.id;

                switch(action) {
                    case 'view': renderTaskDetail(id); break;
                    case 'edit': renderTaskForm('edit', id); break;
                    case 'assign': showTaskAssignModal(id); break;
                    case 'status': showTaskStatusModal(id); break;
                }
            });
        });
    };

    // --- 2. Render Task Form ---
    const renderTaskForm = (mode = 'create', taskId = null) => {
        const content = getContentArea();
        if (!content) return;

        const state = window.InternSystem.State.getState();
        let task = null;

        if (mode === 'edit' && taskId) {
            task = state.tasks.find(t => t.id === taskId);
            if (!task) {
                renderError('Task not found');
                renderTaskList();
                return;
            }
        }

        const title = mode === 'create' ? 'Create New Task' : `Edit Task: ${task.title}`;
        const otherTasks = state.tasks.filter(t => t.id !== taskId);
        const eligibleInterns = filterInternsBySkills(task ? task.requiredSkills : []);

        content.innerHTML = `
            <div class="section-header">
                <h1 class="section-title">${title}</h1>
            </div>

            <div class="card form-card">
                <form id="task-form" novalidate>
                    <div class="form-group">
                        <label class="label" for="task-title">Title *</label>
                        <input type="text" id="task-title" class="input" 
                            value="${task ? task.title : ''}" 
                            placeholder="Enter task title"
                            required>
                        <span class="error-message" id="title-error"></span>
                    </div>

                    <div class="form-group">
                        <label class="label" for="task-description">Description</label>
                        <textarea id="task-description" class="input" rows="3" 
                            placeholder="Enter task description">${task ? task.description : ''}</textarea>
                        <span class="error-message" id="description-error"></span>
                    </div>

                    <div class="form-group">
                        <label class="label">Required Skills *</label>
                        <div id="task-skills-container">
                            ${renderDynamicSkillSelector(task ? task.requiredSkills : [], 'task-skill')}
                        </div>
                        <span class="error-message" id="requiredSkills-error"></span>
                    </div>

                    <div class="form-group">
                        <label class="label" for="task-hours">Estimated Hours *</label>
                        <input type="number" id="task-hours" class="input" 
                            value="${task ? task.estimatedHours : ''}" 
                            placeholder="Enter hours"
                            min="1" max="1000" required>
                        <span class="error-message" id="estimatedHours-error"></span>
                    </div>

                    <div class="form-group">
                        <label class="label">Dependencies</label>
                        <div class="dependencies-select" id="dependencies-container">
                            ${otherTasks.map(t => `
                                <label class="checkbox-label">
                                    <input type="checkbox" name="task-dep" value="${t.id}"
                                        ${task && task.dependencies.includes(t.id) ? 'checked' : ''}>
                                    <span>${t.id}: ${t.title}</span>
                                </label>
                            `).join('') || '<p class="text-secondary">No other tasks available</p>'}
                        </div>
                        <span class="error-message" id="dependencies-error"></span>
                        <div id="dependency-preview" class="mt-2"></div>
                    </div>

                    <div class="form-group">
                        <label class="label">Assign To</label>
                        ${mode === 'create' ? `
                            <div class="card" style="padding: 0.5rem; max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color);">
                                <div class="skills-grid" style="grid-template-columns: 1fr;">
                                    ${eligibleInterns.length > 0 ? eligibleInterns.map(i => `
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="task-assignee-multi" value="${i.id}">
                                            <span>${i.name} (${i.skills.join(', ')})</span>
                                        </label>
                                    `).join('') : '<p class="text-secondary text-sm">No eligible interns with required skills found</p>'}
                                </div>
                            </div>
                            <span class="helper-text">Select multiple interns to assign copies of this task</span>
                        ` : `
                            <select id="task-assignee" class="select">
                                <option value="">Unassigned</option>
                                ${eligibleInterns.map(i => `
                                    <option value="${i.id}" ${task && task.assignedTo === i.id ? 'selected' : ''}>
                                        ${i.name} (${i.skills.join(', ')})
                                    </option>
                                `).join('')}
                            </select>
                            <span class="helper-text">Only ACTIVE interns with matching skills are shown</span>
                        `}
                    </div>

                    ${mode === 'edit' ? `
                        <div class="form-group">
                            <label class="label" for="task-status">Status</label>
                            <select id="task-status" class="select">
                                <option value="TODO" ${task.status === 'TODO' ? 'selected' : ''}>To Do</option>
                                <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
                                <option value="DONE" ${task.status === 'DONE' ? 'selected' : ''}>Done</option>
                            </select>
                        </div>
                    ` : ''}

                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-task-btn">Cancel</button>
                        <button type="submit" class="btn btn-primary">${mode === 'create' ? 'Create Task' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
        `;

        injectFormStyles();
        attachTaskFormEvents(mode, taskId);
    };

    const attachTaskFormEvents = (mode, taskId) => {
        const form = document.getElementById('task-form');

        // Cancel button
        document.getElementById('cancel-task-btn')?.addEventListener('click', () => renderTaskList());

        // Skills change -> update eligible interns
        document.querySelectorAll('input[name="task-skill"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const selectedSkills = Array.from(document.querySelectorAll('input[name="task-skill"]:checked')).map(c => c.value);
                const eligible = filterInternsBySkills(selectedSkills);
                
                // Handle both modes: multi-checkbox (create) or select (edit)
                const assigneeSelect = document.getElementById('task-assignee');
                const multiContainer = document.querySelector('input[name="task-assignee-multi"]')?.closest('.skills-grid');
                
                if (assigneeSelect) {
                    const currentValue = assigneeSelect.value;
                    assigneeSelect.innerHTML = `
                        <option value="">Unassigned</option>
                        ${eligible.map(i => `
                            <option value="${i.id}" ${currentValue === i.id ? 'selected' : ''}>
                                ${i.name} (${i.skills.join(', ')})
                            </option>
                        `).join('')}
                    `;
                } else if (multiContainer) {
                    const currentChecked = Array.from(document.querySelectorAll('input[name="task-assignee-multi"]:checked')).map(cb => cb.value);
                    multiContainer.innerHTML = eligible.length > 0 ? eligible.map(i => `
                        <label class="checkbox-label">
                            <input type="checkbox" name="task-assignee-multi" value="${i.id}" ${currentChecked.includes(i.id) ? 'checked' : ''}>
                            <span>${i.name} (${i.skills.join(', ')})</span>
                        </label>
                    `).join('') : '<p class="text-secondary text-sm">No eligible interns</p>';
                }
            });
        });

        // Custom Skill Button for Task Form
        const addSkillBtn = document.getElementById('add-task-skill-btn');
        if (addSkillBtn) {
            addSkillBtn.addEventListener('click', () => {
                const input = document.getElementById('new-task-skill-input');
                const skill = input.value.trim();
                const container = document.getElementById('task-skill-grid');
                
                if (skill && container) {
                    const normalizedSkill = skill.toLowerCase();
                    const existingInput = Array.from(container.querySelectorAll('input')).find(i => i.value.toLowerCase() === normalizedSkill);
                    
                    if (existingInput) {
                        existingInput.checked = true;
                    } else {
                        const label = document.createElement('label');
                        label.className = 'checkbox-label';
                        label.innerHTML = `
                            <input type="checkbox" name="task-skill" value="${skill}" checked>
                            <span>${skill}</span>
                        `;
                        container.appendChild(label);
                    }
                    input.value = '';
                    
                    // Trigger eligible interns update
                    const changeEvent = new Event('change');
                    container.querySelector('input')?.dispatchEvent(changeEvent);
                }
            });
        }

        // Dependency change -> Real-time Validation Preview
        const updateDependencyPreview = () => {
            const selectedDeps = Array.from(document.querySelectorAll('input[name="task-dep"]:checked')).map(c => c.value);
            const currentTaskId = taskId || 'NEW_TASK';
            const previewContainer = document.getElementById('dependency-preview');
            
            if (previewContainer) {
                previewContainer.innerHTML = window.InternSystem.Renderer.renderDependencyValidationPreview(currentTaskId, selectedDeps);
            }
        };

        // Initialize preview
        if (taskId) updateDependencyPreview();

        document.querySelectorAll('input[name="task-dep"]').forEach(cb => {
            cb.addEventListener('change', updateDependencyPreview);
        });

        // Form submission
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const titleValue = document.getElementById('task-title').value;
            const descValue = document.getElementById('task-description').value;
            const hoursValue = document.getElementById('task-hours').value;
            const skillCheckboxes = document.querySelectorAll('input[name="task-skill"]:checked');
            const requiredSkills = Array.from(skillCheckboxes).map(cb => cb.value);
            const depCheckboxes = document.querySelectorAll('input[name="task-dep"]:checked');
            const dependencies = Array.from(depCheckboxes).map(cb => cb.value);
            const statusSelect = document.getElementById('task-status');
            const status = statusSelect ? statusSelect.value : 'TODO';

            const formData = {
                title: titleValue,
                description: descValue,
                requiredSkills,
                estimatedHours: parseFloat(hoursValue),
                dependencies
            };

            const validation = window.InternSystem.Validators.validateTaskForm(formData, taskId);
            if (!validation.isValid) {
                validation.errors.forEach(err => {
                    const errorEl = document.getElementById(`${err.field}-error`);
                    if (errorEl) errorEl.textContent = err.message;
                });
                return;
            }

            // Check for circular dependencies
            const circularCheck = window.InternSystem.Rules.detectCircularDependency(taskId || 'NEW', dependencies);
            if (circularCheck.hasCircular) {
                renderError('Cannot save: Circular dependency detected');
                return;
            }

            renderLoading(true);
            try {
                if (mode === 'create') {
                    // Get multiple assignees for create mode
                    const multiAssignees = Array.from(document.querySelectorAll('input[name="task-assignee-multi"]:checked')).map(cb => cb.value);
                    const assigneeList = multiAssignees.length > 0 ? multiAssignees : [null];
                    
                    const state = window.InternSystem.State.getState();
                    const newTasks = [];
                    
                    for (const assigneeId of assigneeList) {
                        const newId = window.InternSystem.Rules.generateTaskId();
                        const newTask = {
                            id: newId,
                            title: titleValue.trim(),
                            description: descValue.trim(),
                            requiredSkills,
                            estimatedHours: parseFloat(hoursValue),
                            dependencies,
                            assignedTo: assigneeId,
                            status: 'TODO',
                            createdAt: new Date()
                        };
                        
                        const result = await window.InternSystem.Server.saveTask(newTask);
                        if (result.success) {
                            newTasks.push(newTask);
                            window.InternSystem.State.addLog('ADD_TASK', `Created task: ${newTask.title}${assigneeId ? ' (assigned)' : ''}`);
                        }
                    }
                    
                    if (newTasks.length > 0) {
                        window.InternSystem.State.updateState({ tasks: [...state.tasks, ...newTasks] });
                        renderTaskList();
                    } else {
                        renderError('Failed to create task(s)');
                    }
                } else {
                    // Edit mode - get assignedTo from select
                    const assigneeSelect = document.getElementById('task-assignee');
                    const assignedTo = assigneeSelect ? assigneeSelect.value || null : null;
                    
                    const state = window.InternSystem.State.getState();
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

                    const result = await window.InternSystem.Server.saveTask(formData);
                    if (result.success) {
                        window.InternSystem.State.updateState({ tasks: updatedTasks });
                        window.InternSystem.State.addLog('UPDATE_TASK', `Updated task: ${titleValue}`);
                        renderTaskList();
                    } else {
                        renderError(result.error || 'Failed to update task');
                    }
                }
            } catch (error) {
                renderError('An error occurred while saving');
            } finally {
                renderLoading(false);
            }
        });
    };

    // --- 3. Render Task Detail ---
    const renderTaskDetail = (taskId) => {
        const state = window.InternSystem.State.getState();
        const content = getContentArea();
        if (!content) return;

        const task = state.tasks.find(t => t.id === taskId);
        if (!task) {
            renderError('Task not found');
            renderTaskList();
            return;
        }

        const assigneeName = getInternNameById(task.assignedTo);
        const assignee = state.interns.find(i => i.id === task.assignedTo);
        const depInfo = getDependencyTasksInfo(task.dependencies);
        const blockedTasks = window.InternSystem.Rules.getBlockedTasks(taskId);
        const canComplete = canUpdateTaskStatus(task);

        content.innerHTML = `
            <div class="section-header">
                <button class="btn btn-secondary" id="back-to-tasks-btn">← Back to Tasks</button>
            </div>

            <div class="grid grid-cols-2">
                <!-- Task Info Card -->
                <div class="card">
                    <h2 class="card-title">${task.title}</h2>
                    <p class="task-description mt-4">${task.description || 'No description provided.'}</p>
                    
                    <div class="detail-row mt-4">
                        <span class="detail-label">ID:</span>
                        <span class="detail-value">${task.id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value">${formatStatus(task.status)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Assigned To:</span>
                        <span class="detail-value">${assigneeName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Est. Hours:</span>
                        <span class="detail-value">${task.estimatedHours}h</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Skills:</span>
                        <span class="detail-value">${formatSkills(task.requiredSkills)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Created:</span>
                        <span class="detail-value">${formatDate(task.createdAt)}</span>
                    </div>

                    <div class="detail-actions mt-4">
                        <button class="btn btn-primary" id="edit-task-btn">Edit</button>
                        <button class="btn btn-secondary" id="change-task-status-btn">Update Status</button>
                        <button class="btn btn-secondary" id="view-impact-btn">📊 View Impact</button>
                        <button class="btn btn-danger" id="delete-task-btn">Delete</button>
                    </div>
                </div>

                <!-- Dependencies Card -->
                <div class="card">
                    <h3 class="card-title">Dependencies</h3>
                    <div class="dependency-tree mt-4">
                        ${depInfo.length > 0 ? renderDependencyTree(taskId) : '<p class="text-secondary">No dependencies</p>'}
                    </div>

                    <h3 class="card-title mt-4">Blocked Tasks</h3>
                    <div class="blocked-tasks-list mt-4">
                        ${blockedTasks.length > 0 ? blockedTasks.map(id => {
                            const t = state.tasks.find(task => task.id === id);
                            return t ? `<div class="blocked-task-item">${t.id}: ${t.title} ${formatStatus(t.status)}</div>` : '';
                        }).join('') : '<p class="text-secondary">No tasks are blocked by this task</p>'}
                    </div>

                    ${!canComplete.canMark && task.status !== 'DONE' ? `
                        <div class="warning-box mt-4">
                            <strong>⚠ Cannot mark as DONE</strong>
                            <p>Blocked by: ${canComplete.blockedBy.join(', ')}</p>
                        </div>
                    ` : ''}

                    ${assignee ? `
                        <h3 class="card-title mt-4">Assignee Details</h3>
                        <div class="assignee-info mt-4">
                            <p><strong>${assignee.name}</strong></p>
                            <p>${assignee.email}</p>
                            <p>${formatStatus(assignee.status)}</p>
                            <p>${formatSkills(assignee.skills)}</p>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- Visual Dependency Graph -->
            <div class="card mt-4">
                <h3 class="card-title">📈 Dependency Graph</h3>
                <div class="dep-graph-section mt-4">
                    ${renderDependencyGraph(taskId)}
                </div>
            </div>
        `;

        injectDetailStyles();
        injectTaskDetailStyles();
        injectDependencyGraphStyles();

        // Attach events
        document.getElementById('back-to-tasks-btn')?.addEventListener('click', () => renderTaskList());
        document.getElementById('edit-task-btn')?.addEventListener('click', () => renderTaskForm('edit', taskId));
        document.getElementById('view-impact-btn')?.addEventListener('click', () => showDependencyImpactModal(taskId));
        document.getElementById('change-task-status-btn')?.addEventListener('click', () => showTaskStatusModal(taskId));
        document.getElementById('delete-task-btn')?.addEventListener('click', () => showDeleteTaskModal(taskId));
    };

    // --- 4. Render Dependency Tree ---
    const renderDependencyTree = (taskId, level = 0) => {
        const state = window.InternSystem.State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        if (!task || !task.dependencies || task.dependencies.length === 0) {
            return '';
        }

        const indent = level * 20;
        let html = '';

        task.dependencies.forEach(depId => {
            const depTask = state.tasks.find(t => t.id === depId);
            if (depTask) {
                const isBlocking = depTask.status !== 'DONE';
                html += `
                    <div class="dep-tree-item" style="padding-left: ${indent}px;">
                        <span class="${isBlocking ? 'blocking' : 'completed'}">
                            ${isBlocking ? '🔴' : '✅'} ${depTask.id}: ${depTask.title}
                        </span>
                        ${formatStatus(depTask.status)}
                    </div>
                `;
                // Recursive call for nested dependencies
                html += renderDependencyTree(depId, level + 1);
            }
        });

        return html;
    };

    // --- Task Status Modal ---
    const showTaskStatusModal = (taskId) => {
        const state = window.InternSystem.State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return;

        const canComplete = canUpdateTaskStatus(task);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'task-status-modal';
        modal.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <h3>Update Task Status</h3>
                <p><strong>${task.title}</strong></p>
                <p>Current status: ${formatStatus(task.status)}</p>
                
                <div class="form-group mt-4">
                    <label class="label" for="new-task-status">New Status</label>
                    <select id="new-task-status" class="select">
                        <option value="TODO" ${task.status === 'TODO' ? 'selected' : ''}>To Do</option>
                        <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
                        <option value="DONE" ${task.status === 'DONE' ? 'selected' : ''} ${!canComplete.canMark ? 'disabled' : ''}>Done</option>
                    </select>
                    ${!canComplete.canMark ? `<span class="error-message">Cannot mark DONE - blocked by: ${canComplete.blockedBy.join(', ')}</span>` : ''}
                </div>

                <div class="modal-actions mt-4">
                    <button class="btn btn-secondary" id="cancel-task-status-btn">Cancel</button>
                    <button class="btn btn-primary" id="confirm-task-status-btn">Update</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        injectModalStyles();

        document.getElementById('cancel-task-status-btn')?.addEventListener('click', () => modal.remove());
        document.getElementById('confirm-task-status-btn')?.addEventListener('click', async () => {
            const newStatus = document.getElementById('new-task-status').value;

            if (newStatus === 'DONE' && !canComplete.canMark) {
                renderError('Cannot mark as DONE - dependencies incomplete');
                return;
            }

            renderLoading(true);
            const updatedTasks = state.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
            window.InternSystem.State.updateState({ tasks: updatedTasks });
            window.InternSystem.State.addLog('TASK_STATUS', `${task.title}: ${task.status} → ${newStatus}`);
            modal.remove();
            renderLoading(false);
            renderTaskList();
        });
    };

    // --- Task Assign Modal ---
    const showTaskAssignModal = (taskId) => {
        const state = window.InternSystem.State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return;

        const eligibleInterns = filterInternsBySkills(task.requiredSkills);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'task-assign-modal';
        modal.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <h3>Assign Task to Interns</h3>
                <p><strong>${task.title}</strong></p>
                <p>Required skills: ${formatSkills(task.requiredSkills)}</p>
                <p class="text-sm text-secondary mt-2">Currently assigned to: ${getInternNameById(task.assignedTo)}</p>
                
                <div class="form-group mt-4">
                    <label class="label">Select Interns to Assign</label>
                    <div class="card" style="padding: 0.5rem; max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color);">
                        ${eligibleInterns.length > 0 ? eligibleInterns.map(i => `
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem;">
                                <input type="checkbox" name="assign-intern-multi" value="${i.id}" ${task.assignedTo === i.id ? 'checked' : ''}>
                                <span>${i.name} (${i.skills.join(', ')})</span>
                            </label>
                        `).join('') : '<p class="text-secondary text-sm">No eligible interns with required skills</p>'}
                    </div>
                    <span class="helper-text">Select multiple interns to create copies of this task for each</span>
                </div>

                <div class="modal-actions mt-4">
                    <button class="btn btn-secondary" id="cancel-assign-btn">Cancel</button>
                    <button class="btn btn-primary" id="confirm-assign-btn">Assign</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        injectModalStyles();

        document.getElementById('cancel-assign-btn')?.addEventListener('click', () => modal.remove());
        document.getElementById('confirm-assign-btn')?.addEventListener('click', async () => {
            const selectedInterns = Array.from(document.querySelectorAll('input[name="assign-intern-multi"]:checked')).map(cb => cb.value);
            
            if (selectedInterns.length === 0) {
                // Unassign the current task
                const updatedTasks = state.tasks.map(t => t.id === taskId ? { ...t, assignedTo: null } : t);
                window.InternSystem.State.updateState({ tasks: updatedTasks });
                window.InternSystem.State.addLog('TASK_ASSIGN', `${task.title} unassigned`);
            } else if (selectedInterns.length === 1 && selectedInterns[0] === task.assignedTo) {
                // No change
            } else {
                // Update current task with first selection, create copies for rest
                const currentState = window.InternSystem.State.getState();
                let updatedTasks = [...currentState.tasks];
                const newTasks = [];
                
                // Update current task
                updatedTasks = updatedTasks.map(t => {
                    if (t.id === taskId) {
                        return { ...t, assignedTo: selectedInterns[0] };
                    }
                    return t;
                });
                
                // Create copies for additional assignees (skip first one, skip already assigned)
                for (let i = 1; i < selectedInterns.length; i++) {
                    const assigneeId = selectedInterns[i];
                    // Skip if this intern was already assigned to the original task
                    if (assigneeId === task.assignedTo) continue;
                    
                    const newId = window.InternSystem.Rules.generateTaskId();
                    const newTask = {
                        ...task,
                        id: newId,
                        assignedTo: assigneeId,
                        createdAt: new Date()
                    };
                    newTasks.push(newTask);
                    window.InternSystem.State.addLog('ADD_TASK', `Created task copy: ${newTask.title} for ${getInternNameById(assigneeId)}`);
                }
                
                window.InternSystem.State.updateState({ tasks: [...updatedTasks, ...newTasks] });
                window.InternSystem.State.addLog('TASK_ASSIGN', `${task.title} assigned to ${selectedInterns.length} intern(s)`);
            }
            
            modal.remove();
            renderTaskList();
        });
    };

    // --- Delete Task Modal ---
    const showDeleteTaskModal = (taskId) => {
        const state = window.InternSystem.State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return;

        const blockedTasks = window.InternSystem.Rules.getBlockedTasks(taskId);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'delete-task-modal';
        modal.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <h3>Delete Task</h3>
                <p>Are you sure you want to delete <strong>${task.title}</strong>?</p>
                ${blockedTasks.length > 0 ? `
                    <div class="warning-box mt-4">
                        <strong>⚠ Warning:</strong> This task is a dependency for ${blockedTasks.length} other task(s).
                    </div>
                ` : ''}

                <div class="modal-actions mt-4">
                    <button class="btn btn-secondary" id="cancel-delete-btn">Cancel</button>
                    <button class="btn btn-danger" id="confirm-delete-btn">Delete</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        injectModalStyles();

        document.getElementById('cancel-delete-btn')?.addEventListener('click', () => modal.remove());
        document.getElementById('confirm-delete-btn')?.addEventListener('click', () => {
            const updatedTasks = state.tasks.filter(t => t.id !== taskId);
            window.InternSystem.State.updateState({ tasks: updatedTasks });
            window.InternSystem.State.addLog('DELETE_TASK', `Deleted task: ${task.title}`);
            modal.remove();
            renderTaskList();
        });
    };

    // --- Task Styles ---
    const injectTaskStyles = () => {
        if (document.getElementById('task-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'task-styles';
        styles.textContent = `
            .task-title-cell { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .dep-count { cursor: help; padding: 2px 6px; background: var(--bg-body); border-radius: var(--radius-sm); font-size: 0.75rem; }
            .dependencies-select { max-height: 150px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem; }
            .warning-message { color: var(--warning-color); font-size: 0.875rem; display: block; margin-top: 0.5rem; }
            .warning-message.hidden { display: none; }
        `;
        document.head.appendChild(styles);
    };

    const injectTaskDetailStyles = () => {
        if (document.getElementById('task-detail-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'task-detail-styles';
        styles.textContent = `
            .task-description { color: var(--text-secondary); line-height: 1.6; }
            .dep-tree-item { padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
            .dep-tree-item:last-child { border-bottom: none; }
            .blocking { color: var(--danger-color); }
            .completed { color: var(--success-color); }
            .blocked-task-item { padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
            .blocked-task-item:last-child { border-bottom: none; }
            .warning-box { background: var(--warning-bg); color: var(--warning-text); padding: 1rem; border-radius: var(--radius-md); }
            .assignee-info { padding: 0.5rem; background: var(--bg-body); border-radius: var(--radius-md); }
        `;
        document.head.appendChild(styles);
    };

    // =====================================================
    // PART 4: DEPENDENCY VISUALIZATION
    // =====================================================

    /**
     * Render a visual dependency graph for a task
     * @param {string} taskId - The task to show dependencies for
     */
    const renderDependencyGraph = (taskId) => {
        const state = window.InternSystem.State.getState();
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return '<p class="text-secondary">Task not found</p>';

        const getStatusColor = (status) => {
            switch (status) {
                case 'DONE': return 'var(--success-color)';
                case 'IN_PROGRESS': return 'var(--primary-color)';
                case 'TODO': return 'var(--text-secondary)';
                default: return 'var(--danger-color)';
            }
        };

        const getStatusClass = (status, isBlocking) => {
            if (isBlocking) return 'dep-node-blocked';
            switch (status) {
                case 'DONE': return 'dep-node-done';
                case 'IN_PROGRESS': return 'dep-node-progress';
                case 'TODO': return 'dep-node-todo';
                default: return 'dep-node-blocked';
            }
        };

        // Build visual tree recursively
        const buildGraphNode = (nodeTaskId, level = 0, visited = new Set()) => {
            if (visited.has(nodeTaskId)) {
                return `<div class="dep-node dep-node-circular" style="margin-left: ${level * 24}px;">
                    🔄 ${nodeTaskId} (Circular Reference)
                </div>`;
            }
            visited.add(nodeTaskId);

            const nodeTask = state.tasks.find(t => t.id === nodeTaskId);
            if (!nodeTask) return '';

            const isBlocking = nodeTask.status !== 'DONE';
            const statusClass = getStatusClass(nodeTask.status, false);
            const icon = nodeTask.status === 'DONE' ? '✅' : nodeTask.status === 'IN_PROGRESS' ? '🔵' : '⚪';

            let childrenHtml = '';
            if (nodeTask.dependencies && nodeTask.dependencies.length > 0) {
                childrenHtml = nodeTask.dependencies.map(depId => 
                    buildGraphNode(depId, level + 1, new Set(visited))
                ).join('');
            }

            return `
                <div class="dep-graph-node" style="margin-left: ${level * 24}px;">
                    <div class="dep-node ${statusClass}">
                        <span class="dep-icon">${icon}</span>
                        <span class="dep-title">${nodeTask.title}</span>
                        <span class="dep-status">${nodeTask.status}</span>
                    </div>
                    ${childrenHtml ? `<div class="dep-children">${childrenHtml}</div>` : ''}
                </div>
            `;
        };

        injectDependencyGraphStyles();

        return `
            <div class="dependency-graph">
                <div class="dep-legend">
                    <span class="legend-item"><span class="legend-dot done"></span>Done</span>
                    <span class="legend-item"><span class="legend-dot progress"></span>In Progress</span>
                    <span class="legend-item"><span class="legend-dot todo"></span>To Do</span>
                    <span class="legend-item"><span class="legend-dot blocked"></span>Blocked</span>
                </div>
                <div class="dep-graph-container">
                    ${buildGraphNode(taskId)}
                </div>
            </div>
        `;
    };

    /**
     * Show dependency impact analysis modal
     * @param {string} taskId 
     */
    const showDependencyImpactModal = (taskId) => {
        const impact = window.InternSystem.Rules.analyzeDependencyImpact(taskId);
        if (!impact) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'dependency-impact-modal';
        modal.innerHTML = `
            <div class="modal modal-lg" role="dialog" aria-modal="true">
                <h3>📊 Dependency Impact Analysis</h3>
                <p class="mt-2"><strong>${impact.taskTitle}</strong> (${formatStatus(impact.currentStatus)})</p>

                <div class="impact-sections mt-4">
                    <!-- Blocking Dependencies -->
                    <div class="impact-section">
                        <h4>🔴 Blocking Dependencies (${impact.blockingDependencies.length})</h4>
                        ${impact.blockingDependencies.length > 0 ? `
                            <ul class="impact-list">
                                ${impact.blockingDependencies.map(d => `
                                    <li>${d.title} - ${formatStatus(d.status)}</li>
                                `).join('')}
                            </ul>
                        ` : '<p class="text-secondary">No blocking dependencies - ready to complete!</p>'}
                    </div>

                    <!-- Tasks Will Be Unblocked -->
                    <div class="impact-section">
                        <h4>🟢 Tasks Unblocked If Completed (${impact.tasksWillBeReady})</h4>
                        ${impact.unblockedDetails.length > 0 ? `
                            <ul class="impact-list">
                                ${impact.unblockedDetails.map(t => `
                                    <li>
                                        ${t.title} - ${formatStatus(t.status)}
                                        ${t.willBeReady ? '<span class="ready-badge">Ready!</span>' : '<span class="waiting-badge">Waiting on others</span>'}
                                    </li>
                                `).join('')}
                            </ul>
                        ` : '<p class="text-secondary">No tasks are blocked by this task</p>'}
                    </div>

                    <!-- Full Dependency Chain -->
                    <div class="impact-section">
                        <h4>📋 Full Dependency Chain</h4>
                        ${impact.dependencyChain.length > 0 ? `
                            <div class="dep-chain">
                                ${impact.dependencyChain.map(d => `
                                    <div class="chain-item" style="padding-left: ${(d.depth || 0) * 16}px;">
                                        ${d.isBlocking ? '🔴' : '✅'} ${d.title}
                                    </div>
                                `).join('')}
                            </div>
                        ` : '<p class="text-secondary">No dependencies</p>'}
                    </div>
                </div>

                <div class="modal-actions mt-4">
                    <button class="btn btn-secondary" id="close-impact-btn">Close</button>
                    ${impact.canComplete && impact.currentStatus !== 'DONE' ? `
                        <button class="btn btn-primary" id="mark-complete-btn">Mark as DONE</button>
                    ` : ''}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        injectModalStyles();
        injectDependencyImpactStyles();

        document.getElementById('close-impact-btn')?.addEventListener('click', () => modal.remove());
        document.getElementById('mark-complete-btn')?.addEventListener('click', () => {
            modal.remove();
            // Trigger status update
            const state = window.InternSystem.State.getState();
            const updatedTasks = state.tasks.map(t => t.id === taskId ? { ...t, status: 'DONE' } : t);
            window.InternSystem.State.updateState({ tasks: updatedTasks });
            window.InternSystem.State.addLog('TASK_STATUS', `${impact.taskTitle}: ${impact.currentStatus} → DONE`);
            
            // Check for newly unblocked tasks
            checkAndNotifyUnblockedTasks(taskId);
            renderTaskList();
        });
    };

    /**
     * Check and notify about unblocked tasks
     * @param {string} completedTaskId 
     */
    const checkAndNotifyUnblockedTasks = (completedTaskId) => {
        const unblockedTasks = window.InternSystem.Rules.getUnblockedIfCompleted(completedTaskId);
        const readyTasks = unblockedTasks.filter(t => t.willBeReady);

        if (readyTasks.length > 0) {
            showUnblockedTasksModal(readyTasks);
        }
    };

    /**
     * Show modal for newly unblocked tasks with option to auto-start
     * @param {Object[]} tasks 
     */
    const showUnblockedTasksModal = (tasks) => {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'unblocked-tasks-modal';
        modal.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <h3>🎉 Tasks Now Ready!</h3>
                <p class="mt-2">${tasks.length} task(s) can now be started:</p>

                <ul class="unblocked-list mt-4">
                    ${tasks.map(t => `
                        <li class="unblocked-item">
                            <label class="checkbox-label">
                                <input type="checkbox" name="auto-start" value="${t.taskId}" checked>
                                <span>${t.title}</span>
                            </label>
                        </li>
                    `).join('')}
                </ul>

                <div class="modal-actions mt-4">
                    <button class="btn btn-secondary" id="skip-auto-start-btn">Skip</button>
                    <button class="btn btn-primary" id="auto-start-btn">Start Selected Tasks</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        injectModalStyles();

        document.getElementById('skip-auto-start-btn')?.addEventListener('click', () => modal.remove());
        document.getElementById('auto-start-btn')?.addEventListener('click', () => {
            const selectedTasks = Array.from(modal.querySelectorAll('input[name="auto-start"]:checked'))
                .map(cb => cb.value);

            const state = window.InternSystem.State.getState();
            const updatedTasks = state.tasks.map(t => 
                selectedTasks.includes(t.id) ? { ...t, status: 'IN_PROGRESS' } : t
            );
            window.InternSystem.State.updateState({ tasks: updatedTasks });
            
            selectedTasks.forEach(taskId => {
                const task = state.tasks.find(t => t.id === taskId);
                if (task) {
                    window.InternSystem.State.addLog('TASK_STATUS', `${task.title}: TODO → IN_PROGRESS (auto-started)`);
                }
            });

            modal.remove();
            renderTaskList();
        });
    };

    /**
     * Render real-time dependency validation preview
     * @param {string} taskId - Current task being edited
     * @param {string[]} proposedDeps - Selected dependencies
     * @returns {string} HTML for validation preview
     */
    const renderDependencyValidationPreview = (taskId, proposedDeps) => {
        const circularCheck = window.InternSystem.Rules.detectCircularDependency(taskId, proposedDeps);
        const state = window.InternSystem.State.getState();

        if (circularCheck.hasCircular) {
            const cycleTaskNames = circularCheck.cycle.map(id => {
                const t = state.tasks.find(task => task.id === id);
                return t ? t.title : id;
            });

            return `
                <div class="validation-preview error">
                    <span class="validation-icon">🚫</span>
                    <div class="validation-content">
                        <strong>Circular Dependency Detected!</strong>
                        <p>Cycle: ${cycleTaskNames.join(' → ')}</p>
                    </div>
                </div>
            `;
        }

        // Show dependency preview tree
        if (proposedDeps.length === 0) {
            return `
                <div class="validation-preview success">
                    <span class="validation-icon">✅</span>
                    <span>No dependencies selected</span>
                </div>
            `;
        }

        const depInfo = proposedDeps.map(depId => {
            const depTask = state.tasks.find(t => t.id === depId);
            return depTask ? {
                id: depTask.id,
                title: depTask.title,
                status: depTask.status,
                isBlocking: depTask.status !== 'DONE'
            } : null;
        }).filter(Boolean);

        const blockingCount = depInfo.filter(d => d.isBlocking).length;

        return `
            <div class="validation-preview ${blockingCount > 0 ? 'warning' : 'success'}">
                <span class="validation-icon">${blockingCount > 0 ? '⚠️' : '✅'}</span>
                <div class="validation-content">
                    <strong>${proposedDeps.length} Dependencies Selected</strong>
                    ${blockingCount > 0 ? `<p class="text-warning">${blockingCount} blocking (not completed)</p>` : '<p class="text-success">All dependencies completed!</p>'}
                    <ul class="dep-preview-list">
                        ${depInfo.map(d => `
                            <li class="${d.isBlocking ? 'blocking' : 'done'}">
                                ${d.isBlocking ? '🔴' : '✅'} ${d.title}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    };

    // --- Dependency Visualization Styles ---
    const injectDependencyGraphStyles = () => {
        if (document.getElementById('dep-graph-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'dep-graph-styles';
        styles.textContent = `
            .dependency-graph { padding: 1rem; background: var(--bg-body); border-radius: var(--radius-md); }
            .dep-legend { display: flex; gap: 1rem; margin-bottom: 1rem; font-size: 0.75rem; }
            .legend-item { display: flex; align-items: center; gap: 0.25rem; }
            .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
            .legend-dot.done { background: var(--success-color); }
            .legend-dot.progress { background: var(--primary-color); }
            .legend-dot.todo { background: var(--text-secondary); }
            .legend-dot.blocked { background: var(--danger-color); }
            .dep-graph-container { max-height: 400px; overflow-y: auto; }
            .dep-graph-node { margin-bottom: 0.5rem; }
            .dep-node { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border-radius: var(--radius-md); border-left: 3px solid; }
            .dep-node-done { background: rgba(16, 185, 129, 0.1); border-color: var(--success-color); }
            .dep-node-progress { background: rgba(59, 130, 246, 0.1); border-color: var(--primary-color); }
            .dep-node-todo { background: rgba(107, 114, 128, 0.1); border-color: var(--text-secondary); }
            .dep-node-blocked { background: rgba(239, 68, 68, 0.1); border-color: var(--danger-color); }
            .dep-node-circular { background: rgba(245, 158, 11, 0.2); border-color: var(--warning-color); font-style: italic; }
            .dep-icon { font-size: 1rem; }
            .dep-title { flex: 1; font-weight: 500; }
            .dep-status { font-size: 0.75rem; color: var(--text-secondary); }
            .dep-children { margin-left: 1rem; border-left: 2px dashed var(--border-color); padding-left: 0.5rem; }
        `;
        document.head.appendChild(styles);
    };

    const injectDependencyImpactStyles = () => {
        if (document.getElementById('dep-impact-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'dep-impact-styles';
        styles.textContent = `
            .modal-lg { min-width: 600px; max-width: 700px; }
            .impact-sections { display: flex; flex-direction: column; gap: 1rem; }
            .impact-section { padding: 1rem; background: var(--bg-body); border-radius: var(--radius-md); }
            .impact-section h4 { margin-bottom: 0.5rem; font-size: 0.875rem; }
            .impact-list { margin: 0; padding-left: 1.5rem; }
            .impact-list li { margin: 0.25rem 0; }
            .ready-badge { background: var(--success-color); color: white; padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.625rem; margin-left: 0.5rem; }
            .waiting-badge { background: var(--text-secondary); color: white; padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.625rem; margin-left: 0.5rem; }
            .dep-chain { max-height: 200px; overflow-y: auto; }
            .chain-item { padding: 0.25rem 0; }
            .unblocked-list { list-style: none; padding: 0; }
            .unblocked-item { padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); }
            .validation-preview { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; border-radius: var(--radius-md); margin-top: 0.5rem; }
            .validation-preview.success { background: rgba(16, 185, 129, 0.1); }
            .validation-preview.warning { background: rgba(245, 158, 11, 0.1); }
            .validation-preview.error { background: rgba(239, 68, 68, 0.1); border: 1px solid var(--danger-color); }
            .validation-icon { font-size: 1.25rem; }
            .validation-content { flex: 1; }
            .dep-preview-list { margin: 0.5rem 0 0; padding-left: 1rem; font-size: 0.75rem; }
            .dep-preview-list li { margin: 0.25rem 0; }
            .dep-preview-list .blocking { color: var(--danger-color); }
            .dep-preview-list .done { color: var(--success-color); }
        `;
        document.head.appendChild(styles);
    };

    // --- Public API ---
    window.InternSystem.Renderer = {
        // Core rendering (Part 1)
        renderNavigation,
        renderLogin,
        renderLoading,
        renderError,
        renderDashboard,
        clearMainContent,

        // Intern rendering (Part 2)
        renderInternList,
        renderInternForm,
        renderInternDetail,
        applyInternFilters,

        // Task rendering (Part 3)
        renderTaskList,
        renderTaskForm,
        renderTaskDetail,
        renderDependencyTree,

        // Dependency visualization (Part 4)
        renderDependencyGraph,
        showDependencyImpactModal,
        checkAndNotifyUnblockedTasks,
        showUnblockedTasksModal,
        renderDependencyValidationPreview,

        // Helpers
        formatDate,
        formatStatus,
        formatSkills,
        createSkillCheckboxes,
        getInternNameById,
        filterInternsBySkills
    };

    console.log('Renderer Module (Parts 1, 2, 3 & 4) Initialized');
})();

