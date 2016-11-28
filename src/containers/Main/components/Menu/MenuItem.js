/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { noop } from './utils';
import './style.less';

export default class MenuItem extends Component {
  static propTypes = {
    level: PropTypes.number,
    inlineIndent: PropTypes.number,
    eventKey: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.any,
    className: PropTypes.any,
    style: PropTypes.object,
  };

  static defaultProps = {
    disabled: false,
    onClick: noop,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const props = this.props;
    const eventKey = props.eventKey;
    const info = {
      key: eventKey,
      item: this,
      domEvent: e,
    };
    props.onClick(info);
  }

  render() {
    const props = this.props;
    let mouseEvent = {};
    const menuClassNames = {
      ['ks-menuitem']: true,
      ['ks-disabled']: props.disabled,
    };
    const style = {
      ...props.style,
    };
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
      };
    }
    style.paddingLeft = props.inlineIndent * props.level;
    return (
      <li
        className={classnames(menuClassNames, this.props.className)}
        style={style}
        {...mouseEvent}
      >
        {this.props.children}
      </li>
    );
  }
}
/* eslint-enable */
