import React from 'react';

import { debounce } from 'utils/debounce';

const globalBreakpoints = {
  small: 420,
  medium: 740,
  large: 980,
  xLarge: 1300
};

const WindowSizeContext = React.createContext({ windowWidth: 0, height: 0 });
export const WindowConsumer = WindowSizeContext.Consumer;

export class WindowWatcher extends React.Component {
  state = { value: {} };

  componentDidMount() {
    window.addEventListener('resize', this.queueWindowCalc);
    this.getWindowSize();
    window.addEventListener('transitionend', function(e) {
      console.log('called');
      console.log(e);
    });
    window.addEventListener('animationiteration', function(e) {
      console.log('called');
      console.log(e);
    });
  }

  componentWillUnmount() {
    debounce({ cancelTimer: true });
    window.removeEventListener('resize', this.queueWindowCalc);
  }

  getWindowSize = () => {
    const { medium, large, xLarge } = {
      ...globalBreakpoints,
      ...this.props.breakpoints
    };

    const windowWidth = Math.round(window.innerWidth);
    const height = Math.round(window.innerWidth);
    const isSmall = windowWidth < medium;
    const isMedium = windowWidth >= medium && windowWidth < large;
    const isLarge = windowWidth >= large && windowWidth < xLarge;
    const isXLarge = windowWidth >= xLarge;
    const size = [
      { bool: isSmall, str: 'small' },
      { bool: isMedium, str: 'medium' },
      { bool: isLarge, str: 'large' },
      { bool: isXLarge, str: 'xlarge' }
    ].find(({ bool }) => bool).str;

    this.setState({
      value: {
        windowWidth,
        height,
        isSmall,
        isMedium,
        isLarge,
        isXLarge,
        size
      }
    });
  };

  queueWindowCalc = () => {
    debounce({ id: 'window', fn: this.getWindowSize });
  };

  render() {
    return (
      <WindowSizeContext.Provider value={this.state.value}>
        {this.props.children}
      </WindowSizeContext.Provider>
    );
  }
}
