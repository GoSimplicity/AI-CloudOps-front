import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Title level={4}>AI CloudOps 控制台</Typography.Title>
        <Typography.Paragraph>
          欢迎使用精简后的工程。这里将展示核心监控、发布和运维功能。
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary">
          当前页面仅作为占位符，后续可在此快速接入自定义模块。
        </Typography.Paragraph>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
