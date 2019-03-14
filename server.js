"use strict";

const KEY = 'AIzaSyBZkQaihBo7KsVzfL_m_sv6jjzmp6BSGjE';

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.post('/autoPredictPlaces', (req, res) => {
    let predictedPlaces = [];
    axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+req.body.input+'&key='+KEY).then((result) => {
        predictedPlaces = result.data.predictions.map((places) => {
            return places.description;
        });
        res.send(predictedPlaces);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });    
});

app.post('/distanceBetweenPlaces', (req, res) => {
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+req.body.origin+'&destinations='+req.body.destination+'&departure_time=now&key='+KEY).then((result) => {
        res.send(result.data.rows[0].elements);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });    
})


app.all('*', function (req, res) {
    res.redirect("/");
});

app.listen(80, function () {
    console.log("Server up and listening");
});