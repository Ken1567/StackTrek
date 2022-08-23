const Area = require('./Area');
const Circumference = require('./Circumference');

let Circle = {
    radius: 5.0,
    circumference: 0.0,
    area: 0.0
};

Circle.circumference = Circumference(Circle.radius);
Circle.area = Area(Circle.radius);

module.exports = Circle;