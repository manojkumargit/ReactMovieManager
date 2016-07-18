var movies = require('../modals/movieschema.js');
var app = require('express')();
app.post("/add",function(req,res) {
    var movieData = new movies(req.body);
    movieData.save(function (err,data) {
      if (err) {
        console.error(err);
        res.response(500).send("Error while saving");
      }
      res.send("saving of "+req.body.Title+" success");
    });
});
app.get("/getmovie/:movieid",function (req,res) {
    var id = req.params.movieid;
    if(id == "all"){
      movies.find({},function (err,data) {
        if (err) {
          console.error(err);
          res.response(500).send("Error while retreiveing all data");
        }
        if(!data){
          res.json({"Error":"No records found"});
        }
        else{
          res.json(data);
        }
      });
    }
    else {
      movies.find({imdbID:id},function (err,data) {
        if (err) {
          console.error(err);
          res.response(500).send("Error while retreiveing data by id");
        }
        if(!data){
          res.send("That Id doesn't exist");
        }
        else{
          res.json(data);
        }
      });
    }
});

app.put("/updatemovie/:movieid",function (req,res) {
  var id = req.params.movieid;
  movies.update({imdbID:id},req.body,{ multi: false },function (err,num) {
      if(err){
        console.error(err);
        res.response(500).send("Error while updating data");
      }
      if(!num){
        res.send("That Id doesn't exist");
      }
      else {
        res.send("successfully updated");
      }
  });

});

app.delete("/deletemovie/:movieid",function (req,res) {
  var id = req.params.movieid;
  movies.remove({imdbID:id},function (err) {
    if (err) {
      console.error(err);
      res.response(500).send("Error while retreiveing data by id");
    }
      res.json({"Results":"successfully removed "+id});
  });

});

app.post("/hi",function (req,res) {
  res.send(req.body);
});

module.exports = app;
