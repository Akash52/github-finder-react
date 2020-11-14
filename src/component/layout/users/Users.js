import React, { Component } from "react";

export class Users extends Component {
  state = {
    users: [
      {
        id: "1",
        login: "Akash52",
        avatar_url: "https://avatars2.githubusercontent.com/u/31063892?v=4",
        html_url: "https://github.com/Akash52",
      },
      {
        id: "2",
        login: "Akash52",
        avatar_url: "https://avatars2.githubusercontent.com/u/31063892?v=4",
        html_url: "https://github.com/Akash52",
      },
      {
        id: "3",
        login: "Akash52",
        avatar_url: "https://avatars2.githubusercontent.com/u/31063892?v=4",
        html_url: "https://github.com/Akash52",
      },
    ],
  };

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
          <div key={user.id}>{user.login}</div>;
        })}
      </div>
    );
  }
}

export default Users;
