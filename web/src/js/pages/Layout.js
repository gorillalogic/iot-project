import React from 'react'
import {connect} from 'react-redux'
import Footer from '../components/layout/Footer'
import Nav from '../components/layout/Nav'

export default class Layout extends React.Component {
  render() {
    console.log('stuff', this.props)
    const {location} = this.props
    const containerStyle = {
      marginTop: '10px'
    }
    return (
      <div>
        <Nav location={location}/>
        <div class='container' style={containerStyle}>
          <div class='row'>
            <div class='col-lg-12'>
              {this.props.children}
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
}
