const request = require('request');

const geocode = (address,callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ291dGFta3VsYWJoaSIsImEiOiJja2pvYW1zdGcxMHYwMnNxcGVmd3V5NXg5In0.HDx3Idb5r5p48dckfslTSg';

    console.log(url);
    request({url,json:true},(error, {body})=>{

        console.log('entered');
        if(error){
            console.log('first');
            callback('Unable to do a network call',undefined)
        }else if(body.features.length === 0 || body.features.length == undefined){
            console.log('second');
            callback('Unable to find location. Try again', undefined)
        }else{

            callback(undefined,{
                latitude : body.features[1].center[1],
                longitude : body.features[1].center[0],
                location : body.features[0].place_name
            })
        }
    })

}

module.exports = geocode;