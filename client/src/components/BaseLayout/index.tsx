import {PropsWithChildren} from 'react'
import { Layout,  Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../services/formatString';
import { routes } from '../../App';
import { Header } from '../Header';

const { Content, Footer } = Layout;


interface IBaseLayout {}


export const BaseLayout = ({children}: PropsWithChildren<IBaseLayout>) => {
  const {pathname} = useLocation();
  const pathNames = pathname.split('/');
    
    return (
    <Layout className="layout">
    <Header headerItems={routes}/>
    <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 134px)' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
          {pathNames.map((path, index) => <Breadcrumb.Item key={index}>{capitalizeFirstLetter(path)}</Breadcrumb.Item>)}
      </Breadcrumb>
      <div className="site-layout-content">{children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Footprint calculator ©2022 Created by Gabriel Eloy</Footer>
  </Layout>
  );
};



