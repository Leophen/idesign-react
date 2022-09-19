import { render } from '@testing-library/react';
import Dropdown from '../index';

describe('Dropdown 组件测试', () => {
  const options = [
    {
      content: '操作一',
      value: 1
    },
    {
      content: '操作二',
      value: 2
    },
    {
      content: '操作三',
      value: 3
    }
  ]
  it('create', () => {
    const { asFragment } = render(
      <Dropdown options={options}>
        <button>更多</button>
      </Dropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

