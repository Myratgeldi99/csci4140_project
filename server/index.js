
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Pusher = require('pusher');
const users = require('./routes/api/users');

const db = require('./data/db/data')
const carRouter = require('./routes/routes')
const Car = require('./models/car-model')
const passport = require('passport');

const app = express()
const apiPort = 8888
let pusher = new Pusher({
    appId: '1180891',
    key: '6c6f63129b24a5c022c7',
    secret: '16860b6a1b57b4e6d43a',
    cluster: 'ap1',
    useTLS: true
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(passport.initialize());
require('./config/passport')(passport);

app.post('/pusher/auth', (req, res) => {
    let socketId = req.body.socket_id;
    let channel = req.body.channel_name;
    let random_string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let presenceData = {
        user_id: random_string,
        user_info: {
            username: '@' + random_string,
        }
    };
    let auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

app.post('/update-location', (req, res) => {
    // trigger a new location update event via pusher
    pusher.trigger('presence-channel', 'location-update', {
        'username': req.body.username,
        'location': req.body.location
    })
    res.json({ 'status': 200 });
});

app.use('/api/users', users);
app.use('/api', carRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))