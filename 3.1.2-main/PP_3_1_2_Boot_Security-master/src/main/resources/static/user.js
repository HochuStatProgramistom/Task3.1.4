const userTable = document.getElementById("tbody-user-js");
const userNav = document.getElementById("userNav-js");
const leftAdmin = document.getElementById("leftAdmin-js");
const leftUser = document.getElementById("leftUser-js");

const USERS_REST_API_URL = 'http://localhost:8090/api/user';

let currentUser = () => {
    fetch(USERS_REST_API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(user => {
            if (user != null) {
                userTable.innerHTML = `
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.firstName}</td>
                                    <td>${user.lastName}</td>
                                    <td>${user.age}</td>
                                    <td>${user.email}</td>
                                    <td>${user.roles.map((role) => role.name === "ROLE_USER" ? "User" : "Admin")}</td>
                                </tr>`

                userNav.innerHTML = `
                    <span class="align-middle font-weight-bold">${user.username} With role ${user.roles.map((role) => role.name === "ROLE_USER" ? "User" : "Admin")}</span>`

                user.roles.forEach(obj => {
                    Object.entries(obj).forEach(([key, value]) => {
                        if(key == "name") {
                            if(value == "ROLE_ADMIN") {
                                leftAdmin.innerHTML = `
                                <a class="nav-link" href="/admin"
                                aria-controls="v-pills-home" aria-selected="true">Admin</a>`
                            }
                            if(value == "ROLE_USER") {
                                leftUser.innerHTML = `
                                <a class="nav-link active" href="/user"
                                role="tab"                
                                aria-controls="v-pills-profile" aria-selected="false">User</a>`
                            }
                        }
                    });
                })
            }
        })}
currentUser();