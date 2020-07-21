import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

// import { Nav } from "./nav";
import { inputName, inputTextarea, selectOption, updateHasScatter, setUser, updateAuthenticated, updateEosAccount } from "./actions";
// import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
// import demoStyle from "../styles/demo1.css"; // eslint-disable-line no-unused-vars
import ApiService from './services/ApiService';
// import ScatterService from '../services/Scatter';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';

ScatterJS.plugins(new ScatterEOS())

// const networkJson = {
//   blockchain:'eos',
//   host:'localhost',
//   port:8888,
//   protocol:'http',
//   chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
// };

const networkJson = {
  blockchain:'eos',
  // host:'api1.eosasia.one',
  host:'nodes.get-scatter.com',
  port:443,
  protocol:'https',
  chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
};
const CONTRACT_NAME = 'myeosacldapp'

// // Don't forget to tell ScatterJS which plugins you are using.
// ScatterJS.plugins( new ScatterEOS() );

// const scatter = ScatterJS.scatter.connect("eosacl").then(connected => {
//     // User does not have Scatter Desktop, Mobile or Classic installed.
//     if(!connected) return false;

//     const scatter = ScatterJS.scatter;
//     // -----------------------
//     // TODO store in state because this has overhead.
//     // -----------------------

//     window.ScatterJS = null;
//     // -----------------------
//     // ALWAYS DO THIS
//     // -----------------------

//     return scatter;
// });

// const network = ScatterJS.Network.fromJson(networkJson);
// ScatterJS.scatter.connect('eosacl', {network}).then(connected => {
//   // User does not have Scatter Desktop, Mobile or Classic installed.
//   debugger;
//   if(!connected) {
//       alert(`no scatter!`);
//       return false;
//   }
//   return ScatterJS.login().then(id => {
//       debugger;
//       if (!id) {
//           alert('no id!')
//           return false;
//       }

//       dispatch(updateAuthenticated(true));
//       // dispatch(inputName(ScatterJS.identity.name));
//       debugger;
//       dispatch(inputName(ScatterJS.identity.accounts[0].name));
//   })

// })

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: { value: "" },
      eosAccount: { value: {} },
      authenticated: { value: false },
      hasScatter: { value: 1 },
      passwordVal: { value: "" },
      textarea: { value: "" },
      selectedOption: { value: "0-13" }
    };
