import { render } from '@testing-library/react';
import Pagination from '../index';

describe('Pagination 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Pagination total={100} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

