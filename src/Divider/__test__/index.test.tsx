import { render } from '@testing-library/react';
import Divider from '../index';

describe('Divider 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Divider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass('i-divider');
  });

  it('dashed', () => {
    const { container } = render(<Divider dashed />);
    expect(container.firstChild).toHaveClass('i-divider--dashed');
  });

  it('align', () => {
    const { container, getByText } = render(<Divider align="left">iDesign</Divider>);
    expect(container.firstChild).toHaveClass('i-divider--with-text-left');
    expect(getByText('iDesign').textContent).toBe('iDesign')
  });
});

