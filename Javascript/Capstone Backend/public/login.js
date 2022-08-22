const loginBtn = document.getElementById("login")
const signupBtn = document.getElementById("signup")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

signupBtn.onclick = e => {
    e.preventDefault()
    window.location.replace("/signup")
}

loginBtn.onclick = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value
        })
    })
    window.location.replace("/homepage.html")
}