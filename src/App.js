import React, { Component } from 'react';
import './App.css';

import { SizeSniffer } from './sizeSniffer';
import { WindowWatcher, WindowConsumer } from './WindowWatcher';
import { Comp } from './Tester';

const Sniffed = ({ children, cssClassName, colorIdx, watchWindow }) => (
  <SizeSniffer>
    {props => (
      <Comp {...{ ...props, cssClassName: 'u-padding', colorIdx, watchWindow }}>
        {cprops => children(cprops)}
      </Comp>
    )}
  </SizeSniffer>
);

class App extends Component {
  render() {
    return (
      <WindowWatcher>
        <div className="App">
          <Sniffed>
            {props => (
              <Sniffed {...props}>
                {props => (
                  <Sniffed {...{ ...props, watchWindow: true }}>
                    {props => <Sniffed {...props}>{() => <div />}</Sniffed>}
                  </Sniffed>
                )}
              </Sniffed>
            )}
          </Sniffed>
        </div>
      </WindowWatcher>
    );
  }
}

export default App;
