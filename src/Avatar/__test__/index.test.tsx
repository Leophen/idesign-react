import { render } from '@testing-library/react';
import Avatar from '../index';

describe('Avatar 组件测试', () => {
  it('image alt', () => {
    const imageSrc = 'https://picsum.photos/180/120';
    const wrapper = render(
      <Avatar image={imageSrc} alt="test-avatar" />,
    );
    const image = wrapper.getByAltText('test-avatar');
    expect(image.src).toBe(imageSrc);
  });

  it('children', () => {
    const wrapper = render(<Avatar>L</Avatar>);
    const x = wrapper.queryByText('L');
    expect(x).toBeInTheDocument();
  });

  it('size', () => {
    const { container } = render(<Avatar size={24}>L</Avatar>);
    expect(container.firstChild).toHaveStyle('width: 24px');
  })

  it('shape', () => {
    const { container } = render(<Avatar shape="round">L</Avatar>);
    expect(container.firstChild).toHaveClass('i-avatar__shape-round');
  })

  it('color', () => {
    const { container } = render(<Avatar color="#3236A4">L</Avatar>);
    expect(container.firstChild).toHaveStyle('background: #3236A4');
  })
});

