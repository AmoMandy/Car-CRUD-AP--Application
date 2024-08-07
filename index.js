import express from 'express';
import cors from 'cors';
import { cars } from './cars.js';

const app = express();
app.use(cors());

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());



export default function mostPopularMake(cars) {
    const makeCounts = cars.reduce((counts, car) => {
        counts[car.make] = (counts[car.make] || 0) + 1;
        return counts;
    }, {});

    const mostPopular = Object.keys(makeCounts).reduce((a, b) => makeCounts[a] > makeCounts[b] ? a : b);

    return mostPopular;
}
console.log(mostPopularMake(cars));



app.post('/api/cars', function (httpRequest, httpResponse) {
    const newCar = httpRequest.body.newCar
    cars.push(newCar);
    httpResponse.status(201).json(newCar);
});


app.get('/api/cars',function (httpRequest, httpResponse) {
    const cars = httpRequest.query.cars;
    httpResponse.json(cars);
});


app.get('/api/cars/:reg_number', function (httpRequest, httpResponse) {
    const car = httpRequest.query.reg_number;
    
        httpResponse.json(car);
    
});


app.put('/api/cars/:reg_number', function (httpRequest, httpResponse) {
    const carIndex = cars.findIndex(c => c.reg_number === httpRequest.query.reg_number);
    if (carIndex !== -1) {
        cars[carIndex] = { ...cars[carIndex], ...req.body };
        httpResponse.json(cars[carIndex]);
    }
});


app.delete('/api/cars', function (httpRequest, httpResponse) {
    const carIndex = cars.findIndex(c => c.reg_number === httpRequest.query.reg_number);
    if (carIndex !== -1) {
        const deletedCar = cars.splice(carIndex, 1);
        httpResponse.json(deletedCar);
    }
    
});


app.get('/api/mostPopularMake', function (httpRequest, httpResponse)  {
    const makeCounts = cars.reduce((acc, car) => {
        acc[car.make] = (acc[car.make] || 0) + 1;
        return acc;
    }, {});

    httpResponse.json({ mostPopularMake });
});




const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
})