const formatResult = require('./formatResult');
const redis = require('./redis');
const request = require('request');

const fetchWeather = async function fetchWeather(url, city) {
    try {
        request(url, (error, response, body) => {
            if (error) {
                console.error('Error fetching weather data:', error);
                res.status(500).send('Error fetching weather data');
                return;
            }
            if (response.statusCode !== 200) {
                console.error('Error response from weather API:', response.statusCode);
                res.status(response.statusCode).send('Error fetching weather data');
                return;
            }
            const result = JSON.parse(body);
            const formatedResult = formatResult.format(result);
        
            // Store in Redis
            redis.storeRedis(city, formatedResult);
            console.log(`Cache stored for : ${city}`);
        
            return res.json(formatedResult);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
        return;
    }
}
 module.exports = fetchWeather;


