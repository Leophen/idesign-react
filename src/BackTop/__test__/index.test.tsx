import { render } from '@testing-library/react';
import BackTop from '../index';

describe('BackTop 组件测试', () => {
  it('init', () => {
    const { container } = render(<BackTop />);
    expect(container.firstChild).toHaveClass('i-back-top');
  })

  it('create', () => {
    const { asFragment } = render(<BackTop />);
    expect(asFragment()).toMatchSnapshot();
  });
});

