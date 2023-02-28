import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import styles from "../styles/Time.module.scss";

export default function Time(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const timeRef = useRef<any>();

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    }
  }, [date])

  useEffect(() => {
    moment.locale('zh-cn');
  }, [])

  return (
    <div className={styles.time_container}>
      <div className={styles.time_title}>当前时间: </div>
      <div className={styles.oClock}>
        {moment().format('HH:mm:ss')}
      </div>
      <div className={styles.day}>
        {moment().format("LL")}
        {moment().format("dddd")}
      </div>
      
  </div>
  )
}