/*
 * This is a demo component the Eletrode app generator included
 * to show using Milligram CSS lib and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import "../styles/raleway.css";
// import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
// import electrodePng from "../images/electrode.png";
// import DemoStates from "./demo-states";
// import DemoPureStates from "./demo-pure-states";
import Login from "./Login";
import Demo1 from "./Demo1";
// import { DemoButtons } from "./demo-buttons";
// import DemoDynamicImport from "./demo-dynamic-import";
// import { Nav } from "./nav";

//

//
//home

//

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: {value: ""},
      authenticated: {value: false},
    }
  }

  render() {
    const { dispatch, username, authenticated } = this.props;
    // const {username, authenticated} = this.state;
    return (
      <div styleName="custom.container">
        {/* <Nav {...this.props} /> */}

        {/**/}
        {/* HELLOE! */}
        {authenticated && username ? <Demo1/> : <Login/>}

        {/* <section styleName="custom.header">
          <h2>
            <span>Hello from </span>
            <a href="https://github.com/electrode-io">
              {authenticated && username ? <Demo1/> : <Login/>}
              <img src={electrodePng} />
            </a>
          </h2>
        </section> */}

    {/* <Login/> */}
    {/* {this.props.username ? <Login/> : <DemoStates/>} */}
{/* 
        <div styleName="custom.docs-section">
          <DemoStates />
        </div>

        <div styleName="custom.docs-section">
          <DemoPureStates />
        </div>

        {/**/}

        {/**/}
        {/* <div styleName="custom.docs-section">
          <h6 styleName="custom.docs-header">Demo Isomorphic UI Config</h6>
          <div>config.ui.demo: "{config.ui.demo}"</div>
        </div>


        <div styleName="custom.docs-section">
          <DemoButtons />
        </div>

        <div styleName="custom.docs-section">
          <DemoDynamicImport/>
        </div>  */}

      </div>
    );
  }
}

Home.propTypes = {username: PropTypes.string};

// const mapStateToProps = state => state;
const mapStateToProps = state => ({
  // return {
    username: state.username.value,
    authenticated: state.authenticated.value
  // }
});

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(Home);
