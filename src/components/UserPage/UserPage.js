import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {

  render() {  
    return(
      <div>
      <h2 id="welcome">
        Welcome, { this.props.store.user.username }!
      </h2>
      <p>Your ID is: {this.props.store.user.id}</p>
      <LogOutButton className="log-in" />
    </div>
    )
  }
}
// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
