import { render } from '@testing-library/react';
import Loading from '../index';

describe('Loading 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('info', () => {
    const wrapper = render(<Loading info="加载中" />);
    expect(wrapper.queryByText('加载中')).toBeInTheDocument();
  })

  it('icon', () => {
    const { container } = render(<Loading icon="RefreshRight" />);
    expect(container.querySelector('.icon-RefreshRight')).toBeInTheDocument();
  })

  it('size', () => {
    const { container } = render(<Loading size={16} />);
    expect(container.querySelector('.i-icon')).toHaveStyle('font-size: 16px');
  })

  it('color', () => {
    const { container } = render(<Loading color='#4F73D9' />);
    expect(container.querySelector('.i-icon')).toHaveStyle('color: #4F73D9');
  })

  it('spinner', () => {
    const wrapper = render(<Loading spinner='🌞' />);
    expect(wrapper.queryByText('🌞')).toBeInTheDocument();
  })
});

