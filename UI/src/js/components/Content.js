var React = require('react');
var SearchForm = require('./SearchForm');
var Results = require('./Results');
var ReviewStars = require('./ReviewStars');
var Navbar = require('./Navbar');
var Content = React.createClass({
    getInitialState : function() {
      return({
        dbData:[],
        temData:[],
        resultState:"initial",
        id:1,
        tmpmovie :{}
      });
    },
    changeState : function(newId) {
        this.setState({id:newId});
    },
    setId : function (movie) {
      if(movie["imdbRating"] === undefined){
        var url = "http://www.omdbapi.com/?i="+movie.imdbID+"&plot=full&r=json";
        console.log(url);
        $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({tmpmovie:data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
      });
    }
    else{
      this.setState({tmpmovie:movie});
    }
    },
    addTemData : function (movies) {
      this.setState({temData:movies});
    },
    saveToDB : function () {
      var movie = this.state.tmpmovie;
      var db = this.state.dbData;
      var movieID = movie.imdbID;
      var i = db.forEach((movie,ind) =>{
        if(movie.imdbID == movieID)
          return ind;
      } );
      console.log("-----"+i);
      if(i== undefined){
        db.push(movie);
        this.setState({dbData:db});
        $.post("movies/add",movie);
      }

      this.setState({id:1});
    },
    removeFromDB : function () {
      var db = this.state.dbData;
      var id = this.state.tmpmovie.imdbID;
      var i ;
      db.forEach((movie,ind) =>{
        if(movie.imdbID == id){
          i = ind;
        }
      } );
      db.splice(i,1);
      this.setState({dbData:db});
      this.setState({id:1});
      var url = "movies/deletemovie/"+id;
      console.log("yo---->"+url);
      $.ajax({
          url: url,
          type: 'DELETE',
        });
    },
    changeRating : function (rating) {
      console.log(rating);
      var data = this.state.tmpmovie;
      data["imdbRating"] = rating;
      this.setState({tmpmovie:data});
    },
    updateRating : function () {
        var rating = this.state.tmpmovie.imdbRating;
        var url = "movies/updatemovie/"+this.state.tmpmovie.imdbID;
        $.ajax({
            url: url,
            type: 'PUT',
            data:{"imdbRating":rating}
          });

    },
    componentDidMount :function() {
      var url = "movies/getmovie/all";
      console.log(url);
      $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({dbData:data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
    render : function () {
      var appState = this.state.id;
      var data = [];
      var btnType;
      var btnText;
      var btnDisble;
      var resultTitle;
      console.log("now At----"+appState);
      if(appState == 1){
        btnDisble = "inline";
        data = this.state.dbData;
        btnType = this.removeFromDB;
        btnText = "Remove From Database";
        resultTitle = "My Movies";
      }
      else{
        btnDisble = "none";
        data = this.state.temData;
        btnType = this.saveToDB;
        btnText = "Add To Database";
        resultTitle = "Search Results";
      }
      return(
        <div className = "container">
          <Navbar/>
          <SearchForm update ={this.addTemData} changeState = {this.changeState}/>
          <h2>{resultTitle}</h2>
          <div className = "container">
            <Results memory = {data} setter = {this.setId}/>
          </div>
          <div id="moviedetails" className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Modal Header</h4>
              </div>
              <div className="modal-body">
                  <div className = "row">
                    <div className = "col-sm-4">
                      <img src = {this.state.tmpmovie.Poster} className = "img-thumbnail"/>
                    </div>
                    <div className = "col-sm-8">
                    <h3>Movie Name :{this.state.tmpmovie.Title}</h3>
                    <h4>Year :{this.state.tmpmovie.Year}</h4>
                    <p>
                      Actors : {this.state.tmpmovie.Actors}
                    </p>
                    <p>
                      Director : {this.state.tmpmovie.Director}
                    </p>

                    <p>
                       {this.state.tmpmovie.Plot}
                    </p>
                    <p>
                    <span className="glyphicon glyphicon-calendar"></span> {this.state.tmpmovie.Released}
                    <strong>| Awards :</strong>
                     {this.state.tmpmovie.Awards}
                    </p>
                    <h4>
                    <strong>Rating :</strong>
                    <ReviewStars rating ={this.state.tmpmovie.imdbRating} rate = {this.changeRating}/>
                    </h4>

                    <br/>
                    <p>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {btnType}><span className="glyphicon glyphicon-save"></span> <span>{btnText}</span></button>
                      <button type="button" className="btn btn-warning" data-dismiss="modal" onClick = {this.updateRating} style = {{"display":btnDisble,"marginLeft":"20px"}}><span className="glyphicon glyphicon-thumbs-up"></span> <span>Save Changes</span></button>
                    </p>
                    </div>
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
module.exports = Content;
