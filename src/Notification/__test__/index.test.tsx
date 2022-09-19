import { render } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Notification>消息提示</Notification>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('type', () => {
    const { container } = render(<Notification type="success">成功提示</Notification>);
    expect(container.firstChild.firstChild).toHaveClass('icon-TipCheckFill');
  });

  it('title', () => {
    const { container } = render(<Notification title="提示标题">消息提示</Notification>);
    expect(container.querySelector('.i-notification__title')).toBeInTheDocument();
  });
});



