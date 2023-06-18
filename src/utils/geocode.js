const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?types=address&access_token=pk.eyJ1IjoidGVvbHVjYTEyIiwiYSI6ImNsaXQ3cW1tbDFqbWgzZG8xanl1NWE3Y2IifQ.Y2z50ngvZ-Wac4CZ76_7xA&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if ( error ){
            callback("unable to connect to location services", undefined)
        } else if ( body.features.length === 0 ) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1] ,  
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = geocode