var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var IndexRoute = Router.IndexRoute;

var Master = require('./pages/Master/Master');
var Index = require('./pages/');
var Content = require("./components/Content");
var Home = require("./components/Home");


/*
var Master = require('./pages/Master/Master');
var Home = require('./pages/Home/Home');
var Login = require('./pages/Login/Login');
var MovieBox = require('./components/MovieBox');
var HomePage = require('./components/Home');
var ViewMovieBox = require('./components/ViewMovieBox');

var  LoginRequired  = require('./utils/RouteHelpers');


module.exports = (
<Route>
    <Route handler={Login} name="Login" path="/Login"/>
    <Route handler={LoginRequired}>
        <Route handler={Master}>
            <DefaultRoute handler={Home} name="HomePage"/>
        </Route>
        <Route handler={HomePage} name="HomePage" path="/home"/>
        <Route handler={ViewMovieBox} name="ViewMovieBox" path="/movies"/>
        <Route handler={MovieBox} name="MovieBox" path="/add"/>
    </Route>
</Route>
);
*/

module.exports = (
  <Route>
  <Route handler={Master}>
      <DefaultRoute handler={Index} name="HomePage">
      </DefaultRoute>
      <Route path = "/home" handler = {Home}/>
      <Route path = "/movies" handler = {Content}/>
  </Route>

  </Route>
);
