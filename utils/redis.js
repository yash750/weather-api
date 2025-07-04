const createClient = require('redis').createClient;
const DEFAULT_EXPIRATION = 3600;

const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

exports.getRedis =async function getRedis(city) {
    try{
        const data = await redisClient.get(`weather?city=${city}`);
        if(data){
            return JSON.parse(data);
        }
        return null;

    }catch(err){
        console.error("Error in getRedis", err);
        return null;
    }
        
}

exports.storeRedis = async function storeRedis(city, result) {
    try{
        await redisClient.set(`weather?city=${city}`, JSON.stringify(result), 'EX', DEFAULT_EXPIRATION);
        return;
    }catch(err){
        console.error("Error in storeRedis", err);
        return null;
    }
    
}