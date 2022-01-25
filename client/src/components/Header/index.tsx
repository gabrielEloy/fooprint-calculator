import { Layout } from 'antd';
import HeaderStyles, { HeaderTitle } from './HeaderStyles';

const { Header: AntdHeader } = Layout;

export function Header() {
  return (
    <HeaderStyles>
      <AntdHeader className="antd-header">
        <HeaderTitle>footprint calculator</HeaderTitle>
      </AntdHeader>
    </HeaderStyles>
  );
}
