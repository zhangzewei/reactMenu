/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { noop, getKeyFromChildrenIndex } from './utils';
import './style.less';

export default class Menu extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any,
    className: PropTypes.any,
    level: PropTypes.number,
    inlineIndent: PropTypes.number,
    mode: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    onClick: noop,
    mode: 'horizontal',
    level: 1,
    inlineIndent: 16,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClick = this.onClick.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  // FIXME: 这里的这个做法有点不当，需要优化一下
  onClick(e) {
    if (e.key) {
      this.props.onClick(e);
    }
  }

  renderMenuItem(child, index) {
    const key = getKeyFromChildrenIndex(child);
    const newChildProps = {
      renderMenuItem: this.renderMenuItem,
      index,
      eventKey: key,
      onClick: this.onClick,
      mode: this.props.mode,
      level: this.props.level,
      inlineIndent: this.props.inlineIndent,
    };
    return React.cloneElement(child, newChildProps);
  }
  render() {
    const classname = `zzw-menu zzw-menu__${this.props.mode} ${this.props.className}`;
    return (
      <ul
        onClick={this.onClick}
        className={classname}
        style={this.props.style}
      >
        {React.Children.map(this.props.children, this.renderMenuItem)}
      </ul>
    );
  }
}
/* eslint-enable */
