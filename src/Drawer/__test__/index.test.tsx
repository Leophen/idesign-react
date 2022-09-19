import { render } from '@testing-library/react';
import Drawer from '../index';

describe('Drawer 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Drawer header="抽屉标题" visible={true}>
        <span>抽屉内容</span>
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

