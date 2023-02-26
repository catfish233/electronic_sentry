import React, { useState, useEffect } from "react";

export default function UserDataItem(prop: any): JSX.Element {

  return (
    <div>
      {/* <Button onClick={() => {
        getUserData();
        message.warning(userData ? `
          检测人员：${userData.name},
          核酸信息：${userData.nucleinInfo?.nucleinResult},
          健康码：${userData.nucleinInfo?.healthCode},
          疫苗接种情况：${userData.nucleinInfo?.vaccination}
        ` : '暂无人脸信息！')
      }}>
        模拟检测到人脸
      </Button> */}
    </div>
  );
}