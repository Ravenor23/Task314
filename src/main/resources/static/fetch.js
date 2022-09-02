function sendRequest(method, url, body = null) {
    const header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, DELETE, PUT"
    }

    return fetch(url, {
        method: method,
        mode: 'cors',
        headers: header,
        body: body
    })
}

function populateModal(user, isDeleteModal) {
    if (isDeleteModal) {
        const id = document.getElementById("id_deleteModal")

        const name = document.getElementById("name_deleteModal")

        const lastname = document.getElementById("lastname_deleteModal")

        const age = document.getElementById("age_deleteModal")

        const username = document.getElementById("username_deleteModal")


        id.value = user.id
        name.value = user.name
        lastname.value = user.lastname
        age.value = user.age
        username.value = user.username
    } else {
        const id = document.getElementById("id_editModal")

        const name = document.getElementById("name_editModal")

        const lastname = document.getElementById("lastname_editModal")

        const age = document.getElementById("age_editModal")

        const username = document.getElementById("username_editModal")

        const password = document.getElementById("password_editModal")

        const roles = document.getElementById("roles_editModal")

        id.value = user.id
        name.value = user.name
        lastname.value = user.lastname
        username.value = user.username
        age.value = user.age
        password.value = user.password
        roles.value = user.roles
    }
}

function saveUser() {
    let roles
    if (document.getElementById("roles").value.includes("1")) {
        roles = [
            {
                id: 1,
                "name": "ROLE_ADMIN"
            },
            {
                id: 2,
                name: "ROLE_USER"
            }
        ]
    } else {
        roles = [
            {
                "id": 2,
                "name": "ROLE_USER"
            }
        ]
    }

    const newUserForm = document.getElementById("newUserForm")
    Array.from(newUserForm).forEach(element => {
        if (element === "") {
            event.preventDefault()
        }
    })


    sendRequest("POST", "/api/users", JSON.stringify({
        name: document.getElementById("name").value,
        lastname: document.getElementById("lastname").value,
        age: document.getElementById("age").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        roles: roles

    })).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

function deleteUser() {
    sendRequest("DELETE", "/api/users/" + document.getElementById("id_deleteModal").value)
        .then(response => console.log(response))
        .catch(err => console.log(err))
}

function updateUser() {
    let roles
    const id = document.getElementById("id_editModal").value
    if (document.getElementById("roles_editModal").value.includes("1")) {
        roles = [
            {
                id: 1,
                "name": "ROLE_ADMIN"
            },
            {
                id: 2,
                name: "ROLE_USER"
            }
        ]
    } else {
        roles = [
            {
                "id": 2,
                "name": "ROLE_USER"
            }
        ]
    }

    sendRequest("PUT", "/api/users/" + id, JSON.stringify({
        id: id,
        name: document.getElementById("name_editModal").value,
        lastname: document.getElementById("lastname_editModal").value,
        age: document.getElementById("age_editModal").value,
        username: document.getElementById("username_editModal").value,
        password: document.getElementById("password_editModal").value,
        roles: roles
    }))
        .then(response => response.json())
        .catch(err => console.log(err))
}

function fillAdminUserInformationPage(admin) {
    const adminViewTable = document.getElementById("adminViewTable")
    const adminPageRow = adminViewTable.insertRow()

    const adminId = adminPageRow.insertCell(0)
    adminId.innerHTML = admin.id

    const adminName = adminPageRow.insertCell(1)
    adminName.innerHTML = admin.name

    const adminLastname = adminPageRow.insertCell(2)
    adminLastname.innerHTML = admin.lastname

    const adminAge = adminPageRow.insertCell(3)
    adminAge.innerHTML = admin.age

    const adminUsername = adminPageRow.insertCell(4)
    adminUsername.innerHTML = admin.username

    const adminRoles = adminPageRow.insertCell(5)
    adminRoles.innerHTML = admin.rolesToString
}

function validateForm(event) {
    console.log("submit")
    const newUserForm = document.getElementById("newUserForm")
    Array.from(newUserForm).forEach(element => {
        if (element.value === "") {
            console.log("empty String")
            event.preventDefault()
        }
    })
}





