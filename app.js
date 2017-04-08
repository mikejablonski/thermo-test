var express = require('express');
var exec = require('child-process-promise').exec;
var app = express();

app.get('/', function(req, res) {
    res.send('Homebrew automation service.');
});

app.get('/temp', function(req, res) {
    var sensor = {};
    
    exec('python ../Adafruit_Python_MAX31855/examples/nodetest.py')
        .then(function (result) {
            var stdout = result.stdout;
            var stderr = result.stderr;
            
            sensor.temp = stdout;
            res.json(sensor);
        })
        .catch(function (err) {
            console.error('ERROR: ', err);
            res.status(500).send('Something broke!');
        });
    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;