// State object to hold data for the user management modal
const userMgmtState = {
    companyId: null,
    userId: null, // For editing
    companyData: {
        roles: [],
        sites: [],
        modules: []
    }
};

// This was previously in user_control_panel.html and is moved here.
function onCompanySelect() {
    const companyId = document.getElementById('companySelect').value;
    const addUserBtn = document.getElementById('addUserBtn');
    const userListSection = document.getElementById('userListSection');
    
    if (companyId) {
        userMgmtState.companyId = companyId;
        addUserBtn.disabled = false;
        userListSection.style.display = 'block';
        loadCompanyDataForModal(companyId).then(() => {
            loadUsersForCompany(companyId);
        });
    } else {
        userMgmtState.companyId = null;
        addUserBtn.disabled = true;
        userListSection.style.display = 'none';
    }
}

async function loadUsersForCompany(companyId) {
    const tbody = document.querySelector('#usersTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">Loading...</td></tr>';
    
    try {
        const data = await authFetch(`/company/${companyId}/users`, { forceUserApi: true });
        const users = data.users || [];
        
        tbody.innerHTML = '';
        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">No users found.</td></tr>';
            return;
        }
        
        users.forEach(user => {
            const tr = document.createElement('tr');
            const roles = Array.isArray(user.roles) ? user.roles.join(', ') : (user.roles || '');
            tr.innerHTML = `
               <td>${user.full_name || 'N/A'}</td>
               <td>${user.email}</td>
               <td>${roles}</td>
               <td>
                   <div class="btn-list flex-nowrap">
                       <button class="btn btn-sm" onclick="editUser(${user.user_id}, '${(user.full_name || '').replace(/'/g, "\\'")}', '${user.email}')" ${roles.toLowerCase().includes('owner') ? 'disabled' : ''}>Edit</button>
                       <button class="btn btn-sm btn-outline-danger" onclick="removeUser(${user.user_id})" ${roles.toLowerCase().includes('owner') ? 'disabled' : ''}>Remove</button>
                   </div>
               </td>
            `;
            tbody.appendChild(tr);
        });
        
    } catch (e) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error loading users</td></tr>';
    }
}

// Pre-fetch company-specific data (roles, sites, modules) for the Add/Edit modal
async function loadCompanyDataForModal(companyId) {
    try {
        const [rolesData, sitesData, modulesData] = await Promise.all([
            authFetch(`/company/${companyId}/roles`, { forceUserApi: true }),
            authFetch(`/company/${companyId}/sites`),
            authFetch('/user-management/modules', { forceUserApi: true })
        ]);
        userMgmtState.companyData.roles = rolesData.roles || [];
        userMgmtState.companyData.sites = sitesData.sites || [];
        userMgmtState.companyData.modules = modulesData || [];
    } catch (error) {
        toastr.error('Failed to load company data for user management.');
        console.error(error);
    }
}

// "Edit" button clicked
async function editUser(userId, fullName, email) {
    userMgmtState.userId = userId;
    const modalEl = document.getElementById('addEditUserModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        
        document.getElementById('addEditUserModalTitle').textContent = 'Edit User Permissions';
        document.getElementById('searchUserSection').style.display = 'none';
        document.getElementById('permissionsSection').style.display = 'block';

        const userInfoDiv = document.getElementById('selectedUserInfo');
        userInfoDiv.innerHTML = `<strong>Editing User:</strong> ${fullName} (${email})`;
        userInfoDiv.style.display = 'block';
        
        modal.show();

        await populatePermissionsUI();

        try {
            const data = await authFetch(`/company/${userMgmtState.companyId}/user/${userId}/permissions`, { forceUserApi: true });
            
            (data.role_ids || []).forEach(roleId => {
                const checkbox = document.querySelector(`#roleList input[value="${roleId}"]`);
                if (checkbox) checkbox.checked = true;
            });

            (data.site_ids || []).forEach(siteId => {
                const checkbox = document.querySelector(`#siteList input[value="${siteId}"]`);
                if (checkbox) checkbox.checked = true;
            });

            updateModuleAccessView();
        } catch (error) {
            toastr.error('Failed to load user permissions.');
        }
    }
}

// "Save" button clicked in Add/Edit modal
async function saveUserPermissions() {
    const companyId = userMgmtState.companyId;
    const userId = userMgmtState.userId;

    if (!companyId || !userId) {
        toastr.error("No company or user selected.");
        return;
    }

    const site_roles = [];
    const siteItems = document.querySelectorAll('.site-role-item');
    
    siteItems.forEach(item => {
        const siteId = parseInt(item.dataset.siteId);
        const roleCheckboxes = item.querySelectorAll('input[type="checkbox"]:checked');
        const roleIds = Array.from(roleCheckboxes).map(cb => parseInt(cb.value));
        
        if (roleIds.length > 0) {
            site_roles.push({ site_id: siteId, role_ids: roleIds });
        }
    });

    const payload = {
        user_id: userId,
        site_roles: site_roles
    };

    try {
        const result = await authFetch(`/company/${companyId}/add_user`, {
            method: 'POST',
            body: JSON.stringify(payload),
            forceUserApi: true
        });
        toastr.success(result.message);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('addEditUserModal'));
        modal.hide();
        loadUsersForCompany(companyId);

    } catch (error) {
        // Error is shown by authFetch
    }
}

// "Remove" button clicked
async function removeUser(userId) {
    if (!confirm('Are you sure you want to remove this user from the company?')) {
        return;
    }

    try {
        const result = await authFetch(`/company/${userMgmtState.companyId}/user/${userId}`, {
            method: 'DELETE',
            forceUserApi: true
        });
        toastr.success(result.message);
        loadUsersForCompany(userMgmtState.companyId);
    } catch (error) {
        // Error handled by authFetch
    }
}

