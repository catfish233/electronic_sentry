import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, message } from "antd";

export default function Management(): JSX.Element {

  return (
    <div>
      <h3>管理模式</h3>
      <br />
      <Button onClick={() => message.warning('您点击了我们的提示信息')}>点击提示</Button>
      <Link to = '/Recognition'>Recognition</Link>
    </div>
  );
} 