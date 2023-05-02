require('dotenv').config();
    // dotenv module call

const ansi = require('ansi-colors');
const prompts = require('prompts');
const cli_table = require('cli-table3');
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
const http = require('http');
const fs = require('fs');
    // misc package calls

let table = new cli_table({
    chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}
});
    // set the table for user information

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
                    table.push(
                        [ansi.cyan('marker address'), `${info.get('num')} ${info.get('name')} ${info.get('city')} ${info.get('state')} ${info.get('zip')}`],
                        [ansi.cyan('marker location'), `${fence.get('lat')} ${fence.get('lng')}`],
                        [ansi.cyan('marker radius'), `${fence.get('rad')} meters / ${feet} feet`], 
                        [ansi.cyan('marker reached'), reached]
                    );
                    console.log(table.toString());
                        // output the address, latitude/longitude, radius and status of the marker

                    let zoom = 13;
                    let size = '400x400';
                    let mapURL = `http://maps.openstreetmap.org/staticmap?center=${fence.get('lat')},${fence.get('lng')}&zoom=${zoom}&size=${size}`;

                    http.get(mapURL, res => {
                        const file = fs.createWriteStream('map.jpg');
                        res.pipe(file);
                      });

                    console.log(mapURL);
                }
                    // checks if there is street number attached else output destination
              
        } catch(err) {
            console.log(`${[ansi.red('err')]} ` + err);
        }
            // return err message if prompts catches an error
    });
})();