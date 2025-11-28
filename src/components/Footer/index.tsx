import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright="AI CloudOps"
      links={[
        {
          key: 'docs',
          title: '项目文档',
          href: 'https://example.com/docs',
          blankTarget: true,
        },
        {
          key: 'status',
          title: '系统状态',
          href: 'https://example.com/status',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
