import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <div>
        <h1>Hello Cosmic Tornado</h1>
        <h4>Hello</h4>
        <a href='/auth'>Log in with Fitbit</a>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(App)