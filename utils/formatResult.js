exports.format = function(result) {
    const formattedResult = {
        name: result.name,
        main: {
            temp: (result.main.temp - 273.15).toFixed(2),
            temp_min: (result.main.temp_min - 273.15).toFixed(2),
            temp_max: (result.main.temp_max - 273.15).toFixed(2),
            feels_like: (result.main.feels_like - 273.15).toFixed(2),
            pressure: result.main.pressure / 1000,
            humidity: result.main.humidity.toFixed(2)
        },
        wind: {
            speed: result.wind.speed.toFixed(2)
        },
        clouds: {
            all: result.clouds.all.toFixed(2)
        },
        timezone: result.timezone / 3600,
        dt: new Date(result.dt * 1000).toLocaleString()
    };

    return formattedResult;
}
