import React, { Component } from "react";
import Layout from "./hoc/layout";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { TopRatedList } from "./pages/topRated";
import { Favorite } from "./pages/favorites";
import { GlobalProvider } from "./context/globalState";
import { Single } from "./pages/single";
import Auth from "./containers/Auth/Auth";
import "./App.css";
import Logout from "./pages/logout";
import { autoLogin } from "./store/actions/auth";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/top" component={TopRatedList} />
        <Route path="/login" component={Auth} />
        <Redirect to={"/"} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/top" component={TopRatedList} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/single" component={Single} />
          <Route path="/logout" component={Logout} />
          <Redirect to={"/"} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <GlobalProvider>
          <Layout>{routes}</Layout>
        </GlobalProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
