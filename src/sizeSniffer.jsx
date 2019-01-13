import React from 'react';

import { WindowConsumer } from './WindowWatcher';

const timeouts = {};

const debounce = ({ id, fn, timeout = 400 }) => {
  clearTimeout(timeouts[id]);
  timeouts[id] = setTimeout(() => {
    delete timeouts[id];
    fn();
  }, timeout);
};

export class SizeSniffer extends React.Component {
  state = {
    id: Math.floor(Math.random() * Math.floor(10000)),
    height: 0,
    width: 0,
    self: React.createRef()
  };

  componentDidMount() {
    window.addEventListener('resize', this.queueScreenUpdate);
    this.updateSize();
  }

  componentWillUnmount() {
    debounce({ id: this.state.id, cancelTimer: true });
    window.removeEventListener('resize', this.queueScreenUpdate);
  }

  updateSize = () => {
    const { height, width } = this.state.self.current.getBoundingClientRect();
    this.setState({
      width: Math.round(width),
      height: Math.round(height)
    });
  };

  queueScreenUpdate = () => {
    debounce({ id: this.state.id, fn: this.updateSize });
  };

  render() {
    const { width, height } = this.state;

    return (
      <WindowConsumer>
        {windowValues => (
          <div className="c-size-sniffer" ref={this.state.self}>
            {this.props.children({ ...windowValues, width, height })}
          </div>
        )}
      </WindowConsumer>
    );
  }
}
