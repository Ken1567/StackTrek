import { Server } from 'http';
import { readFile } from 'fs/promises';
const PORT = 3000;

const routerHTML = async (file, res) => {
    try {
        file = await readFile(file);
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(file);
    } catch (err) {
        res.writeHead(500);
        res.end(err);
    }
};

const routerJSON = async (file, res) => {
    try {
        file = await readFile(file);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(file);
    } catch (err) {
        res.writeHead(500);
        res.end(err);
    }
};

const routerJS = async (file, res) => {
    try {
        file = await readFile(file);
        res.setHeader('Content-Type', 'text/javascript');
        res.writeHead(200);
        res.end(file);
    } catch (err) {
        res.writeHead(500);
        res.end(err);
    }
};

const requestListener = (req, res) => {
    if (req.url === '/home' || req.url === '/') {
        routerHTML('routes/home.html', res);
    } else if (req.url === '/about') {
        routerHTML('routes/about.html', res);
    } else if (req.url === '/contact') {
        routerHTML('routes/contact.html', res);
    } else if (req.url === '/contact_data_json') {
        routerJSON('routes/contacts.json', res);
    } else if (req.url === '/details_json') {
        routerJSON('routes/details.json', res);
    } else if (req.url === '/about_data_js') {
        routerJS('routes/about.js', res);
    } else if (req.url === '/contact_data_js') {
        routerJS('routes/contact.js', res);
    } else {
        routerHTML('routes/404.html', res);
    }
};

const server = new Server(requestListener);

server.listen(PORT, err => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log(`Server has started on http://localhost:${PORT}!`);
})