$(document).ready(() => {
    //вкладки
    let i
    const triggerEl = document.getElementsByClassName("myTabs")
    for (i = 0; i < triggerEl.length; i++) {
        triggerEl[i].addEventListener("click", () => {
            $(this).tab();
        })
    }

    //заголовок страницы
    fillAdminUserInformationPage(admin)
    document.getElementById("adminPageHeading").innerText = admin.username + ' has roles: ' + admin.rolesToString

    updateTable()

    const editForm = document.getElementById("edit_form")
    editForm.addEventListener("submit", e => {
        e.preventDefault()
        updateUser()
    })

    const createUserForm = document.getElementById("newUserForm")
    createUserForm.addEventListener("submit", e => {
        e.preventDefault()
        saveUser()
    })
})

