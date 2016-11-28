import style from './style.css';

import React, { Component } from 'react';
import MenuDemo from './components/Menu/demo';


class Main extends Component {
  render() {
    return (
      <div className={style.content}>
        <div className={style.main} >
          <MenuDemo />
        </div>
      </div>
    );
  }
}

export default Main;
