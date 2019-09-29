import React, { Component } from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Swal from 'sweetalert2';

class RegisterBusinessPage extends Component {
  state = {
    username: '',
    password: '',
    businessName: '',
    email: '',
    phoneNumber: '',
    address: '',
  };

  registerUser = (event) => {
    event.preventDefault();
    
    if (this.state.username === '' || this.state.password === '' || this.state.businessName === ''
      || this.state.email === '' || this.state.phoneNumber === '' || this.state.address === '') {
        return (Swal.fire(
          'Error',
          'You Must Enter All Fields',
          'error'
        ))  
    }

    Swal.fire(
      'Success!',
      'Your can now add your deals!',
      'success'
    )

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          businessName: this.state.businessName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register Business</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="businessName">
              Official Name of Establishment:
              <input
                type="text"
                name="businessName"
                value={this.state.businessName}
                onChange={this.handleInputChangeFor('businessName')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email Address:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="phoneNumber">
              Business Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChangeFor('phoneNumber')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              Business Address:
              <input
                type="text"
                name="address"
                placeholder="enter street, city, state"
                value={this.state.address}
                onChange={this.handleInputChangeFor('address')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        {/* <center> */}
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        {/* </center> */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterBusinessPage);

