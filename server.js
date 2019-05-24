/*require('babel-register')({
    presets: ['react', 'env']
});

const   express = require('express'),
        app = express(),
        ReactDOMServer = require('react-dom/server'),
        AppComponent = require('./components/App.component.jsx').default;
        
var React = require('react');
app.use(express.static('public')); // public folders to serve app without any router config

app.get('/', (request, response) => {
    const html = ReactDOMServer.renderToString(
        React.createElement(AppComponent)
    );
    // const html = `<h3>I am from server side .....</h3>`;
    response.send(html);
});*/


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://msroot:4msroot@ds159546.mlab.com:59546/ms-root', (err) => {
if (err) throw new Error(err);
    console.log("Database Connected successfully");
});

const api = require('./server/routes/api');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listing @ ${PORT} port !`);
})

module.exports = app;
