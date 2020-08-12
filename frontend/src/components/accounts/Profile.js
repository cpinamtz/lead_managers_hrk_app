import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { updateUser } from '../../actions/auth';

export class Profile extends Component {
  state = {
    username: this.props.user.username,
    email: this.props.user.email,
  };

  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();

    const { username, email } = this.state;
    const user = { username, email };

    this.props.updateUser(user);
    this.setState({
      username: "",
      email: "",
    });
  };

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    const { username, email } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Modify my profile</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-warning">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateUser })(Profile);