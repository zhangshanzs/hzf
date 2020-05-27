/**
 * 找不到页面 404
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NotFount extends Component {
  render() {
    return (
      <div>
        <center>
          找不到页面
          <Link to="/home">回首页</Link>
        </center>

      </div>
    );
  }
}

export default NotFount;