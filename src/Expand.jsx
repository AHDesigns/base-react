import React from 'react';

import { debounceWithoutId } from './debounce';

function mutationCallback(mutationsList, observer) {
  console.log('called');
  console.log(observer);
  console.log(mutationsList);
  for (var mutation of mutationsList) {
    if (mutation.type == 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type == 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
}
function resizeCallback(entries) {
  console.log('called');
  console.log(entries);
  // for (let entry of entries) {
  //   entry.target.style.borderRadius =
  //     Math.max(0, 250 - entry.contentRect.width) + 'px';
  // }
}

export class Expand extends React.Component {
  componentDidMount() {
    this.state.self.current.getBoundingClientRect();
    var config = { attributes: true, childList: true, subtree: true };

    this.state.observer.observe(this.state.self.current, config);
  }

  componentWillUnmount() {
    this.state.observer.disconnect();
  }

  state = {
    expanded: false,
    self: React.createRef(),
    // observer: new ResizeObserver(e => {
    //   resizeCallback(e);
    // })
    observer: new MutationObserver(mutationCallback)
  };

  toggle = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  };

  render() {
    return (
      <div
        ref={this.state.self}
        className={`${this.props.growStyle} ${
          this.state.expanded ? 'expand--large' : 'expand--small'
        }`}
      >
        <button className="u-fill" onClick={this.toggle}>
          {this.state.expanded ? <p>Shrink Me!</p> : <p>Expand Me</p>}
        </button>
      </div>
    );
  }
}
