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