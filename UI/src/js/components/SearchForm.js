var React = require('react');
var SearchForm = React.createClass({
  getInitialState : function() {
    return ({title : '',
              movieObj :[]
            });
  },
  handleTitleChange : function (e) {
    this.setState({title : e.target.value.toLowerCase()});
  },
  handleReset:function () {
    this.setState({title : ""});
  },
  submitHandler:function (e) {
    e.preventDefault();
    var title = this.state.title;
    var url = "http://www.omdbapi.com/?s="+title+"&r=json";
    console.log(url);
    $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data) {
      var stateData = this.props.update;
      var changeState = this.props.changeState
      var movieSeries = data.Search;
      stateData(movieSeries);
      changeState(2);
      this.setState({title :""});
      this.setState({movieObj:movieSeries});


    }.bind(this),
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }.bind(this)
  });
  },
  render:function() {
    return(
      <div>
        <form className="form-inline" role="form" onSubmit ={this.submitHandler}>
          <div className="form-group">
            <label >Enter Movie:</label>
            <input type="text" className="form-control" id="title" placeholder="Title"
            value={this.state.title} onChange={this.handleTitleChange}/>
          </div>
          <button type="submit" className="btn btn-info submit-btn" data-toggle="modal" data-target="#myModal">Search</button>
          <button type="reset" className="btn btn-danger" onClick = {this.handleReset}>Reset</button>
        </form>
      </div>
      )
    }
});

module.exports = SearchForm;
