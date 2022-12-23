import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {

  componentDidMount() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: "478813816788-iuegsi33vdnsmnri204hqfjqr2inssi3.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // create auth variable
          this.auth = window.gapi.auth2.getAuthInstance();
          // update state so that component will re-render
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen for changes to authentication status
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // triggered when authentication status changes
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // manually trigger GAPI auth change
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  // helper function
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return (
    <Link to="/login" className="item">
        {this.renderAuthButton()}
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
