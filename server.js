'use strict';
const http = require("http"),
    session = require("koa-session"),
    koa = require("koa"),
    app = koa(),
    fs = require("fs"),
    bodyParser = require("koa-bodyparser"),
    send = require("koa-send")
    ;

app.use(bodyParser());
app.keys = ["some secret hurr"];
app.use(session(app));

app.use(function *(next){
    return yield send(
        this,
        ~this.path.indexOf('.') ? this.path : '/index.html',
        {root: 'public'}
    );
});

//app.listen(3000);

const server = http.createServer(app.callback()),
    switchboard = require("rtc-switchboard")(server, {servelib:true});
server.listen(3000);

switchboard.on('room:create', function(room) {
    console.log('room ' + room + ' created, now have ' + switchboard.rooms.length + ' active rooms');
});

switchboard.on('room:destroy', function(room) {
    console.log('room ' + room + ' destroyed, ' + switchboard.rooms.length + ' active rooms remain');

    if (typeof gc == 'function') {
        console.log('gc');
        gc();
    }
});