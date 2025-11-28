import { LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { logout } from '@/services/auth';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => ({
  action: {
    display: 'flex',
    height: '48px',
    marginLeft: 'auto',
    overflow: 'hidden',
    alignItems: 'center',
    padding: '0 8px',
    cursor: 'pointer',
    borderRadius: token.borderRadius,
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
    },
  },
}));

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  children,
}) => {
  const { styles } = useStyles();
  const { initialState } = useModel('@@initialState');

  const loginOut = async () => {
    await logout();
    const { search, pathname } = window.location;
    const searchParams = new URLSearchParams({ redirect: pathname + search });
    history.replace({
      pathname: '/user/login',
      search: searchParams.toString(),
    });
  };

  const onMenuClick: MenuProps['onClick'] = async (event) => {
    if (event.key === 'logout') {
      await loginOut();
    }
  };

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: [
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
          },
        ],
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
