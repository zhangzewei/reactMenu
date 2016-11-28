## 关于Menu组建的构思
#### 示例代码
```js
import React, { Component } from 'react';
import { Menu, MenuItem, SubMenu } from '../../Menu';

import style from './style.css';

class Demo extends Component {
  demo(info) {
    console.log('info: ', info);
  }

  render() {
    return (
      <div>
        <h1>inline模式的菜单</h1>
        <Menu onClick={this.demo} className={style.menu} mode='inline' style={{ width: 240 }}>
          <MenuItem key="m1">一级菜单</MenuItem>
          <MenuItem key="m2">一级菜单</MenuItem>
          <SubMenu key="sbm1" title="二级菜单asdasdasdasdasdasdasdasd">
            <MenuItem key="sbm1-m1">2级菜单子选项</MenuItem>
            <SubMenu key="sbm2" title="三级菜单asdasd">
              <MenuItem key="sbm2-m1">3级菜单子选项</MenuItem>
              <SubMenu key="sbm3" title="四级菜单">
                <MenuItem key="sbm3-m1">4级菜单子选项</MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
        <h1>horizontal模式的菜单</h1>
        <Menu onClick={this.demo} mode='horizontal'>
          <MenuItem key="m1">一级菜单</MenuItem>
          <MenuItem key="m2">一级菜单</MenuItem>
          <SubMenu key="sbm1" title="二级菜单asdasdasdasdasdasdasdasd">
            <MenuItem key="sbm1-m1">2级菜单子选项</MenuItem>
            <SubMenu key="sbm2" title="三级菜单asdasd">
              <MenuItem key="sbm2-m1">3级菜单子选项</MenuItem>
              <SubMenu key="sbm3" title="四级菜单">
                <MenuItem key="sbm3-m1">4级菜单子选项</MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Demo;
```

#### Menu
+ 结构
```js
// 返回这样的一个东西来作为包裹
  <ul
    onClick={this.onClick}
    className={classname}
    style={this.props.style}
  >
    {React.Children.map(this.props.children, this.renderMenuItem)}
  </ul>
```

+ props

| 参数  | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| className | 根节点css样式 | obj | `ks-menu ks-menu__horizontal` |
| mode | 菜单类型，现在支持`inline` `horizontal` | string | 'inline' |
| style | 根节点样式 | obj | - |
| onClick | 点击 menuitem 调用此函数，参数为 `{item, key, keyPath}` | function | - |
| selectedKeys | 当前选中的菜单项 key 数组 | arr | todo |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | arr | todo |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 | arr | todo |

#### MenuItem
+ 结构
```js
  <li
    className={this.props.className}
    style={this.props.style}
    {...mouseEvent}
  >
    {this.props.children}
  </li>
```

+ props

| 参数  | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| className | 根节点css样式 | obj | `ks-menuitem` |
| style | 根节点样式 | obj | - |
| disabled | 是否禁用	| bool | false |
| key | item 的唯一标志(必须有且不能一样) | string | - |


#### SubMenu
+ 结构
```js
  <li
    className={props.className}
    style={this.props.style}
  >
    <div
      className='ks-submenu-title'
      onClick={(e) => this.onTitleClick(this.state.open, e)}
    >
      <span>{props.title}</span>
      <span className={classnames(rotateArrow)}>
        {this.renderArrow()}
      </span>
    </div>
    {this.renderChildren(this.state.open)}
  </li>
```

+ props

| 参数  | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| className | 根节点css样式 | obj | - |
| style | 根节点样式 | obj | - |
| disabled | 是否禁用	| bool | false |
| arrow | 右侧图标 | React.Element | - |
| key | item 的唯一标志(必须有且不能一样) | string | - |
| title | 子菜单标题 | String or React.Element | - |
| children | 子菜单的菜单项 | (MenuItem or SubMenu)[] | - |
| onTitleClick | 点击子菜单的头部函数，参数为`{key, domEvent, isOpen}` | function | - |
