const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//set '' route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Teodora Luca'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Teodora Luca'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "This is my help message",
        title: "Help",
        name: 'Teodora Luca'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if( error ){
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if ( error ) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: "404",
        name: "Teodora Luca",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: "404",
        name: "Teodora Luca",
        errorMessage: "Page not found"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000...')
})