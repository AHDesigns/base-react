import React from 'react';

const breakpoints = {
  small: 420,
  medium: 740,
  large: 980,
  xLarge: 1300
};

const timeouts = {};
const windowSizes = { height: 0, width: 0 };

const debounce = ({ id, fn, timeout = 400 }) => {
  clearTimeout(timeouts[id]);
  timeouts[id] = setTimeout(() => {
    delete timeouts[id];
    fn();
  }, timeout);
};

export class SizeSniffer extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.watchWindow) {
      this.state.height = windowSizes.height;
      this.state.width = windowSizes.width;
      this.state.id = 'window';
    } else {
      this.state.id = Math.floor(Math.random() * Math.floor(10000));
    }
    this.state = {
      height: 0,
      width: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.queueScreenUpdate);
    this.updateSize();
  }

  componentWillUnmount() {
    debounce({ id: this.state.id, cancelTimer: true });
    window.removeEventListener('resize', this.queueScreenUpdate);
  }

  getSize = () => {
    const size = this.props.watchWindow
      ? { width: window.innerWidth, height: window.innerHeight }
      : this.state.self.current.getBoundingClientRect();
    return {
      width: Math.round(size.width),
      height: Math.round(size.height)
    };
  };

  updateSize = () => {
    const { height, width } = this.getSize();
    const { medium, large, xLarge } = {
      ...breakpoints,
      ...this.props.breakpoints
    };

    this.setState({
      height,
      width,
      isSmall: width < medium,
      isMedium: width >= medium && width < large,
      isLarge: width >= large && width < xLarge,
      isXLarge: width >= xLarge
    });
  };

  queueScreenUpdate() {
    debounce({ id: this.state.id, fn: this.updateSize });
  }

  render() {
    const { height, width, isSmall, isMedium, isLarge, isXLarge } = this.state;

    return (
      <div className="c-size-sniffer" ref={this.state.self}>
        {this.props.children({
          height,
          width,
          isSmall,
          isMedium,
          isLarge,
          isXLarge
        })}
      </div>
    );
  }
}
