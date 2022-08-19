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

function populateModal(user, flag) {
    if (flag) {
        const id = document.getElementById("id_deleteModal")

        const name = document.getElementById("name_deleteModal")

        const lastname = document.getElementById("lastname_deleteModal")

        const age = document.getElementById("age_deleteModal")

        const username = document.getElementById("username_deleteModal")

        const roles = document.getElementById("roles_deleteModal")

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

function deleteUser() {
    sendRequest("DELETE", "/api/users/" + id)
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






