const ansi = require('ansi-colors');
const prompts = require('prompts'); // CLI package calls

const geocoder = require('geocoder');
const geolib = require('geolib');
const geolocation = require('geolocation'); // geo locating package calls

console.log(
`  ____   ___  ___   ____ __ __  ___   ___________ 
 /    | /  _]/   \ /     |  |  |/   \ /    |      |
|   __|/  [_|     |   __|  |  |        \ _|      |
|  |  |    _|  O  |  |  |  _  |  O  |\__  |_|  |_|
|  |_ |   [_|     |  |_ |  |  |     |/  \ | |  |  
|     |     |     |     |  |  |     |\    | |  |  
|___,_|_____|\___/ |___,_|__|__|\___/  \ ___| |__|  
                                                 `
);

(async () => {
    const response = await prompts({
        type: 'text',
        neame: 'input',
        message: 'enter geofence location'
    });
    console.log(response.input);
    geocoder.geocode(`${response.input}`, function (err, data) {
        try {
            console.log(data);
            let fence = {
                lat:true,
                lng: true,
                radius: 200
            }; // create a geofence object
            geolib.getPreciseDistance(
                { latitude: fence.lat, longitude: fence.lng }
            ); // measure the distance to the geofence location
        } catch(err) {
            console.log(err);
        }
    });
})();