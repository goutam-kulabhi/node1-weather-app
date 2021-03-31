const request = require('request');

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bb7cca2a24d9be1cd3ad7f19b0131693&query='+ lat + ',' + long;

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('No network available to fetch forecast details',undefined)
        }else if(body.success == false){
            callback('Please enter valid coordinates', undefined)
        }else{
            callback(undefined,{
                forecast : body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast;