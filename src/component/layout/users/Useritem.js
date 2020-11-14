import React, { Component } from "react";

export class Useritem extends Component {
  constructor() {
    super();
    this.state = {
      id: "id",
      login: "Akash52",
      avatar_url: "https://avatars2.githubusercontent.com/u/31063892?v=4",
      html_url: "https://github.com/Akash52",
    };
  }
  render() {
    return (
      <div className="card text-center">
        <img
          src={this.state.avatar_url}
          alt=""
          className="round-img"
          style={{ width: "60px" }}
        ></img>
        <h3>{this.state.login}</h3>
        <div>
          <a href={this.state.html_url} className="btn btn-dark btn-sm my-1">
            More
          </a>
        </div>
      </div>
    );
  }
}

export default Useritem;
