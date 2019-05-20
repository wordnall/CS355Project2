var express = require('express');
var router = express.Router();
var stadium_dal = require('../dal/stadium_dal');
var team_dal = require('../dal/team_dal');

router.get('/all', function(req, res, next) {
    stadium_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('stadium/stadium_view_all', {stadium_id: req.query.stadium_id, was_successful: req.query.was_successful, stadiums: result[0]});
        }
    })
});

router.get('/add', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('stadium/stadium_add', {team_result: result[0]});
        }
    });
});

router.get('/insert', function(req, res){
    stadium_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302, '/stadium/all');
        }
    });
});

router.get('/edit', function(req, res) {
    stadium_dal.getinfo(req.query.stadium_id, function(err, result) {
        if(err){
            res.send(err);
        }else{
            res.render('stadium/stadiumUpdate', {stadium: result[0][0], team_result: result[1]});
        }
    });
});

router.get('/update', function(req, res) {
    stadium_dal.update(req.query, function(err, result) {
        if(err){
            res.send(err);
        }else{
            res.redirect(302, '/stadium/all');
        }
    });
});

router.get('/delete', function(req, res) {
    stadium_dal.Delete(req.query.stadium_id, function(err, stadium_id) {
        if(err){
            res.redirect(302, '/stadium/all?stadium_id=' + stadium_id + '&was_successful=false');
        }else{
            res.redirect(302, '/stadium/all?stadium_id=' + stadium_id + '&was_successful=true');
        }
    });
});

module.exports = router;