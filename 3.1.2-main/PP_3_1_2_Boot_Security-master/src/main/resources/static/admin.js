// URL const
const requestURL = 'http://localhost:8090/api/admin';
const userURL = 'http://localhost:8090/api/user';
// user table const
const allUsersTable = document.getElementById("users-table-js");
// navbar const
const userNavA = document.getElementById("userNavA-js");
const leftAdminJS = document.getElementById("leftAdmin-js-admin");
const leftUserJS = document.getElementById("leftUser-js-admin");
// table users tab const
const usersTableTab = document.getElementById("tabUsersTable-js");
// save user const
const saveUserForm = document.querySelector(".add-user-form");
// save user data const
const saveUserFirstName = document.getElementById("add-user-form-firstName");
const saveUserLastName = document.getElementById("add-user-form-lastName");
const saveUserEmail = document.getElementById("add-user-form-email");
const saveUserAge = document.getElementById("add-user-form-age");
const saveUserPassword = document.getElementById("add-user-form-password");
const saveUserRoles = document.getElementById("add-user-form-roles");
// save user submit const
const saveUserButtonSubmit = document.getElementById("add-btn-submit");
// edit
const modalEditExitBtn = document.getElementById("exit_btn-modal-edit");
const modalEditCloseBtn = document.getElementById("close_btn-modal-edit");
const modalEditSubmitBtn = document.getElementById("submit_btn-modal-edit");
const editUsersRoles = document.getElementById("edit-rolesSelect");
const editRoleAdminOption = document.getElementById("edit-role_admin");
const editRoleUserOption = document.getElementById("edit-role_user");
// delete
const deleteRoleAdminOption = document.getElementById("delete-role_admin");
const deleteRoleUserOption = document.getElementById("delete-role_user");
const modalDeleteSubmitBtn = document.getElementById("submit_btn-modal-delete");
const modalDeleteExitBtn = document.getElementById("exit_btn-modal-delete");
const modalDeleteCloseBtn = document.getElementById("close_btn-modal-delete");
// delete user data const
const deleteUserId = document.getElementById("delete-id");
const deleteUserFirstName = document.getElementById("delete-firstName");
const deleteUserLastName = document.getElementById("delete-lastName");
const deleteUserEmail = document.getElementById("delete-email");
const deleteUserAge = document.getElementById("delete-age");
const deleteUserPassword = document.getElementById("delete-password");
// update user data const
const updateUserId = document.getElementById("edit-id");
const updateUserFirstName = document.getElementById("edit-firstName");
const updateUserLastName = document.getElementById("edit-lastName");
const updateUserEmail = document.getElementById("edit-email");
const updateUserAge = document.getElementById("edit-age");
const updateUserPassword = document.getElementById("edit-password");

// Users table
const renderUsers = (users) => {
    if (users.length > 0) {
        let usersListTable = '';
        users.forEach((user) => {
            usersListTable += `
                <tr>
                    <td> ${user.id} </td>
                    <td> ${user.firstName} </td>
                    <td> ${user.lastName} </td>
                    <td> ${user.age} </td>
                    <td> ${user.email} </td>
                    <td> ${user.roles.map((role) => role.name === "ROLE_USER" ? " User" : " Admin")} </td>
                    <td> <button type="button" class="btn btn-info" id="btn-edit-modal-call" data-toggle="modal" data-target="modal-edit"
                    data-email="${user.email}">Edit</button></td>
                    <td> <button type="button" class="btn btn-danger" id="btn-delete-modal-call" 
                    data-email="${user.email}">Delete</button></td>
                </tr>
        `
        })
        allUsersTable.innerHTML = usersListTable;
    }
}

// GET ALL USERS
function getAllUsers () {
    fetch(requestURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            renderUsers(data);
        })
}
getAllUsers();

// ADMIN NAVBAR
let currentAdmin = () => {
    fetch(userURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(userA => {
            if (userA != null) {
                userNavA.innerHTML = `
                    <span class="align-middle font-weight-bold">${userA.username} With role ${userA.roles.map((role) => role.name === "ROLE_USER" ? "User" : "Admin")}</span>`

                userA.roles.forEach(obj => {
                    Object.entries(obj).forEach(([key, value]) => {
                        if(key == "name") {
                            if(value == "ROLE_ADMIN") {
                                leftAdminJS.innerHTML = `
                                <a class="nav-link active" href="/admin"
                                aria-controls="v-pills-home" aria-selected="true">Admin</a>`
                            }
                            if(value == "ROLE_USER") {
                                leftUserJS.innerHTML = `
                                <a class="nav-link" href="/user"
                                role="tab"                
                                aria-controls="v-pills-profile" aria-selected="false">User</a>`
                            }
                        }
                    });
                })
            }
        })}
currentAdmin();

// GET ROLES
function getRolesFromAddUserForm() {
    let roles = Array.from(saveUserRoles.selectedOptions)
        .map(option => option.value);
    let rolesToAdd = [];

    if (roles.includes("1")) {

        let role1 = {
            id: 1,
            name: "Admin"
        }
        rolesToAdd.push(role1);
    }

    if (roles.includes("2")) {

        let role2 = {
            id: 2,
            name: "User"
        }
        rolesToAdd.push(role2);
    }
    return rolesToAdd;
}

// SAVE USER
saveUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
            firstName: saveUserFirstName.value,
            lastName: saveUserLastName.value,
            age: saveUserAge.value,
            email: saveUserEmail.value,
            password: saveUserPassword.value,
            roles:getRolesFromAddUserForm()
    }
    fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
            usersTableTab.click();
            location.reload();
    });
})

