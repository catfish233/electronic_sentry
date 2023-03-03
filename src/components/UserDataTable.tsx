import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';

type DataType = {
  nucleinInfo?: {
    nucleinResult?: "检测中" | "24小时" | "48小时" | "72小时" | "无数据",
    healthCode?: "green" | "red" | "yellow",
    vaccination?: "未接种" | "全程接种" | "接种一针" | "接种两针",
  },
  key?: string,
  name?: string,
  faceInfo?: string,
  verificationResult?: boolean
};

enum colorEnums {
  "检测中" = "gray",
  "24小时" = "springgreen",
  "48小时" = "mediumspringgreen",
  "72小时" = "cornflowerblue",
  "无数据" = "dimgray",

  "未接种" = "darkcyan",
  "全程接种" = "deepskyblue",
  "接种一针" = "lightskyblue",
  "接种两针" = "turquoise",
}

export default function UserDataTable(prop: any): JSX.Element {
  const data: DataType[] = prop?.userData;
  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Space size="middle">{text}</Space>,
    },
    {
      title: '核酸信息',
      key: 'nucleinInfo',
      dataIndex: 'nucleinInfo',
      render: (_, { nucleinInfo }) => (
        <>
          <Tag color={nucleinInfo?.healthCode}>
            {nucleinInfo?.healthCode}
          </Tag>
          <Tag color={colorEnums[nucleinInfo?.nucleinResult]}>
            {nucleinInfo?.nucleinResult}
          </Tag>
          <Tag color={colorEnums[nucleinInfo?.vaccination]}>
            {nucleinInfo?.vaccination}
          </Tag>
        </>
      ),
    },
    {
      title: '检测结果',
      dataIndex: 'verificationResult',
      key: 'verificationResult',
      render: (_, result) => (
        <Tag color={result ? 'green' : 'red'}>
          {result ? '允许通行' : '禁止通行'}
        </Tag>
      )
    },
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
}