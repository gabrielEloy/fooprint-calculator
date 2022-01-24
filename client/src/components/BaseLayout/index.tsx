import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Header } from '../Header';

const { Content, Footer } = Layout;

export function BaseLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 134px)' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footprint calculator ©2022 Created by Gabriel Eloy</Footer>
    </Layout>
  );
}
