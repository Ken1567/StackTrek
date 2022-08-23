const { radius } = require('./Circle');
const pi = require('./Pi');

function Circumference (r)
{
    let cir = 2*pi*r;
    return cir;
}

let r = radius;
console.log(Circumference(r));

module.exports = Circumference();