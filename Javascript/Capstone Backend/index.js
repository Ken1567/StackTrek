const express = require('express')
const bodyParser = require('body-parser')
const sessions = require('express-session')
const fs = require('fs/promises')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

// set up sessions
app.use(sessions({
    secret: "wag ishare",
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        path: '/', 
        sameSite: 'none',
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false
}))

app.use((req, res, next) => {
    // console.log(req.session)
    // console.log(req.headers)
    next()
})

app.get('/', (req, res) => {
    res.send(`Welcome ${req.body.username}!`)
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/form.html')
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    fs.readFile('./database/users.json', {encoding: 'utf8'})
        .then(res => JSON.parse(res))
        .then(users => {
            let foundUser = false;
            users.forEach((user) => {
                if(user.username === username) {
                    foundUser = true;
                    if (user.password === password) {
                        res.redirect("http://localhost:8000")
                        console.log("redirecting...")
                        req.session.username = username;
                        console.log(req.session)
                        return;
                    }
                    else {
                        res.send("Password is incorrect")
                    }
                }
            })
            if(!foundUser) {
                res.status(400).send("User not found")
            }
        })
        .catch(err => {
            console.log(err)
        })

})

app.post('/signup', async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const users = await JSON.parse(await fs.readFile('./database/users.json', {encoding: 'utf8'}));
    users.push({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password
    })
    await fs.writeFile('./database/users.json', JSON.stringify(users))
    req.session.username = username
    console.log(req.body)
    res.send('okay')
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}!`)
})
