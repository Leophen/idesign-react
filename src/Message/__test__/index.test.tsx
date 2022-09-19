import { render } from '@testing-library/react';
import Message from '../Message';

describe('Message 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Message>消息提示</Message>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('type', () => {
    const { container } = render(<Message type="success">成功提示</Message>);
    expect(container.firstChild.firstChild).toHaveClass('icon-TipCheckFill');
  });
});



