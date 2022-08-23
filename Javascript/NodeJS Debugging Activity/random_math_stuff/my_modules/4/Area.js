const { radius } = require('./Circle');
const pi = require('./Pi');

function Area (r)
{
    let area = pi*r*r;
    return area;
}

let r = radius;
console.log(Area(r));

module.exports = Area();