//   }
    this.loadUser = this.loadUser.bind(this);
    this.login = this.login.bind(this);
    // Call `loadUser` before mounting the app
    // this.loadUser();
  }

  // Get latest user object from blockchain
  loadUser(event) {
    event.preventDefault();
    // Extract `setUser` of `UserAction` and `user.name` of UserReducer from redux
    // const { setUser, username } = this.props;
    const { dispatch } = this.props;
    const { username } = this.props;
    debugger;
    // Send request the blockchain by calling the ApiService,
    // Get the user object and store the `win_count`, `lost_count` and `game_data` object
    return ApiService.getUserByName(username).then(user => {
      debugger;
    //   dispatch(inputName(user.username));
    //   dispatch(adminLockIds(user.lock_ids));
    //   dispatch(userLockIds(user.access_only_lock_ids));
      dispatch(setUser({
        lock_ids: user.lock_ids,
        access_only_lock_ids: user.access_only_lock_ids,
      }));
    });

}

  login(event) {
    event.preventDefault();
    // debugger;
    // const account = ScatterService.scatterConnect();

    const { dispatch, username } = this.props;
    dispatch(updateHasScatter(-1))
    const network = ScatterJS.Network.fromJson(networkJson);
    
    return ScatterJS.scatter.connect(CONTRACT_NAME, {network}).then(connected => {
    // return ScatterJS.scatter.connect('eosacl', {network}).then(connected => {
        // User does not have Scatter Desktop, Mobile or Classic installed.
        debugger;
        if(!connected) {
            // alert(`No scatter wallet detected.`);
            dispatch(updateHasScatter(0))
            return false;
        }
        return ScatterJS.login().then(id => {
            debugger;
            if (!id) {
                alert('no id!')
                dispatch(updateHasScatter(0))
                return false;
            }

            dispatch(updateHasScatter(1))
            dispatch(updateAuthenticated(true));
            // dispatch(inputName(ScatterJS.identity.name));
            debugger;
            dispatch(inputName(ScatterJS.identity.accounts[0].name));
            const eosScatterAccount = ScatterJS.account('eos');
            dispatch(updateEosAccount(eosScatterAccount));
        })

     })


    // return ScatterService.getScatter().login().then(id => {
    //         debugger;
    //         if (!id) {
    //             alert('no id!')
    //             return false;
    //         }

    //         dispatch(updateAuthenticated(true));
    //         // dispatch(inputName(ScatterJS.identity.name));
    //         debugger;
    //         dispatch(inputName(ScatterJS.identity.accounts[0].name));
    //     })

  }

  render() {
    const { dispatch, username, authenticated, hasScatter } = this.props;
    return (
      <div class="parent">
        {/* <Nav {...this.props} /> */}
        <div styleName="demoStyle.container">
          <h2>Authenticate With Scatter Wallet</h2>
          {/* {username ? `${username} is currently logged in`: <label htmlFor="nameField">Name</label>} */}
          {/* {username ? `${username} is currently logged in`: <label></label>} */}
          {authenticated ? `${username} is authenticated`: <label></label>}
          {/* <form onSubmit={this.login}> */}
          <form>
            <fieldset>
              {/* <label htmlFor="nameField">Name</label>
              <input
                type="text"
                placeholder="Electrode User"
                id="nameField"
                value={this.props.username}
                onChange={event => {
                  dispatch(updateAuthenticated(false))
                  dispatch(inputName(event.target.value));
                }}
              />
              <label htmlFor="ageRangeField">Password</label>
              <input
                type="password"
                id="passwordField"
                value={this.props.passwordVal}
                onChange={e => {
                  dispatch(passwordName(e.target.value));
                }}
              /> */}
              {/* <input type="submit" value="Authenticate" onClick={this.login}/> */}
                <Button type="submit" onClick={this.login} variant="outline-primary">Authenticate</Button>
              {/* <input type="submit" value="Send"/> */}
              {/* <label>One must have a scatter wallet to use EOS ACL.</label> */}
              {/* <br/> */}
              {
                hasScatter == -1 ? 
                  <Spinner style={{"absolute-top": '10px'}} animation="border" />
                : hasScatter == 0 ?
                   <Alert style={{"margin-top": '10px', 'margin-right': '10px'}} variant="danger">
                    No Scatter wallet detected. One must have a scatter wallet to use EOS ACL.
                  </Alert>
                  : ''
              }

              <div>
                This is the web interface for a decentralized Access Control List (ACL) application on the EOS blockchain.
                <br></br>
                <br></br>
                <i>What does it solve?</i> There is no central service or data store with all of your access credentials and access history.
                <br></br>
                <i>Who would use this?</i> Individuals or organizations that are sensitive to the security concerns of giving authoritative control to an ACL service provider.
                <br></br>
                <i>Why do I need a Scatter wallet?</i> It keeps your EOS account keys secure while handling signing transactions (access shares, revokes, logs, etc).
                <br></br>
                <i>Where is the access list stored?</i> Publicly in the EOS myeosacldapp smart contract. Access logs are stored publicly as transactions on chain.
                <br></br>
                <i>I don't trust the smart contract. Can I view and deploy the source code as my own dapp?</i> Yes, the source code can be found <a href='https://github.com/rsmets/eosacl-smartcontract'>here</a>.
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string,
  authenticated: PropTypes.bool,
  eosAccount: PropTypes.object,
  textarea: PropTypes.string,
  selectedOption: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    username: state.username.value,
    eosAccount: state.eosAccount.value,
    authenticated: state.authenticated.value,
    hasScatter: state.hasScatter.value,
    textarea: state.textarea.value,
    selectedOption: state.selectedOption.value
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(Login);
