import express from "express";
import bodyParser from "body-parser";
import { readFile } from 'fs/promises'

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const readJSON = async (file) => {
    try {
        // read file and convert to string
        const rawData = await readFile(file, {encoding: 'utf8'});
        // convert raw data into a js object
        const data = JSON.parse(rawData)
        // you can now return the object
        // console.log(data)
        return data
    } catch (err) {
        console.log(err)
    }
}

readJSON('album.json')

app.get('/', (req, res) => {
    res.send("<h1>I see, you're a man of culture as well.</h1>");
})

app.get('/data', (req, res) => {
    readJSON('album.json').then(result => {
        res.send(result)
    });
})

app.get('/search/:id', (req, res) => {
    readJSON('album.json').then(result => {
        if(result[req.params["id"]]) {
            res.status(200).json(result[req.params["id"] - 1]);
        } else {
            res.status(400).send("Data not found")
        }
    })
})

app.get('/secret', (req, res) => {
    res.status(403).send('403; Forbidden Page');
})

app.get('*', (req, res) => {
    res.status(404).send('Error 404 Page not found')
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}!`);
})