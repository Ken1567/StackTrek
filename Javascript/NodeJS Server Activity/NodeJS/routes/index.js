const http = require('http')
const fs = require('fs/promises')

const contactList = require('./contacts')
const aboutDetails = require('./about')
const PORT = 5000

const router = async(file, res) => {
    try {
        file = await fs.readFile(file)
        res.setHeader("Content-Type", "text/html")
        res.writeHead(200)
        res.end(file)
    } catch (err) {
        res.writeHead(404)
        res.end(err)
    }
}

const requestListener = (req, res) => {
    if (req.url === '/home' || req.url === '/') {
        router("home.html", res)
    }
    else if (req.url === '/about' || req.url === '/api/aboutDetails') {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(aboutDetails))
        router("about.html", res)
    }
    else if (req.url === '/contacts' || req.url === '/api/contactList') {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(contactList))
        router("contacts.html", res)
    } else {
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("Page Not Found")
    }
   
    
}
const server = new http.Server(requestListener)
server.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        throw err
    }
    console.log(`Server has started on http://localhost:${PORT}!`)
})