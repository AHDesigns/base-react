import React, { Component } from 'react';

const colorClass = ['blue', 'green', 'yellow'];

export class Comp extends Component {
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
    const {
      cssClassName = '',
      children,
      width,
      windowWidth,
      size,
      watchWindow
    } = this.props;
    const classes = cssClassName ? ` ${cssClassName}` : '';
    return (
      <div className={`${colorClass[colorIdx % colorClass.length]}${classes}`}>
        {watchWindow && (
          <div style={{ color: 'red' }}>
            {' '}
            window width : {windowWidth} | size: {size}{' '}
          </div>
        )}
        {!watchWindow && (
          <div style={{ color: 'black' }}>
            {' '}
            my width: {width} | size: {size}{' '}
          </div>
        )}
        {children({ colorIdx: colorIdx + 1 })}
      </div>
    );
  }
}
