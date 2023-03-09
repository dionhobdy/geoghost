const ansi = require('ansi-colors');
const prompts = require('prompts'); // CLI package calls

const nodeGeo = require('node-geocoder');
const nodeGeoOptions = {
    provider: 'openstreetmap',
    apiKey: '',
    formatter: null
};
const geocoder = nodeGeo(nodeGeoOptions);
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
    let res = await prompts({
        type: 'text',
        neame: 'input',
        message: 'enter geofence location'
    });
    geocoder.geocode(`${res.undefined}`, function (err, data) {
        try {
            if (data[0].streetNumber == undefined) {
                console.log(`${ansi.red('err')} full address needed for the geofence`);
            } else {
                console.log(data);
                let fence = {
                    lat: data[0].latitude,
                    lng: data[0].longitude,
                    radius: 200
                }; // create a geofence object
                console.log(`${ansi.cyan('lat')}  ${fence.lat} ${ansi.cyan('lng')}  ${fence.lng}`);
            }
        } catch(err) {
            console.log(err);
        }
    });
})();