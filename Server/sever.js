var app = require('./app');

var port = process.env.PORT || 3000
//console.log(process.env);
var server = app.listen(port, ()=>{
    console.log('Express server listening at port '+ port);
});