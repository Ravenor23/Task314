function sendRequest(method, url, body = null) {
        const header = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, DELETE, PUT, POST"
        }

        return fetch(url, {
                method: method,
                mode: 'cors',
                headers: header,
                body: body
        })
}

$(document).ready(() => {
    const userTable = document.getElementById("userTable")

    sendRequest("GET", "/api/users/" + user.id)
        .then(response => response.json())
        .then( response => {
            console.log(response)

            const row = userTable.insertRow()
            const id = row.insertCell(0)
            id.innerHTML = response.id

            const name = row.insertCell(1)
            name.innerHTML = response.name

            const lastname = row.insertCell(2)
            lastname.innerHTML = response.lastname

            const age = row.insertCell(3)
            age.innerHTML = response.age

            const username = row.insertCell(4)
            username.innerHTML = response.username

            const roles = row.insertCell(5)
            roles.innerHTML = response.rolesToString
            document.getElementById("userPageHeading").innerText = response.username + ' has roles: ' + response.rolesToString
        }).catch(err => console.log(err))
})