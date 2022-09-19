import { render, fireEvent } from '@testing-library/react';
import Alert from '../index';

describe('Alert 组件测试', () => {
  it('type', () => {
    const props = {
      message: 'Alert 内容',
    };
    const { asFragment } = render(<Alert {...props} type="info" />);
    expect(asFragment()).toMatchSnapshot();

    const { asFragment: asFragment2 } = render(<Alert {...props} type="success" />);
    expect(asFragment2()).toMatchSnapshot();

    const { asFragment: asFragment3 } = render(<Alert {...props} type="warning" />);
    expect(asFragment3()).toMatchSnapshot();

    const { asFragment: asFragment4 } = render(<Alert {...props} type="error" />);
    expect(asFragment4()).toMatchSnapshot();
  });

  it('closable', () => {
    const { container } = render(<Alert message="这是一条消息提示" closable />);
    fireEvent.click(container.querySelector('.i-alert--close-btn'));
    expect(container.firstChild).not.toBeInTheDocument();
  })

  it('operation', () => {
    const operation = <span>相关操作</span>;
    const { queryByText } = render(<Alert message="这是一条消息提示" operation={operation} />);
    expect(queryByText('相关操作')).toBeInTheDocument();
  })

  it('title', () => {
    const { container } = render(<Alert title="消息提示标题" message="这是一条消息提示" />);
    expect(container.querySelector('.i-alert--title')).toBeInTheDocument();
  })
});

