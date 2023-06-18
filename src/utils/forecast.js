const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f3d6a1e2f83fc1e789a42bf1809c5f24&query=' + latitude + ',' + longitude 
    console.log("url",url)
    //param units=f  : Fahrenheit degrees

    request({url, json: true}, (error, { body }) => {
        if ( error ){
            callback("unable to connect to location services", undefined)
        } else if ( body.error ) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                weather_descriptions : body.current.weather_descriptions[0],
                current_temperature : body.current.temperature,
                fells_like_temperature : body.current.feelslike 
            })
        }
    })
}

module.exports = forecast