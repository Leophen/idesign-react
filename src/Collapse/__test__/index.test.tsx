import { render } from '@testing-library/react';
import Collapse from '../index';

describe('Collapse 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Collapse>
        <Collapse.Item title="折叠标题1">
          折叠内容 1
        </Collapse.Item>
        <Collapse.Item title="折叠标题2">
          折叠内容 2
        </Collapse.Item>
        <Collapse.Item title="折叠标题3">
          折叠内容 3
        </Collapse.Item>
      </Collapse>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

