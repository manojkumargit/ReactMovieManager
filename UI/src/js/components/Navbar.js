var React = require('react');
var Link = require('react-router').Link;

var Navbar = React.createClass({
    render: function() {
        return (
          <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">WebSiteName</a>
      </div>
      <ul className="nav navbar-nav">
        <li className="active"><a href="#"><Link to = "/home">Home </Link></a></li>
        <li><a href="#"><Link to = "/movies">Movies </Link></a></li>
      </ul>
    </div>
  </nav>
        )
    }
})

module.exports = Navbar;
