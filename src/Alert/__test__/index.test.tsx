import { render } from '@testing-library/react';
import Alert from '../index';

describe('Alert 组件测试', () => {
  const testId = 'alert-test-id';

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
});

