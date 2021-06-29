import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Routes from '@yolo/routes';

const { Header, Content, Sider } = Layout;

function AppContent() {
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Routes />
      </Content>
    </Layout>
  );
}

export default AppContent;
