var React = require('react');
var ReviewStars = React.createClass({
  render(){
    var rating = Math.floor(this.props.rating);
    var stars = [];
    for(var i=1;i<=10;i++){
      let z = i;
      if(i<=rating){
        stars.push(<span className="glyphicon glyphicon-star" key = {i} onClick = {(event) => {this.props.rate(z)}} style = {{"color" : "green"}}></span>);
      }
      else{
        stars.push(<span className="glyphicon glyphicon-star-empty" key = {i} onClick = {(event) => {this.props.rate(z)}}></span>);
      }
    }
    return (<span>{stars}</span>);

  }
});
module.exports = ReviewStars;
