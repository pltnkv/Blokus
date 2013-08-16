/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 14.08.13
 * Time: 21:25
 * To change this template use File | Settings | File Templates.
 */


var express = require('express'),
    swig = require('swig'),
    app = express();

// assign the swig engine to .html files
app.engine('html', swig.renderFile);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.get('/', function(req, res){
    res.render('index', {
        title: 'Consolidate.js'
    });
});

app.listen(3000);
