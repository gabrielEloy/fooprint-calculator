import { Layout, Menu,} from 'antd';
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../services/formatString';
import { IHeaderItem } from '../../interfaces/IHeaderItem';

const { Header:AntdHeader} = Layout;

interface IHeader {
    headerItems: IHeaderItem[];
};

export const Header = ({headerItems}: IHeader) => {
  return <AntdHeader>
  <div className="logo" />
  <Menu theme="dark" mode="horizontal">
    {headerItems.map(route => (<Menu.Item key={route.key}>
        <Link to={route.key}>{capitalizeFirstLetter(route.label)}</Link>
    </Menu.Item>))}
  </Menu>
</AntdHeader>
};
