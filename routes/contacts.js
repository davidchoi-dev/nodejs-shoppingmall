var express = require('express');
var router = express.Router();
var ContactsModel = require('../models/ContactsModel');


router.get( '/', function(req,res){
    res.redirect('/contacts/list');
});

router.get('/list', function(req,res){
    ContactsModel.find(function(err,contacts){
        res.render( 'contacts/list' , 
            { contacts : contacts } // DB에서 받은 contacts를 contacts변수명으로 내보냄
        );
    });
});

router.get('/list/write', function(req,res){
    //edit에서도 같은 form을 사용하므로 빈 변수( contact )를 넣어서 에러를 피해준다
    res.render( 'contacts/form' , { contact : "" }); 
});

router.post('/list/write', function(req,res){
    var contact = new ContactsModel({
        name : req.body.name,
        description : req.body.description,
    });
    contact.save(function(err){
        res.redirect('/contacts/list');
    });
});

router.get('/list/detail/:id' , function(req, res){
    //url 에서 변수 값을 받아올떈 req.params.id 로 받아온다
    ContactsModel.findOne( { 'id' :  req.params.id } , function(err ,contact){
        res.render('contacts/detail', { contact : contact });  
    });
});

router.get('/list/edit/:id' ,function(req, res){
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    ContactsModel.findOne({ id : req.params.id } , function(err, contact){
        res.render('contacts/form', { contact : contact });
    });
});

router.post('/list/edit/:id', function(req, res){
    //넣을 변수 값을 셋팅한다
    var query = {
        name : req.body.name,
        description : req.body.description,
    };

    //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 값들
    ContactsModel.update({ id : req.params.id }, { $set : query }, function(err){
        res.redirect('/contacts/list/detail/' + req.params.id ); //수정후 본래보던 상세페이지로 이동
    });
});

router.get('/list/delete/:id', function(req, res){
    ContactsModel.remove({ id : req.params.id }, function(err){
        res.redirect('/contacts/list');
    });
});

module.exports = router;