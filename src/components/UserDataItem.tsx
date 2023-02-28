import React, { useState, useEffect } from "react";


type DataItem = {
  nucleinInfo?: {
    nucleinResult?: "检测中" | "24小时" | "48小时" | "72小时" | "无数据",
    healthCode?: "green" | "red" | "yellow",
    vaccination?: "未接种" | "全程接种" | "接种一针" | "接种两针",
  },
  id?: string,
  name?: string,
  faceInfo?: string,
  verificationResult?: boolean
};

export default function UserDataItem(prop: any): JSX.Element {
  const {nucleinInfo, name, faceInfo, verificationResult} = prop?.userDataItem;

  return (
    <div>
      <span>{name}</span>
 
    </div>
  );
}