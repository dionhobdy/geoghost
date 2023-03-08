const ansi = require('ansi-colors');
const prompts = require('prompts'); // CLI package calls

const nodeGeo = require('node-geocoder');
const nodeGeoOptions = {
    provider: 'openstreetmap',
    apiKey: '9JrIeZa95cO9EkM1PeoqPvNa7kaz1FYfyjiCiKFN',
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
            console.log(data);
            let fence = {
                lat: data.latitude[0],
                lng: data.longitude[0],
                radius: 200
            }; // create a geofence object
            console.log(`${ansi.cyan('lat')} - ${fence.latitude} ${ansi.cyan('lng')} - ${fence.longitude}`);
            console.log(res.undefined);
        } catch(err) {
            console.log(err);
        }
    });
})();