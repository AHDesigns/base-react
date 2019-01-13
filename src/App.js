import React, { Component } from 'react';
import './App.css';

import { WindowWatcher, WindowConsumer } from './WindowWatcher';

const colorClass = ['blue', 'green', 'yellow'];

class Comp extends Component {
  constructor(props) {
    super(props);
    if (!props.colorIdx) {
      this.state = {
        original: true,
        colorIdx: 0
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state && this.state.original) {
      this.setState(state => ({ colorIdx: state.colorIdx + 1 }));
    }
  }

  render() {
    const { colorIdx } = this.state ? this.state : this.props;
    const { cssClassName = '', children, width, size } = this.props;
    const classes = cssClassName ? ` ${cssClassName}` : '';
    return (
      <div
        className={`box ${colorClass[colorIdx % colorClass.length]}${classes}`}
      >
        <div style={{ color: 'black' }}>
          width: {width} | size: {size}
        </div>
        {children({ colorIdx: colorIdx + 1 })}
      </div>
    );
  }
}

const Sniffed = ({ children, cssClassName, colorIdx }) => (
  <WindowConsumer>
    {props => (
      <Comp {...{ ...props, cssClassName, colorIdx }}>
        {cprops => children(cprops)}
      </Comp>
    )}
  </WindowConsumer>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <WindowWatcher>
          <Sniffed {...{ cssClassName: 'u-margin' }}>
            {props => (
              <Sniffed {...{ ...props, cssClassName: 'u-margin' }}>
                {props => (
                  <Sniffed {...{ ...props, cssClassName: 'u-margin' }}>
                    {props => (
                      <Sniffed {...{ ...props, cssClassName: 'u-margin' }}>
                        {() => <div />}
                      </Sniffed>
                    )}
                  </Sniffed>
                )}
              </Sniffed>
            )}
          </Sniffed>
        </WindowWatcher>
      </div>
    );
  }
}

export default App;