// Search for a user to add
async function searchUser() {
    const email = document.getElementById('userSearchInput').value;
    const resultDiv = document.getElementById('userSearchResult');
    if (!email) {
        resultDiv.innerHTML = '<p class="text-danger">Please enter an email to search.</p>';
        return;
    }
    
    resultDiv.innerHTML = 'Searching...';
    try {
        const data = await authFetch(`/users/search?email=${encodeURIComponent(email)}`, { forceUserApi: true });
        const users = data.users || [];
        
        if (users.length === 0) {
            resultDiv.innerHTML = '<p>No user found.</p>';
            return;
        }

        const companyUsersResponse = await authFetch(`/company/${userMgmtState.companyId}/users`, { forceUserApi: true });
        const companyUserIds = (companyUsersResponse.users || []).map(u => u.user_id);

        let html = '<ul class="list-group">';
        users.forEach(user => {
            const isAlreadyAdded = companyUserIds.includes(user.id);
            const safeFullName = (user.full_name || '').replace(/'/g, "\\'");
            html += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${user.full_name}</strong><br>
                        <small>${user.email}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-primary" 
                            onclick="selectUserFromSearch(${user.id}, '${safeFullName}', '${user.email}')"
                            ${isAlreadyAdded ? 'disabled' : ''}>
                        ${isAlreadyAdded ? 'Already Added' : 'Select'}
                    </button>
                </li>
            `;
        });
        html += '</ul>';
        resultDiv.innerHTML = html;

    } catch (error) {
        resultDiv.innerHTML = '<p class="text-danger">Error searching for user.</p>';
    }
}

// A user is selected from the search results
function selectUserFromSearch(userId, fullName, email) {
    userMgmtState.userId = userId;
    document.getElementById('selectedUserId').value = userId;

    const userInfoDiv = document.getElementById('selectedUserInfo');
    userInfoDiv.innerHTML = `<strong>Selected User:</strong> ${fullName} (${email})`;
    userInfoDiv.style.display = 'block';

    document.getElementById('searchUserSection').style.display = 'none';
    document.getElementById('permissionsSection').style.display = 'block';

    populatePermissionsUI();
}

// (Helper functions for Add/Edit Modal)

function populatePermissionsUI() {
    const { roles, sites } = userMgmtState.companyData;
    const roleList = document.getElementById('roleList');
    const siteList = document.getElementById('siteList');

    // Clear previous state
    if(roleList) roleList.innerHTML = ''; // We might not use this anymore if we move roles to sites
    siteList.innerHTML = '';
    
    // We will now render Sites, and inside each Site, a list of Roles
    sites.forEach(site => {
        const siteDiv = document.createElement('div');
        siteDiv.className = 'card mb-2 site-role-item';
        siteDiv.dataset.siteId = site.id;
        
        let rolesHtml = '';
        roles.forEach(role => {
            if (role.name.toLowerCase() === 'owner') return;
            rolesHtml += `
                <label class="form-check form-check-inline me-3">
                    <input class="form-check-input" type="checkbox" value="${role.id}">
                    <span class="form-check-label">${role.name}</span>
                </label>
            `;
        });

        siteDiv.innerHTML = `
            <div class="card-body p-2">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h4 class="card-title m-0">${site.name} ${site.is_primary ? '<span class="badge bg-blue-lt ms-2">Primary</span>' : ''}</h4>
                </div>
                <div class="role-selection">
                    <small class="text-muted d-block mb-1">Assign Roles:</small>
                    ${rolesHtml}
                </div>
            </div>
        `;
        siteList.appendChild(siteDiv);
    });

    // Populate Modules (Read-only reference)
    const moduleBody = document.getElementById('moduleAccessTableBody');
    const { modules } = userMgmtState.companyData;
    moduleBody.innerHTML = '';

    // Populate Modules
    modules.forEach(module => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${module.module_name}</td>
            <td><input type="checkbox" class="form-check-input" data-module-id="${module.module_id}" data-permission="view" disabled></td>
            <td><input type="checkbox" class="form-check-input" data-module-id="${module.module_id}" data-permission="create" disabled></td>
            <td><input type="checkbox" class="form-check-input" data-module-id="${module.module_id}" data-permission="edit" disabled></td>
            <td><input type="checkbox" class="form-check-input" data-module-id="${module.module_id}" data-permission="delete" disabled></td>
        `;
        moduleBody.appendChild(tr);
    });
}

// Override the editUser function to populate the new structure
const originalEditUser = editUser;
editUser = async function(userId, fullName, email) {
    userMgmtState.userId = userId;
    const modalEl = document.getElementById('addEditUserModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        document.getElementById('addEditUserModalTitle').textContent = 'Edit User Permissions';
        document.getElementById('searchUserSection').style.display = 'none';
        document.getElementById('permissionsSection').style.display = 'block';
        const userInfoDiv = document.getElementById('selectedUserInfo');
        userInfoDiv.innerHTML = `<strong>Editing User:</strong> ${fullName} (${email})`;
        userInfoDiv.style.display = 'block';
        modal.show();

        await populatePermissionsUI();

        try {
            const data = await authFetch(`/company/${userMgmtState.companyId}/user/${userId}/permissions`, { forceUserApi: true });
            const siteRoles = data.site_roles || {};

            Object.keys(siteRoles).forEach(siteId => {
                const roleIds = siteRoles[siteId];
                const siteDiv = document.querySelector(`.site-role-item[data-site-id="${siteId}"]`);
                if (siteDiv) {
                    roleIds.forEach(roleId => {
                        const checkbox = siteDiv.querySelector(`input[value="${roleId}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }
            });
        } catch (error) {
            toastr.error('Failed to load user permissions.');
        }
    }
};