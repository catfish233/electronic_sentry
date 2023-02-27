import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, message } from "antd";
import Time from "../components/Time";

import styles from '../styles/Recognition.module.scss';

type UserData = [
  {
    nucleinInfo?: {
        nucleinResult?: "检测中" | "24小时" | "48小时" | "72小时" | "无数据",
        healthCode?: "green" | "red" | "yellow",
        vaccination?: "未接种" | "全程接种" | "接种一针" | "接种两针",
    },
    id?: string,
    name?: string,
    faceInfo?: string,
    verificationResult?: boolean
  }
];

export default function Recognition(): JSX.Element {
  const [userData, SetUserData] = useState<UserData>();

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
  // 获取人脸信息
  const getUserData = async () => {
    try {
      const res = await axios.get(`http://47.113.226.94:3050/`);
      if (res) {
        SetUserData(res.data)
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    initVideoSteam();
    getUserData();
  }, [])

  return (
    <div className={styles.top_container}>
      <Time />
      <div className={styles.recognition}>
        <div className={styles.recognition_container}>
          <div>实时摄像头界面</div>
          <video  className={styles.video} autoPlay></video>
        </div>
        <div className={styles.data_list}>
          <div className={styles.list_title}>检测人员名单</div>
          {/* {userData} */}
        </div>
      </div>
    </div>
  );
}