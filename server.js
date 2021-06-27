var express = require('express');
var path = require("path");
var bodyParser = require('bpdy-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://https://pathoduxchat.firebaseapp.com/", function(err, response){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to' + db, '+' , response);
    }
})

var app = express()
app.use(bodyParser());
app.use(bodyparser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'https://pathoduxchat.firebaseapp.com/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Allow-Allow-credentials', true);
    next()
})
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log("Server is running.");
  });
var Schema = mongo.Schema;
 var UserSchema = new Schema({
     name: { type: String},
     address:{type:String}, 
 },
 {varsionKey:fasle}
 );

 var model = mongo.model('users', UserSchema, 'users');

 app.post("/api/SaveUser", function(req, res){
     var mod = new model(req.body);
     if(req.body.mode =="Save"){
        mod.save(function(err,data){
            if(err){
                res.send(err);
            }else{
                res.send({data:"Record has been Inserted..!!"});
            }
        })
     }else{
         model.findByIdAndUpdate(req.body.id, {
             name:req.body.name,
             address: req.body.address
         },
         function(err, data){
             if(err){
                 res.send(err);
             }else{
                 res.send({data:"Record has been updated..!!"});
             }
         });
     }
 })

 app.post('/api/deleteUser', function(req, res){
     model.remove({
         _id: req.body.id
     }, 
     function(err){
         if(err){
             res.send(err);
         }else{
             res.send({
                 data: "Record has been Deleted..!!"
           });
         }
     }
     )
 });

 app.get('/api/getUser', function(req,res){
     model.find({},
        function(err,data){
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        })
 })

 