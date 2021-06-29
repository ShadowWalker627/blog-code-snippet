import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from './logo.png';
import HeaderMenu from './HeaderMenu';
import SiderMenu from './SiderMenu';

import AppContent from './AppContent';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function AppLayout() {
  return (
    <Layout>
      <HeaderMenu />
      <Layout>
        <SiderMenu />
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
