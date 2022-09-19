import { render } from '@testing-library/react';
import Empty from '../index';

describe('Empty 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Empty>暂无数据</Empty>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('size', () => {
    const { container } = render(<Empty size="small">暂无数据</Empty>);
    expect(container.firstChild).toHaveClass('i-empty--size-small');
  })
});

