import React from 'react';

export class Expand extends React.Component {
  state = {
    expanded: false
  };

  toggle = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  };

  render() {
    return (
      <div
        className={`expand ${
          this.state.expanded ? 'expand--large' : 'expand--small'
        }`}
      >
        <button onClick={this.toggle}>
          {this.state.expanded ? <p>Shrink Me!</p> : <p>Expand Me</p>}
        </button>
      </div>
    );
  }
}
