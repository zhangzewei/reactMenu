/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { noop, getKeyFromChildrenIndex } from './utils';
import classnames from 'classnames';
import './style.less';

export default class SubMenu extends Component {
  static propTypes = {
    eventKey: PropTypes.string,
    mode: PropTypes.string,
    level: PropTypes.number,
    disabled: PropTypes.bool,
    inlineIndent: PropTypes.number,
    renderMenuItem: PropTypes.func,
    onItemHover: PropTypes.func,
    disOnItemHover: PropTypes.func,
    onTitleClick: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.any,
    children: PropTypes.any,
    arrow: PropTypes.node,
    title: PropTypes.node,
    style: PropTypes.object,
  };

  static defaultProps = {
    onClick: noop,
    onTitleClick: noop,
    disabled: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
    this.onTitleClick = this.onTitleClick.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.onSubMenuClick = this.onSubMenuClick.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.renderArrow = this.renderArrow.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onTitleClick(e) {
    if (this.props.mode === 'inline') {
      this.setState({
        open: !this.state.open,
      });
    }
    const info = {
      key: this.props.eventKey,
      domEvent: e,
      isOpen: !this.state.open,
    };
    this.props.onTitleClick(this.addKeyPath(info));
  }

  onSubMenuClick(info) {
    this.props.onClick(this.addKeyPath(info));
  }

  onMouseEnter() {
    if (this.props.mode === 'inline') {
      return;
    }
    this.setState({
      open: true,
    });
  }

  onMouseLeave() {
    if (this.props.mode === 'inline') {
      return;
    }
    this.setState({
      open: false,
    });
  }

  addKeyPath(info) {
    return {
      ...info,
      keyPath: (info.keyPath || []).concat(this.props.eventKey),
    };
  }

  renderMenuItem(child, index) {
    const key = getKeyFromChildrenIndex(child);
    const newChildProps = {
      renderMenuItem: this.renderMenuItem,
      index,
      eventKey: key,
      onClick: this.onSubMenuClick,
      mode: this.props.mode,
      level: this.props.level + 1,
      inlineIndent: this.props.inlineIndent,
    };
    return React.cloneElement(child, newChildProps);
  }

  renderChildren(open) {
    let children;
    const baseProps = {
      onClick: this.onSubMenuClick,
    };
    if (open) {
      children = React.Children.map(this.props.children, this.renderMenuItem);
    } else {
      children = '';
    }
    return (
      <ul
        className="zzw-submenu zzw-menu"
        {...baseProps}
      >
        {children}
      </ul>
    );
  }

  renderArrow() {
    const arrow = !this.props.arrow ?
      <span className="zzw-arrow"></span> : this.props.arrow;
    return arrow;
  }

  render() {
    const props = this.props;
    const rotateArrow = {
      ['zzw-arrow__warp']: true,
      ['rotate']: this.state.open,
    };
    const titleClassNames = {
      ['zzw-submenu-title']: true,
      ['zzw-disabled']: props.disabled,
    };
    const style = {
      ...props.style,
    };
    let mouseEvents = {};
    let titleMouseEvents = {};
    if (!props.disabled) {
      mouseEvents = {
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter,
      };
      // only worzzw in title, not outer li
      titleMouseEvents = {
        onMouseEnter: this.onTitleMouseEnter,
        onMouseLeave: this.onTitleMouseLeave,
        onClick: this.onTitleClick,
      };
    }
    style.paddingLeft = props.inlineIndent * props.level;
    return (
      <li
        className={`zzw-submenu ${props.className}`}
        {...mouseEvents}
      >
        <div
          className={classnames(titleClassNames, this.props.className)}
          {...titleMouseEvents}
          style={style}
        >
          <span>{props.title}</span>
          <span className={classnames(rotateArrow)}>
            {this.renderArrow()}
          </span>
        </div>
        {this.renderChildren(this.state.open)}
      </li>
    );
  }
}
/* eslint-enable */
