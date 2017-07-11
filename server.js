const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


app.use(function(req, res, next){
    var now = new Date().toDateString();
    
    var log = now+" "+req.method+" "+req.path
    
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', function(error){
        if (error){
            console.log("Unable to append to server.log");
        }
    });
    
    next();
})


/*app.use(function(req, res, next){
    res.render('maintenance.hbs')
});*/

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('screamIt', function(text){
    return text.toUpperCase()
});

app.get('/',function(req, res){
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        date: new Date().getFullYear(),
        welcomeMsg: 'Hi there'
    })
})


app.get('/about', function(req, res){
    res.render('about.hbs', {
        pageTitle: 'About Page',
        date: new Date().getFullYear()
    });
})


/*app.get('/bad', function(req, res){
    res.send({
       error :"Unable to fulfil request"
    })
})*/

// send back json with errorMessage

app.listen(port);
