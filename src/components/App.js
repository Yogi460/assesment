import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Header from "./Header";
import StreamList from "./streams/StreamList";

class App extends Component {


  render() {
    const { props } = this;
    const redirect = () => {

      if(props.isSignedIn) return <Redirect to="/home" />
      else if(!props.isSignedIn) return <Redirect to="/login" />;
    }

    return (
      <div className="ui container">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/home" exact component={StreamList} />
            {redirect()}
          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps)(App);
