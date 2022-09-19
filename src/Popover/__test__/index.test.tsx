import { render } from '@testing-library/react';
import Popover from '../Popover';

describe('Popover 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Popover content="提示内容">
        <button>悬浮提示</button>
      </Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

