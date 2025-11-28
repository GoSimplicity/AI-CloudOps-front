import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

interface ResponseStructure<T = any> {
  success: boolean;
  data: T;
  errorMessage?: string;
}

export const errorConfig: RequestConfig = {
  errorConfig: {
    errorHandler: (error: any) => {
      if (error?.response?.data?.errorMessage) {
        message.error(error.response.data.errorMessage);
        return;
      }
      if (error?.message) {
        message.error(error.message);
      }
    },
  },
};
