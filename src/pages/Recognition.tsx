import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    initVideoSteam();
  }, [])

  return (
    <div className={styles.recognition}>
      <h3>实时摄像头界面</h3>
      <video autoPlay></video>
    </div>
  );
}