import { render } from '@testing-library/react';
import Dialog from '../index';

describe('Dialog 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Dialog header="对话框标题" visible={true}>
        <span>对话框内容</span>
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

