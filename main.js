const express = require("express");
const app = express();
const http = require("http").createServer(app);
const db = require("./db/db");

const path = require("path");

const io = require("socket.io")(http);
io.on("connection", function (socket) {
    socket.on("board", function (options) {
        socket.emit("board", {
            data: db.getBoardJSON()
        });
    });

    socket.on("on:position", function (options) {
        socket.broadcast.emit('on:position', options);
    });

    socket.on("save:position", function (options) {
        db.savePostion(options.id, options.position);
        socket.broadcast.emit('on:position', options);
    });
});

app.use(express.static(path.join(__dirname, "./public"), {
    index: "index.html"
}));

// error handler : default
app.use(function (req, res, next) {
    // render the error page
    res.status(404);
    res.send({
        message: 'Not Found',
        err: 404
    })
});


const port = 80;
http.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("server running on " + port);
});
