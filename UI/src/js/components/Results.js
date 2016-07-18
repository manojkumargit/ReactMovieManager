var React = require('react');
var Results = React.createClass({
  moviedetails : function(movie,ref) {
      return(
        <div className = "row panel panel-default" key = {movie.imdbID} style = {{marginTop:"20px"}}>
          <div className = "col-sm-2">
            <img src = {movie.Poster} className = "img-thumbnail"/>
          </div>
          <div className = "col-sm-8">
            <h3>Movie Name :{movie.Title}</h3>
            <h3>Year :{movie.Year}</h3>

          </div>
          <div className = "col-sm-2">
            <button type="button" className="btn btn-warning btn-block" style = {{marginTop:"100px"}}
            data-toggle="modal" data-target="#moviedetails" value = {movie.omdbID} onClick = {(event) => ref(movie)}>
            View
            </button>
          </div>
        </div>
      );
  },
  render:function() {
    return(
      <span>
      {this.props.memory.map(
        (movie) =>{
          return this.moviedetails(movie,this.props.setter)
        }
      )}
      </span>

    );
  }
});
module.exports = Results;
