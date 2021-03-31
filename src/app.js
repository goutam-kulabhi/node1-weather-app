const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


// define paths for express config
const dynamicServePath = path.join(__dirname,'../public');
const viewsFolderPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

hbs.registerPartials(partialsPath);

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

// express config to serve up static files
app.use(express.static(dynamicServePath));

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Home Page',
        author : 'Goutam Kulabhi'
    });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About Page',
        author: 'Goutam Kulabhi'
    })
});

app.get('/help',(req, res) => {
    res.render('help',{
        page : "HELP PAGE",
        title : "Help title",
        author: "Goutam Kulabhi"

    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error : 'Please provide the address for getting weather'
        })
    }

    geocode(req.query.address,(error,data={})=>{
        console.log(error);
        console.log(JSON.stringify(data));

        if(error){
          return res.send({
                error 
            })
        }

        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData.forecast,
                location: data.location,
                address : req.query.address
            })

        })
    })
    
});

app.get('/help/*', (req, res) => {
    res.render('404-error',{
        title: 'Error',
        author : "Goutam Kulabhi",
        errormessage : 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404-error',{
        title : "404 page",
        author : 'Goutam Kulabhi',
        errormessage : 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up and running at port number ' + port);
});