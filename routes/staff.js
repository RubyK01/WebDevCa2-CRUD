var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var staffID = req.body.staffID
  var staffType = req.body.staffType
  var fName = req.body.fName
  var lName = req.body.lName
  var hourlyPay = parseFloat(req.body.hourlyPay)
  var storeID = req.query.storeID
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'Dadmamme2001',
    database: 'pc_world'
  });
  var staff = connection.query("SELECT * from staff");
  console.log(staff);

  res.render('staff', {
    title: 'Staff',
    staff:staff
  });
});

router.get('/add', function(req, res, next){
  res.render('add', {title: 'Add staff member'})
})

router.get('/delete', function(req, res, next) {
  var staffID = req.query.staffID
  var staffType = req.query.staffType
  var fName = req.query.fName
  var lName = req.query.lName
  var hourlyPay = parseFloat(req.query.hourlyPay)
  var staffID = req.query.staffID
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'Dadmamme2001',
    database: 'pc_world'
  });
  connection.query("DELETE FROM staff where staffID = (?);", [staffID])
  res.redirect('/staff')
})

router.post('/add', function(req, res, next) {
  var staffID = req.body.staffID
  var staffType = req.body.staffType
  var fName = req.body.fName
  var lName = req.body.lName
  var storeID = req.body.storeID
  var hourlyPay = parseFloat(req.body.hourlyPay)
  console.log(staffID, staffType, fName, lName, hourlyPay, storeID);
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'Dadmamme2001',
    database: 'pc_world'
  });
  connection.query("INSERT INTO staff (staffID, staffType, fName, lName, hourlyPay , storeID) VALUES ((?), (?), (?), (?), (?), (?));", [staffID, staffType, fName, lName, hourlyPay, storeID]);
  res.redirect("/staff");
})

router.get('/updateStaff', function(req, res, next){ //or it can be edit
  var staffID = req.query.staffID
  var staffType = req.query.staffType
  var fName = req.query.fName
  var lName = req.query.lName
  var hourlyPay = parseFloat(req.query.hourlyPay)
  var storeID = req.query.storeID
  //console.log(staff_id);//check the id of the staff name/member

  res.render("updateStaff", { //name of the ejs file
    title: 'Update Staff',
    staffID: staffID,
    staffType: staffType,
    fName: fName,
    lName: lName,
    hourlyPay: hourlyPay,
    storeID: storeID
  });
});

router.post('/updateStaff', function(req, res, next){
  var staffID = req.body.staffID
  var newStaffID = req.body.newStaffID
  var staffType = req.body.staffType
  var fName = req.body.fName
  var lName = req.body.lName
  var hourlyPay = parseFloat(req.body.hourlyPay)
  var storeID = req.body.storeID
  console.log(staffID, staffType, fName, lName, hourlyPay);
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'Dadmamme2001',
    database: 'pc_world'
  });

  var query_string = "UPDATE staff set"
  var params = []
  if(newStaffID) {
    query_string += ' staffID = (?)'
    params.push(newStaffID)
  }
  if(staffType) {
    if(newStaffID) {
      query_string +=", "
    }
    query_string += ' staffType = (?) '
    params.push(staffType)
  }
  if(fName) {
    if(newStaffID || staffType) {
      query_string +=", "
    }
    query_string += ' fName = (?) '
    params.push(fName)
  }
  if(lName) {
    if(newStaffID|| staffType || fName) {
      query_string +=", "
    }
    query_string += ' lName = (?) '
    params.push(lName)
  }
  if(hourlyPay) {
    if(newStaffID|| staffType || fName || lName) {
      query_string +=", "
    }
    query_string += ' hourlyPay = (?) '
    params.push(hourlyPay)
  }
  query_string += "WHERE staffID = (?)"
  if(!newStaffID && !staffType && !fName && !lName && !hourlyPay && !storeID ) {
    res.redirect("/staff/updateStaff?staffID=" + staffID + "&error=You must update some fields")
  }
  params.push(staffID)
  console.log("query:" +query_string+ " params: "+params);
  connection.query(query_string, params)
  res.redirect("/staff");
  });

module.exports = router;
