import { render } from '@testing-library/react';
import Image from '../index';

describe('Image 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Image src="https://picsum.photos/180/120" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('width', () => {
    const { container } = render(<Image width={260} src="https://picsum.photos/180/120" />);
    expect(container.firstChild).toHaveStyle('width: 260px');
  })
});

