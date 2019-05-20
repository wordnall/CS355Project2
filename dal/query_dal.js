var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getQ1 = function(callback){
    var query = 'SELECT p.first_name, p.last_name FROM player p               \n' +
        'WHERE EXISTS (SELECT pg.player_id FROM player_game pg        \n' +
        '                      WHERE pg.player_id = p.player_id)     ';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ2 = function(callback){
    var query = 'SELECT p.first_name, p.last_name, s.stadium_id, s.date_time, s.at_bats, s.hits, s.runs, s.rbi FROM player p\n' +
        'JOIN (SELECT * FROM player_game pg) s on s.player_id = p.player_id\n' +
        'ORDER BY s.date_time, s.stadium_id, p.last_name, p.first_name;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ3 = function(callback){
    var query = 'SELECT p.first_name, p.last_name FROM player p\n' +
        'WHERE p.player_id IN (SELECT s.player_id FROM player_team s);';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ4 = function(callback){
    var query = 'SELECT p.first_name, p.last_name FROM player p\n' +
        'WHERE NOT EXISTS (SELECT * FROM position po WHERE p.player_id = po.player_id);';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ5 = function(callback){
    var query = 'SELECT g.stadium_id, g.date_time, g.runs_home, g.runs_away  FROM game g\n' +
        'WHERE g.stadium_id = (SELECT s.stadium_id FROM stadium s WHERE s.stadium_name = \'AT&T Park\');';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ6 = function(callback){
    var query = 'SELECT tg.team_name, COUNT(tg.home_away) AS gameCount FROM team_game tg\n' +
        'GROUP BY tg.team_name;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ7 = function(callback){
    var query = 'SELECT p.first_name, p.last_name, SUM(s.at_bats) AB, SUM(s.hits) H, SUM(s.runs) R, SUM(s.rbi) RBI FROM player p\n' +
        '  JOIN (SELECT * FROM player_game pg) s on s.player_id = p.player_id\n' +
        'GROUP BY p.player_id\n' +
        'HAVING SUM(s.hits) > 1\n' +
        'ORDER BY p.last_name, p.first_name;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ8 = function(callback){
    var query = 'SELECT p.position, COUNT(p.player_id) AS numberOfPlayers FROM position p\n' +
        'GROUP BY p.position\n' +
        'ORDER BY numberOfPlayers;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ9 = function(callback){
    var query = 'SELECT team_name FROM team\n' +
        'UNION\n' +
        'SELECT team_name FROM team_game;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getQ10 = function(callback){
    var query = 'SELECT DISTINCT team_name from team_game;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};