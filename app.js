const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 1002;

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the tamplet engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINS
app.get('/', (req, res) => {
    const params = {}
    res.render('index.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Successfully Submitted")
    }).catch(() => {
        res.status(400).send("Item was not saved to the databased")
    });
    // res.render('contact.pug');
})
// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})