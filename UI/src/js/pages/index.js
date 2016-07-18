var React = require('react');
var Navbar = require("./../components/Navbar");
var IndexPage = React.createClass({
  render(){
    return (
      <div>
        <Navbar/>
        <span>{this.props.children}</span>
      </div>
    );
  }
});

module.exports = IndexPage;
