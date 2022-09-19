import { render } from '@testing-library/react';
import Icon from '../index';

describe('Icon 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Icon name="ModeLight" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('size', () => {
    const { container } = render(<Icon name="TipCheck" size={16} />);
    expect(container.firstChild).toHaveStyle('font-size: 16px');
  })

  it('color', () => {
    const { container } = render(<Icon name="TipClose" color="#5e62ea" />);
    expect(container.firstChild).toHaveStyle('color: #5e62ea');
  })
});

