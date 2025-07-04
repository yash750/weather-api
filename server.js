const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const formatResult = require('./utils/formatResult');
const redis = require('./utils/redis');
const fetchWeather = require('./utils/fetchWeatherDetails');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/',function(req, res) {
    res.send('Welcome to Weather API');
    console.log('Welcome to Weather API');
});

app.post('/getWeather', async(req, res) => {
    const city = req.body.city;
    console.log(city);
    if (!city) {
        res.status(400).send('City parameter is required'); 
        return;
    }
    try{
        const redisResult = await redis.getRedis(city);

        if(redisResult){
            console.log(`Cache hit for : ${city}`);
            return res.json(redisResult);
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const result = await fetchWeather(url, city);

        return res.json(result);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    } 

});


app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});




