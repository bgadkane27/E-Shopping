const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id:'Ac93x9QsonBXsZBEd1yrEI5YjGIBU2kt342GOHB3ZEGbod26fjGBOleDV52HL-_JWhzNsMXlv0kKPtn9',
    client_secret:'EMve3jRGvCACa_mKpUlif3Z71LhXouN-7hKTJSoccYpkwbg4xB6i0DKsg_nPuO8r4iOzTBiF8u7JeupV'
})

module.exports = paypal