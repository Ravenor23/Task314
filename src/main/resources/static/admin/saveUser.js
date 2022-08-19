$(document).ready(() => {
    const createUserBtn = document.getElementById("createUserButton")

    createUserBtn.addEventListener("click", () => {
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
    })
})

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