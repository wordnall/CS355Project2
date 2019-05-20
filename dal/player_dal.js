var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'CALL player_getall()';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getAllStats = function(callback){
    var query = 'CALL player_stat_totals_getall()';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'CALL player_insert(?,?,?,?)';

    var queryData = [params.first_name, params.last_name, params.bats, params.throws];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getinfo = function(player_id, callback) {
    var query = 'CALL player_getinfo(?)'; //need to make this procedure
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE player SET first_name = ?, last_name = ?, bats = ?, throws = ? WHERE player_id = ?';
    var queryData = [params.first_name, params.last_name, params.bats, params.throws, params.player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.Delete = function(player_id, callback) {
    var query = 'CALL deletePlayerAndRelations(?)'; //write this procedure

    connection.query(query, player_id, function(err, result) {
        callback(err, player_id);
    });
};

exports.associate_team = function(params, callback){
    var query = 'CALL player_team_insert(?, ?, ?, ?, ?)';

    var queryData = [params.player_id, params.team_name, params.jersy_number, params.start_date, params.end_date];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.player_team_getall = function(player_id, callback){
    var query = 'CALL player_team_getall(?)';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result){
        callback(err,result);
    });
};

exports.player_position_getall = function(player_id, callback){
    var query = 'CALL player_position_getall(?)';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.associate_position = function(params, callback){
    var query = 'CALL player_position_insert(?,?)';

    var queryData = [params.player_id, params.position];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};