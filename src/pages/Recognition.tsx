import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Button, Avatar, List, Space, Table } from "antd";
import Time from "../components/Time";
import { dataURItoBlob } from "../utils/saveImg";
import styles from '../styles/Recognition.module.scss';
import UserDataTable from "../components/UserDataTable";
import { changeKeyName } from "../utils/changeKeyName";

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
  const [userData, SetUserData] = useState<UserData>([{}]);
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  // 初始化视频流
  const initVideoSteam = async () => {
    try {
      const oVideo = videoRef.current;
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

  // 获取截图
  const getFaceImage = () => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 800, 600, 0, 0, 200, 150);

    const imgData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const imgBlob = dataURItoBlob(imgData);
    // todo: 将获取的blob对象传递给python
  }

  // 获取人脸信息
  const getUserData = async () => {
    try {
      // const res = await axios.get(`http://47.113.226.94:3050/`); // 线上版本
      const res = await axios.get(`http://localhost:3050/`);
      if (res) {
        SetUserData(res.data)
        console.log(res.data);
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
      <div className={styles.header_container}>
        <Time />
        <div className={styles.face_img}>
          <canvas id="canvas" ref={canvasRef} ></canvas>
          <Button onClick={() => getFaceImage()}>截图</Button>
          <Button onClick={() => getUserData()}>获取人脸信息</Button>
        </div>
      </div>
      <div className={styles.recognition}>
        <div className={styles.recognition_container}>
          <div>实时摄像头界面</div>
          <video  className={styles.video} autoPlay ref={videoRef}></video>
        </div>
        <UserDataTable className={styles.data_table} userData={changeKeyName(userData, 'key','id')} />
      </div>
    </div>
  );
}