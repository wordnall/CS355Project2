var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'CALL game_getall()';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO game (stadium_id, date_time, runs_home, runs_away) VALUES (?, ?, ?, ?)';

    var queryData = [params.stadium_id, params.date_time, params.runs_home, params.runs_away];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getinfo = function(stadium_id, date_time, callback) {
    var query = 'CALL game_getinfo(?, ?)'; //need to make this procedure
    var queryData = [stadium_id, date_time];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE game SET runs_home = ?, runs_away = ? WHERE stadium_id = ? AND date_time = ?';
    var queryData = [params.runs_home, params.runs_away, params.stadium_id, params.date_time];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.Delete = function(stadium_id, date_time, callback) {
    var query = 'CALL deleteGameAndRelations(?, ?)'; //write this procedure
    var queryData = [stadium_id, date_time];

    connection.query(query, queryData, function(err, result) {
        callback(err, queryData); //might not be able to send two data members back in callback
        //if you get an error here just create var queryData = [stadium_id, date_time]; and return queryData
    });
};

exports.game_player_getall = function(stadium_id, date_time, callback){
    var query = 'CALL game_player_getall(?, ?)';
    var queryData = [stadium_id, date_time];

    connection.query(query, queryData, function(err, result){
        callback(err,result);
    });
};

exports.associate_player = function(params, callback){
    var query = 'CALL game_player_insert(?, ?, ?, ?, ?, ?, ?)';

    var queryData = [params.player_id, params.stadium_id, params.date_time, params.at_bats, params.hits, params.runs, params.rbi];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.game_team_getall = function(stadium_id, date_time, callback){
    var query = 'CALL game_team_getall(?, ?)';
    var queryData = [stadium_id, date_time];

    connection.query(query, queryData, function(err, result){
        callback(err,result);
    });
};

exports.associate_team = function(params, callback){
    var query = 'CALL game_team_insert(?, ?, ?, ?, ?)';

    var queryData = [params.team_name, params.stadium_id, params.date_time, params.home_away, params.win_loss];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};