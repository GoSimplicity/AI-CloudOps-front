import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import React from 'react';
import { AvatarDropdown, AvatarName, Footer } from '@/components';
import { fetchCurrentUser, type CurrentUser } from '@/services/auth';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import '@ant-design/v5-patch-for-react-19';

const loginPath = '/user/login';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  fetchUserInfo: () => Promise<CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await fetchCurrentUser();
    } catch (error) {
      console.error('[initialState] 获取用户信息失败', error);
      return undefined;
    }
  };

  const currentUser = await fetchUserInfo();

  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => (
        <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      ),
    },
    footerRender: () => <Footer />,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.replace(loginPath);
      }
    },
    ...defaultSettings,
    ...(initialState?.settings ?? {}),
  };
};

export const request: RequestConfig = {
  baseURL: process.env.API_BASE_URL || '',
  ...errorConfig,
};
