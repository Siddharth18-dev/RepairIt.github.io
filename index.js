var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multer = require("multer"); //Multer is used for Uploading Files, Images to the MongoDB Database

// res.sendFile(__dirname + '/static/index.html');
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended:true
}))

mongoose.connect('mongodb+srv://Admin-Siddharth:DevelopersAhead@cluster0.tcamxlb.mongodb.net/RepairItDB',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

var db = mongoose.connection;

db.on('error', ()=>console.log("ERROR IN CONNECTION TO DATABASE"));
db.once('open', ()=>console.log("CONNECTED TO DATABASE"));

const userSchema = {
  email: String,
  password: String
};

const User = new mongoose.model("User", userSchema);

app.post("/feedback", (req,res)=>{
  var name = req.body.name;
  var email = req.body.email;
  var feedback = req.body.feedback;

  var data = {
    "name": name,
    "email": email,
    "feedback": feedback
  }

  db.collection('feedbacks').insertOne(data,(err, collection)=>{
    if(err){
      throw err;
    }
    console.log("Record Inserted Successfully!");
  });

  return res.redirect('index.html');
});

//Registerations Panel
app.post("/register", (req, res)=> {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var checked = req.body.checked;

  var data = {
    "email": email,
    "username": username,
    "password": password,
    "checked" : checked
  }
  db.collection('users').insertOne(data,(err, collection)=>{
    if(err){
      throw err;
    }
    console.log("Record Inserted Successfully!");
  });

  return res.sendFile(__dirname + '/public/customer-order.html');
})

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username:username}, function(err, foundUser){
    if (err) {
    console.log(err);
  }else{
    if (foundUser) {
        if (foundUser.password === password) {
          res.sendFile(__dirname + '/public/customer-order.html');
        }
    }
  }
});
});

app.post("/customer_order", (req,res)=>{
  var name = req.body.name;
  var mobile1 = req.body.mobile1;
  var mobile2 = req.body.mobile2;
  var Address = req.body.Address;
  var Nationality = req.body.Nationality;
  var State = req.body.State;
  var District = req.body.District;
  var PIN = req.body.PIN;
  var Landmark = req.body.Landmark;
  var work = req.bodywork;
  var ProblemDetail = req.body.ProblemDetail;
  var Scheduled = req.body.Scheduled;
  var Callback = req.body.Callback;

  var data = {
    "name": name,
    "mobile1": mobile1,
    "mobile2": mobile2,
    "Address": Address,
    "Nationality": Nationality,
    "State": State,
    "District": District,
    "PIN": PIN,
    "Landmark": Landmark,
    "work":work,
    "ProblemDetail": ProblemDetail,
    "Scheduled": Scheduled,
    "Callback": Callback
  }

  db.collection('Customer_Order_Details').insertOne(data,(err, collection)=>{
    if(err){
      throw err;
    }
    console.log("Record Inserted Successfully!");
  });

  return res.sendFile(__dirname + '/public/payment.html');
});

app.post("/Jobs", (req,res)=>{
  var name = req.body.name;
  var DOB = req.body.DOB;
  var email = req.body.email;
  var Mobile = req.body.Mobile;
  var Gender = req.body.Gender;
  var PrevOccupation = req.body.PrevOccupation;
  var work = req.body.work;
  var JobRole = req.body.JobRole;
  var Vehicle = req.body.Vehicle;
  var Photo = req.body.Photo;
  var sign = req.body.sign;
  var resume = req.body.resume;
  var address = req.body.address;
  var Nationality = req.body.Nationality;
  var State = req.body.State;
  var District  = req.body.District;
  var PIN  = req.body.PIN;
  var Landmark  = req.body.Landmark;
  var Ques1  = req.body.Ques1;
  var Ques2  = req.body.Ques2;
  var Ques3  = req.body.Ques3;
  var Ques4  = req.body.Ques5;
  var Ques5  = req.body.Ques5;


  var data = {
     "name": name,
     "DOB": DOB,
     "email": email,
     "Mobile": Mobile,
     "Gender": Gender,
     "PrevOccupation": PrevOccupation,
     "work": work,
     "JobRole": JobRole,
     "Vehicle": Vehicle,
     "Photo": Photo,
     "sign": sign,
     "resume": resume,
     "address": address,
     "Nationality": Nationality,
     "State": State,
     "District" : District,
     "PIN" : PIN,
     "Landmark" : Landmark,
     "Ques1" : Ques1,
     "Ques2" : Ques2,
     "Ques3" : Ques3,
     "Ques4" : Ques5,
     "Ques5" : Ques5
  }

  db.collection('Jobs').insertOne(data,(err, collection)=>{
    if(err){
      throw err;
    }
    console.log("Record Inserted Successfully!");
  });

  return res.sendFile(__dirname + '/public/index.html');
});



app.post("/payment", (req,res)=>{
  var ReferenceID = req.body.ReferenceID;
  var Payment_img = req.body.Payment_img;
  var cardname = req.body.cardname;
  var cardnumber = req.body.cardnumber;
  var expmonth = req.body.expmonth;
  var expyear = req.body.expyear;
  var cvv = req.body.cvv;
  var sameadr = req.body.sameadr;

  var data = {
     "ReferenceID": ReferenceID,
     "Payment_img": Payment_img,
     "cardname": cardname,
     "cardnumber": cardnumber,
     "expmonth": expmonth,
     "expyear": expyear,
     "cvv": cvv,
     "sameadr": sameadr
  }

  db.collection('Payment_Details').insertOne(data,(err, collection)=>{
    if(err){
      throw err;
    }
    console.log("Record Inserted Successfully!");
  });

  return res.sendFile(__dirname + '/public/index.html');
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + '/public/Login.html');
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + '/public/Login.html');
});

app.get("/PC_repair", (req, res) => {
  res.sendFile(__dirname + '/public/PC_repair.html');
});

app.get("/mobile_repair", (req, res) => {
  res.sendFile(__dirname + '/public/mobile_repair.html');
});

app.get("/others", (req, res) => {
  res.sendFile(__dirname + '/public/others.html');
});

app.get("/",(req, res)=> {
  res.set({
    "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");
