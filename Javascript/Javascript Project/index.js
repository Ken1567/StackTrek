const express = require('express')
const bodyParser = require('body-parser')
const sessions = require('express-session')
const fs = require('fs/promises')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "1234",
    port: 5432
})

// pool.query(
//     `INSERT INTO users (username, password, pen_name, first_name, last_name, birth_date, email_address, bio, link, following, followers)
//     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//     RETURNING *`, ['@shinmentakezo12', 'Password123', 'Jay', 'John', 'Smith', 'July 1995', 'johnsmith@gmail.com', 'Male. Programmer. Edgy.', 'github/Ken1567', 1256, 1234]
// ).then(users => {
//     console.log(users.rows)
// })

pool.query(
    `INSERT INTO post (pen_name, username, time_stamp, message, privacy)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`, ['Bard of Sorrows', '@shinmentakezo12', '1997-12-01', 'To love and to be loved is to feel the sun from both sides', true]
).then(post => {
    console.log(post.rows)
})

pool.query(
    `INSERT INTO comment (pen_name, username, message)
    VALUES($1, $2, $3)
    RETURNING*`, ['Merchant of Venice', '@sasakikojiro15', 'But burns twice as much.']
).then(comment => {
    console.log(comment.rows)
})

app.use(express.static(__dirname + '/public'))

// set up sessions
app.use(sessions({
    store: new (require('connect-pg-simple')(sessions))({
        pool: pool,
        createTableIfMissing: true
    }),
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
    res.send(`Welcome ${req.session.username}!`)
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
                        req.session.save()
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