let i
const triggerEl = document.getElementsByClassName("myTabs")
for (i = 0; i < triggerEl.length; i++) {
    triggerEl[i].addEventListener("click", () => {
        $(this).tab();
    })
}

const usersTable = document.getElementById("table")

sendRequest("GET", "/api/users")
    .then(response => response.json())
    .then(response => {


        fillAdminUserInformationPage(admin)

        document.getElementById("adminPageHeading").innerText = admin.username + ' has roles: ' + admin.rolesToString

        response.forEach(user => {
            const row = usersTable.insertRow()
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
                console.log(user.rolesToString)

                if (!(user.rolesToString.includes("ADMIN"))) {
                    const adminOption = document.getElementById("adminOption")
                    adminOption.style.display = "none"
                } else {
                    adminOption.style.display = "block"
                }

            }, false)


            const editModalButton = row.insertCell(7)
            editModalButton.innerHTML = "<button type='button' class='btn btn-secondary' data-toggle='modal'>Edit</button>"

            editModalButton.addEventListener("click", () => {
                $("#editModal").modal()
                populateModal(user, false)
            }, false)
        })
    }).catch(err => console.log(err))