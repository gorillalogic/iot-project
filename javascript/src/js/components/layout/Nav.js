import React from 'react'
import { IndexLink, Link } from 'react-router'

export default class Nav extends React.Component {
  constructor () {
    super()
    this.state = {
      collapsed: true
    }
  }

  toggleCollapse () {
    const collapsed = !this.state.collapsed
    this.setState({collapsed})
  }

  render () {
    // const { location } = this.props
    const { collapsed } = this.state
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? 'collapse' : ''

    return (
      <nav class='navbar navbar-inverse navbar-fixed-top'>
        <div class='container'>
          <div class='navbar-header'>
            <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
              <span class='sr-only'>Toggle navigation</span>
              <span class='icon-bar' />
              <span class='icon-bar' />
              <span class='icon-bar' />
            </button>
            <a class='navbar-brand' href='#'>Internet of Things</a>
          </div>
          {/*
            <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          */}
        </div>
      </nav>
    )
  }
}
