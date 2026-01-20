/**
 * Validators Module
 * Handles all form and data validation
 */
(function() {
    window.InternSystem = window.InternSystem || {};

    // Valid status values
    const VALID_STATUSES = ['ONBOARDING', 'ACTIVE', 'EXITED'];
    const VALID_TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'];
    
    // Email regex pattern (RFC 5322 simplified)
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Name regex: only letters, spaces, hyphens, apostrophes
    const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

    // --- 3. Field-level Validators ---

    /**
     * Validate email format
     * @param {string} email 
     * @returns {boolean}
     */
    const isValidEmail = (email) => {
        if (!email || typeof email !== 'string') return false;
        return EMAIL_REGEX.test(email.trim());
    };

    /**
     * Validate skills array
     * @param {Array} skills 
     * @returns {boolean}
     */
    const isValidSkillArray = (skills) => {
        if (!Array.isArray(skills)) return false;
        return skills.length > 0 && skills.every(s => typeof s === 'string' && s.trim().length > 0);
    };

    /**
     * Validate intern status
     * @param {string} status 
     * @returns {boolean}
     */
    const isValidStatus = (status) => {
        return VALID_STATUSES.includes(status);
    };

    /**
     * Validate task status
     * @param {string} status 
     * @returns {boolean}
     */
    const isValidTaskStatus = (status) => {
        return VALID_TASK_STATUSES.includes(status);
    };

    /**
     * Validate estimated hours
     * @param {number} hours 
     * @returns {boolean}
     */
    const isValidHours = (hours) => {
        const num = parseFloat(hours);
        return !isNaN(num) && num > 0 && num <= 1000;
    };

    /**
     * Validate name format
     * @param {string} name 
     * @returns {boolean}
     */
    const isValidName = (name) => {
        if (!name || typeof name !== 'string') return false;
        const trimmed = name.trim();
        return trimmed.length >= 2 && trimmed.length <= 50 && NAME_REGEX.test(trimmed);
    };

    // --- 4. Utility Validators ---

    /**
     * Sanitize input to prevent XSS and trim whitespace
     * @param {string} input 
     * @returns {string}
     */
    const sanitizeInput = (input) => {
        if (typeof input !== 'string') return '';
        return input
            .trim()
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    /**
     * Validate dependency array
     * @param {string} taskId - Current task ID
     * @param {string[]} dependencies - Array of dependency task IDs
     * @returns {{isValid: boolean, errors: Array}}
     */
    const validateDependencyArray = (taskId, dependencies) => {
        const errors = [];
        const state = window.InternSystem.State.getState();
        const existingTaskIds = state.tasks.map(t => t.id);

        if (!Array.isArray(dependencies)) {
            errors.push({ field: 'dependencies', message: 'Dependencies must be an array', type: 'format' });
            return { isValid: false, errors };
        }

        dependencies.forEach((depId, index) => {
            if (depId === taskId) {
                errors.push({ field: 'dependencies', message: 'Task cannot depend on itself', type: 'self_reference' });
            }
            if (!existingTaskIds.includes(depId) && depId !== taskId) {
                errors.push({ field: 'dependencies', message: `Dependency "${depId}" does not exist`, type: 'not_found' });
            }
        });

        return { isValid: errors.length === 0, errors };
    };

    /**
     * Check if email is duplicate
     * @param {string} email 
     * @param {string} [excludeId] - ID to exclude (for updates)
     * @returns {{isDuplicate: boolean, error: Object|null}}
     */
    const checkDuplicateEmail = (email, excludeId = null) => {
        const state = window.InternSystem.State.getState();
        const normalizedEmail = email.toLowerCase().trim();

        const duplicate = state.interns.find(intern => 
            intern.email.toLowerCase() === normalizedEmail && intern.id !== excludeId
        );

        if (duplicate) {
            return {
                isDuplicate: true,
                error: { field: 'email', message: 'Email is already in use', type: 'duplicate' }
            };
        }
        return { isDuplicate: false, error: null };
    };

    // --- 1. Intern Form Validation ---

    /**
     * Validate intern form data
     * @param {Object} formData 
     * @param {string} [excludeId] - Exclude this ID when checking for duplicates (for updates)
     * @returns {{isValid: boolean, errors: Array}}
     */
    const validateInternForm = (formData, excludeId = null) => {
        const errors = [];

        // Name validation
        if (!formData.name || formData.name.trim() === '') {
            errors.push({ field: 'name', message: 'Name is required', type: 'required' });
        } else if (!isValidName(formData.name)) {
            if (formData.name.trim().length < 2) {
                errors.push({ field: 'name', message: 'Name must be at least 2 characters', type: 'minLength' });
            } else if (formData.name.trim().length > 50) {
                errors.push({ field: 'name', message: 'Name must be 50 characters or less', type: 'maxLength' });
            } else {
                errors.push({ field: 'name', message: 'Name can only contain letters and spaces', type: 'format' });
            }
        }

        // Email validation
        if (!formData.email || formData.email.trim() === '') {
            errors.push({ field: 'email', message: 'Email is required', type: 'required' });
        } else if (!isValidEmail(formData.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address', type: 'format' });
        } else {
            // Check for duplicates
            const dupCheck = checkDuplicateEmail(formData.email, excludeId);
            if (dupCheck.isDuplicate) {
                errors.push(dupCheck.error);
            }
        }

        // Skills validation
        if (!formData.skills || !isValidSkillArray(formData.skills)) {
            errors.push({ field: 'skills', message: 'At least one skill is required', type: 'required' });
        }

        // Status validation
        if (formData.status && !isValidStatus(formData.status)) {
            errors.push({ field: 'status', message: 'Invalid status value', type: 'enum' });
        }

        return { isValid: errors.length === 0, errors };
    };

    // --- 2. Task Form Validation ---

    /**
     * Validate task form data
     * @param {Object} formData 
     * @param {string} [taskId] - Current task ID (for dependency validation)
     * @returns {{isValid: boolean, errors: Array}}
     */
    const validateTaskForm = (formData, taskId = null) => {
        const errors = [];

        // Title validation
        if (!formData.title || formData.title.trim() === '') {
            errors.push({ field: 'title', message: 'Title is required', type: 'required' });
        } else {
            const titleLen = formData.title.trim().length;
            if (titleLen < 3) {
                errors.push({ field: 'title', message: 'Title must be at least 3 characters', type: 'minLength' });
            } else if (titleLen > 100) {
                errors.push({ field: 'title', message: 'Title must be 100 characters or less', type: 'maxLength' });
            }
        }

        // Description validation (optional)
        if (formData.description && formData.description.length > 500) {
            errors.push({ field: 'description', message: 'Description must be 500 characters or less', type: 'maxLength' });
        }

        // Required Skills validation
        if (!formData.requiredSkills || !Array.isArray(formData.requiredSkills) || formData.requiredSkills.length === 0) {
            errors.push({ field: 'requiredSkills', message: 'At least one required skill must be specified', type: 'required' });
        }

        // Estimated Hours validation
        if (formData.estimatedHours === undefined || formData.estimatedHours === null || formData.estimatedHours === '') {
            errors.push({ field: 'estimatedHours', message: 'Estimated hours is required', type: 'required' });
        } else if (!isValidHours(formData.estimatedHours)) {
            const num = parseFloat(formData.estimatedHours);
            if (isNaN(num)) {
                errors.push({ field: 'estimatedHours', message: 'Estimated hours must be a number', type: 'format' });
            } else if (num <= 0) {
                errors.push({ field: 'estimatedHours', message: 'Estimated hours must be positive', type: 'range' });
            } else if (num > 1000) {
                errors.push({ field: 'estimatedHours', message: 'Estimated hours cannot exceed 1000', type: 'range' });
            }
        }

        // Dependencies validation
        if (formData.dependencies && Array.isArray(formData.dependencies) && formData.dependencies.length > 0) {
            const depValidation = validateDependencyArray(taskId, formData.dependencies);
            if (!depValidation.isValid) {
                errors.push(...depValidation.errors);
            }
        }

        return { isValid: errors.length === 0, errors };
    };

    // --- Public API ---
    window.InternSystem.Validators = {
        // Form Validators
        validateInternForm,
        validateTaskForm,

        // Field-level Validators
        isValidEmail,
        isValidSkillArray,
        isValidStatus,
        isValidTaskStatus,
        isValidHours,
        isValidName,

        // Utility Validators
        sanitizeNavInput: sanitizeInput,
        validateDependencyArray,
        checkDuplicateEmail
    };

    console.log('Validators Module Initialized');
})();
