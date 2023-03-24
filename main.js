require('dotenv').config();
    // dotenv module call

const ansi = require('ansi-colors');
const prompts = require('prompts'); // CLI package calls

const nodeGeo = require('node-geocoder');
const nodeGeoOptions = {
    provider: 'openstreetmap',
    apiKey: process.env.API_KEY,
    formatter: null
};
const geocoder = nodeGeo(nodeGeoOptions);
const geolib = require('geolib');
const geolocation = require('geolocation'); // geo locating package calls

const browserEnv = require('browser-env'); // misc package calls

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
                let fence = new Map();
                fence.set('lat', data[0].latitude);
                fence.set('lng', data[0].longitude);
                fence.set('rad', 15);
                fence.set('goal', false);

                let info = new Map();
                info.set('num', data[0].streetNumber);
                info.set('name', data[0].streetName);
                info.set('city', data[0].city);
                info.set('state', data[0].state);
                info.set('zip', data[0].zipcode);
                
                if (info.get('num') == undefined ) { 
                    console.log(`[${ansi.red('err')}] invalid destination input`); 
                    process.exit();
                } else {
                    console.log(`[${ansi.cyan('marker')}] ${info.get('num')} ${info.get('name')} ${info.get('city')} ${info.get('state')} ${info.get('zip')}`);
                    console.log(`[${ansi.cyan('marker location')}] ${fence.get('lat')} ${fence.get('lng')}`);
                }

                while (fence.get('rad') == false) { setTimeout(() => {console.log(`[${ansi.cyan('current')}]`);}, '15000') }
            
        } catch(err) {
            console.log(err);
        }
    });
})();