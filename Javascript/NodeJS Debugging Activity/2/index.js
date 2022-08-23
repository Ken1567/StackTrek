const http = require('http');
const GCF = require('./my_modules/GCF');

const server = http.createServer((req, res) => {
    res.status(200);
    res.end();
});

const PORT = 3000;

server.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running at PORT ${PORT}`);
        console.log(GCF(15,20))
    }
});
GCF();