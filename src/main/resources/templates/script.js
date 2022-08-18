



function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = "json"
        xhr.setRequestHeader("content-type", "application/json")

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            }
            resolve(xhr.response)
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send(JSON.stringify(body))
    })
}

sendRequest("POST", requestURL, {
    name: "Stanislav",
    age: 21
})
    .then(data => console.log(data))
    .catch(err => console.log(err))
