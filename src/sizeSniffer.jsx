import React from 'react';

import { WindowConsumer } from './WindowWatcher';

export const SizeSniffer = ({ children }) => (
  <WindowConsumer>
    {windowValues => (
      <SizeSnifferChild windowValues={windowValues}>
        {values => children(values)}
      </SizeSnifferChild>
    )}
  </WindowConsumer>
);

class SizeSnifferChild extends React.Component {
  state = {
    id: Math.floor(Math.random() * Math.floor(10000)),
    self: React.createRef()
  };

  componentDidMount() {
    this.updateSize();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateSize();
    }
  }

  updateSize = () => {
    const { height, width } = this.state.self.current.getBoundingClientRect();
    this.setState({
      width: Math.round(width),
      height: Math.round(height)
    });
  };

  render() {
    const { width, height } = this.state;

    return (
      <div className="c-size-sniffer" ref={this.state.self}>
        {this.props.children({ ...this.props.windowValues, width, height })}
      </div>
    );
  }
}
