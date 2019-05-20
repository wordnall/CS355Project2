var express = require('express');
var router = express.Router();
var team_dal = require('../dal/team_dal');

router.get('/all', function(req, res, next) {
    team_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('team/team_view_all', {team_name: req.query.team_name, was_successful: req.query.was_successful, teams: result[0]});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('team/team_add');
});

router.get('/insert', function(req, res){
   team_dal.insert(req.query, function(err, result){
       if(err){
           console.log(err);
           res.send(err);
       }else{
           res.redirect(302, '/team/all');
       }
   });
});

router.get('/edit', function(req, res) {
    team_dal.getinfo(req.query.team_name, function(err, result) {
        if(err){
            res.send(err);
        }else{
            res.render('team/teamUpdate', {team: result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    team_dal.update(req.query, function(err, result) {
        if(err){
            res.send(err);
        }else{
            res.redirect(302, '/team/all');
        }
    });
});

router.get('/delete', function(req, res) {
    team_dal.Delete(req.query.team_name, function(err, team_name) {
        if(err){
            res.redirect(302, '/team/all?team_name' + team_name + '&was_successful=false');
        }else{
            res.redirect(302, '/team/all?team_name=' + team_name + '&was_successful=true');
        }
    });
});

module.exports = router;