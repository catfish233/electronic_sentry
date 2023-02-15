import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, message } from "antd";

import styles from '../styles/Recognition.module.scss';

export default function Recognition(): JSX.Element {
  const initVideoSteam = async () => {
    try {
      const oVideo = document.querySelector('video');
      const initSteam = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 800,
          height: 600
        }
      });
      if (initSteam && oVideo){
        oVideo.srcObject = initSteam;
        return;
      }
    } catch (error) {
      alert('摄像头不可用或正在被占用，请重试！');
      console.error(error);
    }
  }

  const getUserData = async () => {
    try {
      const res = await axios.get(`http://47.113.226.94:3050/`);
      if (res) {
        console.log(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    initVideoSteam();
  }, [])



  return (
    <div className={styles.recognition}>
      <div>
        <h3>实时摄像头界面</h3>
        <video autoPlay></video>
      </div>
      <div>
        <h3>识别信息</h3>
        <ul>
          <li>张三</li>
        </ul>
      </div>

      <Button onClick={() => {
        getUserData();
        message.warning('您点击了我们的提示信息')
      }}>点击模拟检测到人脸</Button>
    </div>
  );
}