import { render } from '@testing-library/react';
import Upload from '../index';

describe('Upload 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Upload />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('block', () => {
    const { asFragment } = render(<Upload theme="block" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('drag', () => {
    const { asFragment } = render(<Upload theme="drag" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

