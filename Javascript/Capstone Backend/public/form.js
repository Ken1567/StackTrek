const signupBtn = document.getElementById("signup")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const firstnameInput = document.getElementById("firstname")
const lastnameInput = document.getElementById("lastname")

signupBtn.onclick = (e) => {
    e.preventDefault()
    window.location.replace("/login")
    fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: firstnameInput.value,
            lastname: lastnameInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        })
    })
}