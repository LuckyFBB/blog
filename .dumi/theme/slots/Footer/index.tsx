import { Footer } from 'dumi-theme-antd-style';
import React from 'react';

export default () => {
  return (
    <Footer
      bottom={`Copyright © 2022-${new Date().getFullYear()} Made with 🤸‍♂️ by FBB`}
      columns={[]}
    />
  );
};
