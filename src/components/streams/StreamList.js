import React, { Component } from "react";
import { connect } from "react-redux";


import { fetchStreams } from "../../actions";

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map(function(stream) {
      if(stream["first_name"].substr(0,1).toLowerCase() === 'g' || stream["last_name"].substr(0,1).toLowerCase() === 'w'){
        return (
          <div className="item" key={stream.id}>
            <img alt={stream.first_name} className="ui small" src={stream.avatar} />
            <div>ID: {stream.id}</div>
            <div>First Name: {stream.first_name}</div>
            <div>Last Name: {stream.last_name}</div>
            <div>Email: {stream.email}</div>

          </div>
        );
      }
       return [];
    });
  }

  // show "Create Stream" button if user is signed in
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div className="ui celled list">{this.renderList()}</div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.props.isSignedIn &&
        <div className="ui celled list">{this.renderList()}</div> }
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
