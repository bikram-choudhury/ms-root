require('babel-register')({
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
})

app.listen(3000, () => {
    console.log(`Server listing @ ${3000} port !`);
})