import React, { Component } from 'react';
import './App.css';

import { SizeSniffer } from './sizeSniffer';
import { WindowWatcher } from './WindowWatcher';
import { Comp } from './Tester';
import { Expand } from './Expand';

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
  state = {
    page: true
  };

  toggle = () => {
    this.setState(({ page }) => ({ page: !page }));
  };
  render() {
    return (
      <WindowWatcher>
        <button onClick={this.toggle}>page toggle</button>
        {!this.state.page && (
          <div className="layout-wrapper">
            <div style={{ flexGrow: '1' }}>
              <Sniffed>{() => {}}</Sniffed>
            </div>
            <Expand />
          </div>
        )}
        {this.state.page && (
          <div className="App">
            <Sniffed>
              {props => (
                <Sniffed {...props}>
                  {props => (
                    <Sniffed {...{ ...props, watchWindow: true }}>
                      {props => <Sniffed {...props}>{() => {}}</Sniffed>}
                    </Sniffed>
                  )}
                </Sniffed>
              )}
            </Sniffed>
          </div>
        )}
      </WindowWatcher>
    );
  }
}

export default App;
