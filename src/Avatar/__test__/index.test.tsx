import { render } from '@testing-library/react';
import Avatar from '../index';

const imageSrc = 'https://picsum.photos/180/120';

describe('Avatar 组件测试', () => {
  const renderAvatar = (avatar) => {
    const { container } = render(avatar);
    return container.firstChild;
  }

  it('image alt', () => {
    const { getByAltText } = render(<Avatar image={imageSrc} alt="test-avatar" />);
    const image = getByAltText('test-avatar');
    expect(image.src).toBe(imageSrc);
    const { asFragment } = render(<Avatar image={imageSrc} alt="test-avatar" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('children', () => {
    const { queryByText } = render(<Avatar>L</Avatar>);
    expect(queryByText('L')).toBeInTheDocument();
  });

  it('size', () => {
    expect(renderAvatar(<Avatar size={24}>L</Avatar>)).toHaveStyle('width: 24px');
  })

  it('shape', () => {
    expect(renderAvatar(<Avatar shape="round">L</Avatar>)).toHaveClass('i-avatar__shape-round');
  })

  it('color', () => {
    expect(renderAvatar(<Avatar color="#3236A4">L</Avatar>)).toHaveStyle('background: #3236A4');
  })
});

