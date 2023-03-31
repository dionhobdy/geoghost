require('dotenv').config();
    // dotenv module call

const express = require('express');
const app = express();
app.get('/', function (req, res) {
    res.send('connection successful - return to terminal')
});
app.listen(5000); 
let portNum = 5000;
    // express server setup

const ansi = require('ansi-colors');
const prompts = require('prompts'); 
    // CLI package calls

const nodeGeo = require('node-geocoder');
const nodeGeoOptions = {
    provider: 'openstreetmap',
    apiKey: process.env.KEY,
    formatter: null
};
    // openstreetmap api key
const geocoder = nodeGeo(nodeGeoOptions);
const geolib = require('geolib');
const geolocation = require('geolocation'); 
    // geo locating package calls

const browserEnv = require('browser-env')(['navigator']); 
    // misc package calls

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
    // title log
console.log(`[${ansi.green('port')}] ${portNum}`); 
    // print the listening port number

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
                    // measured in meters
                fence.set('goal', false);
                    // create a generative geofence via map

                let feet = Math.floor(fence.get('rad') * 3.28);
                    // convert the radius measurement into feet and round the number

                let info = new Map();
                info.set('num', data[0].streetNumber);
                info.set('name', data[0].streetName);
                info.set('city', data[0].city);
                info.set('state', data[0].state);
                info.set('zip', data[0].zipcode);
                    // gather geofence data via map
                
                if (info.get('num') == undefined ) { 
                    console.log(`[${ansi.red('err')}] invalid destination input`); 
                    process.exit();
                        // inform the user that their input is not valid and exit process
                } else {
                    let reached = ansi.red(fence.get('goal'));
                    if (fence.get('goal') == true) { reached = ansi.green(fence.get('goal'));}
                    console.log(`[${ansi.cyan('marker address')}] ${info.get('num')} ${info.get('name')} ${info.get('city')} ${info.get('state')} ${info.get('zip')}`);
                    console.log(`[${ansi.cyan('marker location')}] ${fence.get('lat')} ${fence.get('lng')}`);
                    console.log(`[${ansi.cyan('marker radius')}] ${fence.get('rad')} meters / ${feet} feet`);
                    console.log(`[${ansi.cyan('marker reached')}] ${reached}`);
                        // output the address, latitude/longitude, radius and status of the marker
                }
                    // checks if there is street number attached 
                
                let dataCallback = (position) => { console.log(position); };
                let errCallback = (err) => { console.log(err); };
                geolocation.getCurrentPosition(dataCallback, errCallback);
                    // obtain and output user position / log err

        } catch(err) {
            console.log(`${[ansi.red('err')]} ` + err);
        }
            // return err message if prompts catches an error
    });
})();