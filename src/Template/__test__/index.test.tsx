import { render } from '@testing-library/react';
import Template from '../index';

describe('Template 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Template />);
    expect(asFragment()).toMatchSnapshot();
  });
});

