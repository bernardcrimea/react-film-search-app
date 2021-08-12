import React, { Component } from "react";
import Navbar from "../containers/Navigation/Navbar";
import { connect } from "react-redux";
import { Search } from "../pages/search";

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar isAuthenticated={this.props.isAuthenticated} />
        <Search />
        <main className="container">{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
