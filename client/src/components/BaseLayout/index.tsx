import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Header } from '../Header';
import BaseLayoutStyles from './BaseLayoutStyles';

const { Content, Footer } = Layout;

export function BaseLayout({ children }: PropsWithChildren<{}>) {
  return (
    <BaseLayoutStyles>
      <Layout className="layout">
        <Header />
        <Content className="content">
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer className="footer">Footprint calculator ©2022 Created by Gabriel Eloy</Footer>
      </Layout>
    </BaseLayoutStyles>
  );
}
