export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResult = {
  success: boolean;
  message?: string;
  token?: string;
};

export type CurrentUser = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
};

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const MOCK_USER = {
  username: 'admin',
  password: 'admin123',
  id: '1',
  name: 'AI CloudOps Admin',
  email: 'admin@example.com',
};

export const login = async (params: LoginParams): Promise<LoginResult> => {
  await delay(300);
  if (
    params.username === MOCK_USER.username &&
    params.password === MOCK_USER.password
  ) {
    const fakeToken = window.btoa(`${params.username}:${Date.now()}`);
    localStorage.setItem('ai-cloudops-token', fakeToken);
    return { success: true, message: '登录成功', token: fakeToken };
  }
  return { success: false, message: '账号或密码错误' };
};

export const logout = async (): Promise<void> => {
  await delay(150);
  localStorage.removeItem('ai-cloudops-token');
};

export const fetchCurrentUser = async (): Promise<CurrentUser | undefined> => {
  const token = localStorage.getItem('ai-cloudops-token');
  if (!token) {
    return undefined;
  }
  await delay(200);
  return {
    id: MOCK_USER.id,
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    avatar:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*9oaRRKmPx48AAAAAAAAAAAAADrJ8AQ/original',
  };
};
