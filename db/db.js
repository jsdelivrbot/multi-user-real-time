const low = require("lowdb");
const path = require("path");
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, "db.json"));
const db = low(adapter);


module.exports = {
    getBoardJSON: function () {
        return db.get("board");
    },

    setBoardJSON: function (json) {
        return db.set("board", json).write();
    },

    savePostion: function (id, position) {
        db.get("board").get("elements").get(id).set("position", position).write();
    }
};



