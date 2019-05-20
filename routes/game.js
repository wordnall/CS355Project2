var express = require('express');
var router = express.Router();
var game_dal = require('../dal/game_dal');
var stadium_dal = require('../dal/stadium_dal');
var player_dal = require('../dal/player_dal');

router.get('/all', function(req, res, next) {
    game_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('game/game_view_all', {stadium_id: req.query.stadium_id, date_time: req.query.date_time, was_successful: req.query.was_successful, games: result[0]});
        }
    })
});

router.get('/add', function(req, res) {
    stadium_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('game/game_add', {stadium_result: result[0]});
        }
    });
});

router.get('/insert', function(req, res){
    game_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302, '/game/all');
        }
    });
});

router.get('/edit', function(req, res) {
    game_dal.getinfo(req.query.stadium_id, req.query.date_time, function(err, result) {
        if(err){
            res.send(err);
        }else{
            res.render('game/gameUpdate', {game: result[0][0], stadium_result: result[1]});
        }
    });
});

router.get('/update', function(req, res) {
    game_dal.update(req.query, function(err, result) {
        if(err){
            res.send(err);
        }else{
            res.redirect(302, '/game/all');
        }
    });
});

router.get('/delete', function(req, res) {
    game_dal.Delete(req.query.stadium_id, req.query.date_time, function(err, result) {
        if(err){
            res.redirect(302, '/game/all?stadium_id=' + result[0] + '&date_time=' + result[1] + '&was_successful=false');
        }else{
            res.redirect(302, '/game/all?stadium_id=' + result[0] + '&date_time=' + result[1] + '&was_successful=false');
        }
    });
});

router.get('/add_player', function(req, res){
    game_dal.game_player_getall(req.query.stadium_id, req.query.date_time, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('game/game_add_player', {game: result[0][0], players: result[1]})
        }
    });
});


router.get('/associate_player', function(req, res){
    game_dal.associate_player(req.query, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.redirect(302, '/game/all');
        }
    });
});

router.get('/add_team', function(req, res){
    game_dal.game_team_getall(req.query.stadium_id, req.query.date_time, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('game/game_add_team', {game: result[0][0], teams: result[1]})
        }
    });
});


router.get('/associate_team', function(req, res){
    game_dal.associate_team(req.query, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.redirect(302, '/game/all');
        }
    });
});

module.exports = router;