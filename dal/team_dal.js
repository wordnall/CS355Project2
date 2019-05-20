var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'CALL team_getall()';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO team (city, team_name, league, division) VALUES (?, ?, ?, ?)';

    var queryData = [params.city, params.team_name, params.league, params.division];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getinfo = function(team_name, callback) {
    var query = 'CALL team_getinfo(?)'; //need to make this procedure
    var queryData = [team_name];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE team SET city = ?, league = ?, division = ? WHERE team_name = ?';
    var queryData = [params.city, params.league, params.division, params.team_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.Delete = function(team_name, callback) {
    var query = 'CALL deleteTeamAndRelations(?)'; //write this procedure

    connection.query(query, team_name, function(err, result) {
        callback(err, team_name);
    });
};