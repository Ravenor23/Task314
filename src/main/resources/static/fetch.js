function sendRequest(method, url, body = null) {
    const header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }

    return fetch(url, {
        method: method,
        mode: 'cors',
        headers: header,
        body: body
    })
}

$(document).ready(() => {
    const userTable = document.getElementById("table")

    sendRequest("GET", "/api/users").then(response => {
        return response.json()
    }).then( response => {
        console.log(response)

        response.forEach(user => {
            const row = userTable.insertRow()
            const id = row.insertCell(0)
            id.innerHTML = user.id

            const name = row.insertCell(1)
            name.innerHTML = user.name

            const lastname = row.insertCell(2)
            lastname.innerHTML = user.lastname

            const age = row.insertCell(3)
            age.innerHTML = user.age

            const username = row.insertCell(4)
            username.innerHTML = user.username

            const roles = row.insertCell(5)
            roles.innerHTML = user.rolesToString


            const deleteModalButton = row.insertCell(6)
            deleteModalButton.innerHTML = "<button type='button' class='btn btn-danger' data-toggle='modal'>Delete</button>"

            deleteModalButton.addEventListener("click", () => {
                $("#deleteModal").modal()
                populateModal(user, true)
            }, false)


            const editModalButton = row.insertCell(7)
            editModalButton.innerHTML = "<button type='button' class='btn btn-secondary' data-toggle='modal'>Edit</button>"

            editModalButton.addEventListener("click", () => {
                $("#editModal").modal()
                populateModal(user, false)
            }, false)
        })
    }).catch(err => console.log(err))
})

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
        username.value = user.username
        age.value = user.age
        roles.value = user.roles

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






