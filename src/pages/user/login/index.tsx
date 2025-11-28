import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { App, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { Footer } from '@/components';
import { login, type LoginParams } from '@/services/auth';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: token.colorBgLayout,
    padding: '32px 16px',
  },
  content: {
    width: '100%',
    maxWidth: 380,
  },
}));

const Login: React.FC = () => {
  const { styles } = useStyles();
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: LoginParams) => {
    try {
      setSubmitting(true);
      const result = await login(values);
      if (result.success) {
        message.success(result.message ?? '登录成功');
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo && setInitialState) {
          const fallbackFetch =
            initialState?.fetchUserInfo ?? (async () => undefined);
          setInitialState((s) => ({
            ...s,
            currentUser: userInfo,
            fetchUserInfo: s?.fetchUserInfo ?? fallbackFetch,
          }));
        }
        const redirect = new URL(window.location.href).searchParams.get('redirect');
        history.replace(redirect || '/dashboard');
        return;
      }
      message.error(result.message ?? '账号或密码错误');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="AI CloudOps" src="/logo.svg" />}
          title={Settings.title || 'AI CloudOps'}
          subTitle="AI-CloudOps 统一运维平台"
          submitter={{ searchConfig: { submitText: '登录' }, submitButtonProps: { loading: submitting } }}
          onFinish={async (values) => {
            await handleSubmit(values as LoginParams);
          }}
        >
          <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
            使用分配的账号登录系统，后续可在设置中心绑定企业认证方式。
          </Typography.Paragraph>
          <ProFormText
            name="username"
            fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
            placeholder="请输入账号"
            rules={[{ required: true, message: '账号不能为空' }]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
            placeholder="请输入密码"
            rules={[{ required: true, message: '密码不能为空' }]}
          />
          <ProFormCheckbox noStyle name="autoLogin" initialValue>
            自动登录
          </ProFormCheckbox>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
