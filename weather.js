let request = require('request');

let apiKey = '64f5f100c1b5dddfe0a28db2cc50e320';
let city = 'san diego';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
  }
});