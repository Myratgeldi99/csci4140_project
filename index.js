const path = require('path')
const express = require('express');
const app = express();
const passport = require('passport');
const connectDB = require('./config/db');
const users = require('./routes/api/users');

connectDB();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize());
require('./config/passport')(passport);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})