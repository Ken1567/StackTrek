import express from "express";
import bodyParser from "body-parser";
import { writeFile } from 'fs/promises'

const app = express();

const fakeData = [
    {
        name: "Captain Hook",
        age: "40"
    },
    {
        name: "Peter Pan",
        age: "25"
    }
]

const writeLogTxt = async (content) => {
    try {
        await writeFile('log.txt', content, {flag: 'a+'});
    } catch (error) {
        console.log(error);
    }
}


const logger = (req, res, next) => {

    const date = new Date();
    const pst = date.toLocaleString('en-US', {
    timeZone: 'Asia/Manila',
    timeZoneName: 'long',
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h24',
    });


    res.on('finish', () => {
        writeLogTxt(`${req.ip} accessed ${req.url} with ${req.method} at ${pst} with status code ${res.statusCode}\n\n`);
        console.log(`${req.ip} accessed ${req.url} with ${req.method} at ${pst} with status code ${res.statusCode}`);
      })
      


    next();
}


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// app.use('/', router);

app.set('trust proxy',true);

app.get('', logger, (req, res) => {
    res.status(200).send('Welcome to the home page.')
})

app.get('/about', logger, (req, res) => {
    res.status(200).send('This is the about page.')
})

app.get('/contact', logger, (req, res) => {
    res.status(200).send('This is the contact page.')
})

app.post('/data', logger, (req, res) => {
    res.json(fakeData);
})

app.put('*', logger, (req, res) => {
    res.status(404).send("404")
})

app.get('*', logger, (req, res) => {
    res.status(400).send("400")
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}!`);
})