import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Button, message } from "antd";
import Time from "../components/Time";
import { dataURItoBlob } from "../utils/saveImg";
import styles from '../styles/Recognition.module.scss';
import UserDataTable from "../components/UserDataTable";
import { changeKeyName } from "../utils/changeKeyName";

const fs = window.require("fs");
const path = window.require('path');
const { resolve } = window.require('path')

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
  const hiddenCanvasRef = useRef<any>(null);

  const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.open({
        type: 'error',
        content: '摄像头不可用或正在被占用，请重试！'
      })
      console.error(error);
    }
  }

  // 获取截图
  const getFaceImage = () => {
    // 将当前视频帧内容渲染到canvas上，用作显示
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 800, 600, 0, 0, 200, 150); 

    // 保持图片质量，1：1绘制图片到canvas上，hiddenCanvas不显示
    const hiddenCanvas = hiddenCanvasRef.current;
    let hiddenCtx = hiddenCanvas.getContext("2d");
    hiddenCtx.drawImage(videoRef.current, 0, 0, 800, 600);

    // 转化格式
    // const imgData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    // const imgBlob = dataURItoBlob(imgData);
    // todo: 将获取的blob对象传递给python?

    // 图片数据转化为base64格式
    const base64 = hiddenCanvas.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64, 'base64');

    // 保存截图
    const phototakePath = path.join(resolve('./images'), 'phototake.png');
    fs.writeFile(phototakePath, dataBuffer, (err)=>{  
      if(err){
        console.log('拍照失败...');
      } else{
        messageApi.open({
          type: 'success',
          content: '照片成功保存到本地，路径为：' + phototakePath
        })
        console.log('照片成功保存到本地，路径为：' + phototakePath);
      }
    });
  }

  // 获取人脸信息
  const getUserData = async () => {
    try {
      // const res = await axios.get(`http://47.113.226.94:3050/`); // 线上版本
      const res = await axios.get(`http://localhost:3050/?faceInfo=5fe9c963-93d5-4e03-8309-70be1f46abff`);
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
    // getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 轮询
  useEffect(() => {
    let timer = null;
    const interval = () => {
      timer = setTimeout(() => {
        // 请求接口和实时识别（获取识别id）
        interval();
      }, 1000)
    }
    interval();
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className={styles.top_container}>
      {contextHolder}
      <div className={styles.header_container}>
        <Time />
        <div className={styles.face_img_container}>
          <canvas width="200" height="150" className={styles.face_img} ref={canvasRef}></canvas>
          <Button className={styles.face_img_button} onClick={() => getFaceImage()}>截图</Button>
        </div>
      </div>
      <div className={styles.recognition}>
        <div className={styles.recognition_container}>
          <div>实时摄像头界面</div>
          <video  className={styles.video} autoPlay ref={videoRef}></video>
        </div>
        <UserDataTable className={styles.data_table} userData={changeKeyName(userData, 'key','id')} />
      </div>
      <canvas width="800" height="600" className={styles.face_img_hidden} ref={hiddenCanvasRef}></canvas>
    </div>
  );
}