/* eslint-disable */
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
          <SubMenu key="sbm1" title="二级菜单asdasdasdasdasdasdasdasd" onTitleClick={this.demo}>
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
            <MenuItem disabled={true} key="sbm1-m1">2级菜单子选项</MenuItem>
            <SubMenu key="sbm2" title="三级菜单asdasd">
              <MenuItem key="sbm2-m1">3级菜单子选项</MenuItem>
              <SubMenu disabled={true} key="sbm3" title="四级菜单">
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
/* eslint-enable */
