var express = require('express');
var router = express.Router();
var query_dal = require('../dal/query_dal');

router.get('/Q1', function(req, res, next) {
    query_dal.getQ1(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q1', {result: result});
        }
    })
});

router.get('/Q2', function(req, res, next) {
    query_dal.getQ2(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q2', {result: result});
        }
    })
});

router.get('/Q3', function(req, res, next) {
    query_dal.getQ3(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q3', {result: result});
        }
    })
});

router.get('/Q4', function(req, res, next) {
    query_dal.getQ4(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q4', {result: result});
        }
    })
});

router.get('/Q5', function(req, res, next) {
    query_dal.getQ5(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q5', {result: result});
        }
    })
});

router.get('/Q6', function(req, res, next) {
    query_dal.getQ6(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q6', {result: result});
        }
    })
});

router.get('/Q7', function(req, res, next) {
    query_dal.getQ7(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q7', {result: result});
        }
    })
});

router.get('/Q8', function(req, res, next) {
    query_dal.getQ8(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q8', {result: result});
        }
    })
});

router.get('/Q9', function(req, res, next) {
    query_dal.getQ9(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q9', {result: result});
        }
    })
});

router.get('/Q10', function(req, res, next) {
    query_dal.getQ10(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('query/Q10', {result: result});
        }
    })
});

module.exports = router;