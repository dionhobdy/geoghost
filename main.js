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
ansi.cyan(`  ____   ___  ___   ____ __ __  ___   ___________ 
 /    | /  _]/   \ /     |  |  |/   \ /    |      |
|   __|/  [_|     |   __|  |  |        \ _|      |
|  |  |    _|  O  |  |  |  _  |  O  |\__  |_|  |_|
|  |_ |   [_|     |  |_ |  |  |     |/  \ | |  |  
|     |     |     |     |  |  |     |\    | |  |  
|___,_|_____|\___/ |___,_|__|__|\___/  \ ___| |__|  
                                                 `)
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
               // console.log(data[0]);
                let fence = {
                    num: data[0].streetNumber,
                    name: data[0].streetName,
                    city: data[0].city,
                    state: data[0].state,
                    zipcode: data[0].zipcode,
                    lat: data[0].latitude,
                    lng: data[0].longitude,
                    radius: 15 // radius is measured in meters
                }; // create a geofence object
                console.log(`${ansi.cyan('destination')} ${fence.num} ${fence.name} ${fence.city} ${fence.state} ${fence.zipcode}`);
                console.log(`${ansi.cyan('lat')}  ${fence.lat} ${ansi.cyan('lng')}  ${fence.lng}`);
                new geolocation.Watcher();
                watcher.start();
                geolocation.getCurrentPosition(function (err, position) {
                    if (err) {
                        console.log(`${ansi.red('err')} ` + err);
                    } else {
                        console.log(position);
                    }
                })
            }
        } catch(err) {
            console.log(err);
        }
    });
})();