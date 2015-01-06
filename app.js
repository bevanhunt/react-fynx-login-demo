'use strict';
var api = require('./lib/api'),
  userStore = require('./lib/stores/user'),
  React = require('react'),
  Login = require('./lib/view_components/login_form'),
  listeners = require('./lib/listeners'),
  LoggedIn = require('./lib/view_components/logged_in'),
  Page = require('./lib/view_components/page'),
  Router = require('react-router'),
  { Route, RouteHandler, DefaultRoute } = Router;

// if a browser has a username and token then validate them
// if they are valid then save them to the userStore 
if (localStorage.getItem('username') && localStorage.getItem('token')) {
  api.token(localStorage.getItem('username'), localStorage.getItem('token'))
    .then((userData) => userStore(userData));
}

// register Fynx action listeners
listeners.register();

// create routes for components
var routes = (
  <Route handler={Page} path="/">
    <Route name="login" handler={Login} path="login" />   
    <Route name="success" handler={LoggedIn} path="success" />
    <DefaultRoute handler={Login} />
  </Route>
);

// don't use html5 routes as gulp connect doesn't like it
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});