// UPDATE USER
function getRolesFromEditUserForm() {
    let roles = Array.from(editUsersRoles.selectedOptions)
        .map(option => option.value);
    let rolesToEdit = [];
    if (roles.includes("2")) {
        let role1 = {
            id: 2,
            name: "Admin"
        }
        rolesToEdit.push(role1);
    }
    if (roles.includes("1")) {
        let role2 = {
            id: 1,
            name: "User"
        }
        rolesToEdit.push(role2);
    }
    return rolesToEdit;
}

// CHECK EDIT / DELETE
allUsersTable.addEventListener("click", (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id === 'btn-delete-modal-call';
    let editButtonIsPressed = e.target.id === 'btn-edit-modal-call';

    if (delButtonIsPressed) {
        let currentUserEmail = e.target.dataset.email;
        fetch(requestURL + "/" + currentUserEmail, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(user => {

                deleteUserId.value = user.id;
                deleteUserFirstName.value = user.firstName;
                deleteUserLastName.value = user.lastName;
                deleteUserAge.value = user.age;
                deleteUserEmail.value = user.email;
                deleteUserPassword.value = user.password;

                let deleteRoles = user.roles.map(role => role.name)
                deleteRoles.forEach(
                    role => {
                        if (role === "ROLE_ADMIN") {
                            deleteRoleAdminOption.setAttribute('selected', "selected");

                        } else if (role === "ROLE_USER") {
                            deleteRoleUserOption.setAttribute('selected', "selected");
                        }
                    })
            })
        $('#modal-delete').modal('show');

        modalDeleteSubmitBtn.addEventListener("click", e => {
            e.preventDefault();
            fetch(`${requestURL}/${currentUserEmail}`, {
                method: 'DELETE',
            })
                .then(res => res.json());
            modalDeleteExitBtn.click();
            getAllUsers();
            location.reload();
        })
    }

    if (editButtonIsPressed) {
        let currentUserEmail = e.target.dataset.email;

        fetch(requestURL + "/" + currentUserEmail, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(user => {

                updateUserId.value = user.id;
                updateUserFirstName.value = user.firstName;
                updateUserLastName.value = user.lastName;
                updateUserAge.value = user.age;
                updateUserEmail.value = user.email;
                updateUserPassword.value = user.password;

                let editRoles = user.roles.map(role => role.name)
                editRoles.forEach(
                    role => {
                        if (role === "ROLE_ADMIN") {
                            editRoleAdminOption.setAttribute('selected', "selected");

                        } else if (role === "ROLE_USER") {
                            editRoleUserOption.setAttribute('selected', "selected");
                        }
                    })
            })
        $('#modal-edit').modal('show');

        modalEditSubmitBtn.addEventListener("click", e => {
            e.preventDefault();
            let user = {
                id: updateUserId.value,
                firstName: updateUserFirstName.value,
                lastName: updateUserLastName.value,
                age: updateUserAge.value,
                email: updateUserEmail.value,
                password: updateUserPassword.value,
                roles: getRolesFromEditUserForm(),
            }

            fetch(`${requestURL}/${currentUserEmail}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(user)
            })
                .then(res => console.log(res));
            modalEditExitBtn.click();
            getAllUsers();
            location.reload();
        })
    }
})

let removeSelectedRolesFromEditDoc = () => {
    if (editRoleAdminOption.hasAttribute('selected')) {
        editRoleAdminOption.removeAttribute('selected')
    }
    if (editRoleUserOption.hasAttribute('selected')) {
        editRoleUserOption.removeAttribute('selected')
    }
}
modalEditExitBtn.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromEditDoc();
})
modalEditCloseBtn.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromEditDoc();
})

let removeSelectedRolesFromDeleteDoc = () => {
    if (deleteRoleAdminOption.hasAttribute('selected')) {
        deleteRoleAdminOption.removeAttribute('selected')
    }
    if (deleteRoleUserOption.hasAttribute('selected')) {
        deleteRoleUserOption.removeAttribute('selected')
    }
}

modalDeleteExitBtn.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromDeleteDoc();
})

modalDeleteCloseBtn.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromDeleteDoc();
})