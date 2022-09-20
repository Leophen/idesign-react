import { render, fireEvent } from '@testing-library/react';
import Tag from '../index';

describe('Tag 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Tag>标签</Tag>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('type', () => {
    const { container } = render(<Tag type="success">标签</Tag>);
    expect(container.firstChild).toHaveClass('i-tag--type-success');
  });

  it('theme', () => {
    const { container } = render(<Tag theme="dark">标签</Tag>);
    expect(container.firstChild).toHaveClass('i-tag--theme-dark');
  });

  it('icon', () => {
    const { container } = render(<Tag icon="TagPrice">标签</Tag>);
    expect(container.firstChild.firstChild).toHaveClass('icon-TagPrice');
  });

  it('onAdd', () => {
    const clickFn = jest.fn();
    const { container } = render(<Tag onAdd={clickFn}>标签</Tag>);
    expect(container.firstChild.firstChild).toHaveClass('icon-ThePlus');
    fireEvent.click(container.firstChild);
    expect(clickFn).toHaveBeenCalled();
  });

  it('onClose', () => {
    const clickFn = jest.fn();
    const { container } = render(<Tag onClose={clickFn}>标签</Tag>);
    expect(container.firstChild.lastChild).toHaveClass('i-tag--close-btn');
    fireEvent.click(container.firstChild.lastChild);
    expect(clickFn).toHaveBeenCalled();
  });

  it('size', () => {
    const { container } = render(<Tag size="small">标签</Tag>);
    expect(container.firstChild).toHaveClass('i-tag--size-small');
  });

  it('maxWidth', () => {
    const { container } = render(<Tag maxWidth={100}>标签</Tag>);
    expect(container.firstChild).toHaveStyle('max-width: 100px');
  });
});

