$(document).ready(() => {
    const createUserBtn = document.getElementById("createUserButton")

    createUserBtn.addEventListener("click", () => {
        sendRequest("POST", "/api/users", JSON.stringify({
            name: document.getElementById("name").value,
            lastname: document.getElementById("lastname").value,
            age: document.getElementById("age").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            roles: document.getElementById("roles").value
        })).then(response => {
            return response.json()
        }).catch(err => console.log(err))
    })
    console.log(createUserBtn)
})

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