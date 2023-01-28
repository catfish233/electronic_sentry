import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, message } from "antd";

export default function Management(): JSX.Element {
  const [ipInfo, setIpInfo] = useState<any>();
  const [getMsg, setGetMsg] = useState('');

  const getIpIfon = async (ip) => {
    try {
      const res = await axios.get(`https://zj.v.api.aa1.cn/api/chinaip/?ip=${ip}`);
      if (res?.data) {
        setIpInfo(res?.data?.data);
        console.log(res.data);
      }
      setGetMsg(res?.data?.msg);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getIpIfon('113.113.1.2');
  }, [])

  return (
    <div>
      <h3>管理模式</h3>
      <br />
      <Button onClick={() => message.warning('您点击了我们的提示信息')}>点击提示</Button>
      <Link to = '/Recognition'>Recognition</Link>
      <p>{ipInfo?.Country + ipInfo?.City}</p>
      <p>{getMsg|| ''}</p>
    </div>
  );
} 