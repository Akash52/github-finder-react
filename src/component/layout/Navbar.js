import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar drop-shadow bg-primary ">
        <h1>
          <i className={this.props.icon} />
          {this.props.title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
