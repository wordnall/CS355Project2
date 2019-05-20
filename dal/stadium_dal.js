var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'CALL stadium_getall()';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO stadium (team_name, address, stadium_name) VALUES (?, ?, ?)';

    var queryData = [params.team_name, params.address, params.stadium_name];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getinfo = function(stadium_id, callback) {
    var query = 'CALL stadium_getinfo(?)'; //need to make
    var queryData = [stadium_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE stadium SET team_name = ?, address = ?, stadium_name = ? WHERE stadium_id = ?';
    var queryData = [params.team_name, params.address, params.stadium_name, params.stadium_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.Delete = function(stadium_id, callback) {
    var query = 'CALL deleteStadiumAndRelations(?)'; //write this procedure

    connection.query(query, stadium_id, function(err, result) {
        callback(err, stadium_id);
    });
};