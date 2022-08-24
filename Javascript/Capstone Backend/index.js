import express from "express";
import bodyParser from "body-parser";

const app = express();

const logger = (req, res, next) => {
    console.log(`request url is ${req.url} and reques method is ${req.method}`)
    next()
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let startingId = 2
let users = [
    {
        id: 0,
        username: "shinmentakezo@gmail.com",
        password: "1underDsun"
    },
    {
        id: 1,
        username: "johnwick@gmail.com",
        password: "m4n0fsh33rw1ll"
    },
    {
        id: 2,
        username: "sasakikojiro@gmail.com",
        password: "d34fN0tbl!nd"
    }
]

app.get('/', (req, res) => {
    res.send("Home");
});

app.get('/data', logger, (req, res) => {
    res.json(users)
})

app.get('/secret', (req, res) => {
    res.status(403).end();
})

app.get('/:id', (req, res) => {
    console.log(req.params)
    res.json(users[req.params.id])
})

app.get('*', (req, res) => {
    res.status(404).send('Error 404 Page not found')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    let foundUser = false;

    console.log(username, password)
    users.forEach((user) => {
        console.log(user)
        if (user.username === username) {
            foundUser = true
            if (user.password === password) {
                res.send("Okay")
            }
            else {
                res.status(404)
                res.send("Password is incorrect!")
            }
        }
        else {
            console.log(user.username, username)
        }
    })
    if(!foundUser) res.status(400).send('Username not found')
});

app.post('/changepassword', (req, res) => {
    const { id, newPassword } = req.body

    users.forEach((user) => {
        if (user.id === id) {
            user['password'] = newPassword
            res.send(user)
        }
        else {
            res.send("User not found!")
        }
    })
})

app.post('/register', (req, res) => {
    const { username, password } = req.body
    startingId += 1

    users.push({
        id: startingId,
        username,
        password
    })

    res.status(201).send(`${username} is created`)
})

app.listen(8000,() => {
    console.log(`Server started on http://localhost:8000`);
})