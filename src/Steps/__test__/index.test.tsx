import { render } from '@testing-library/react';
import Steps from '../index';

describe('Steps 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Steps>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('current', () => {
    const { getByTestId } = render(
      <Steps current={2}>
        <Steps.Item
          title="步骤1"
          description="提示文字"
          data-testid='first-item'
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
          data-testid='second-item'
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    );
    expect(getByTestId('first-item')).toHaveClass('i-steps-item__finish');
    expect(getByTestId('second-item')).toHaveClass('i-steps-item__current');
  });

  it('dot', () => {
    const { container } = render(
      <Steps dot>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    );
    expect(container.firstChild).toHaveClass('i-steps__dot');
  });

  it('layout', () => {
    const { container } = render(
      <Steps layout="vertical">
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    );
    expect(container.firstChild).toHaveClass('i-steps__layout-vertical');
  });

  it('reverse', () => {
    const { container, getByTestId } = render(
      <Steps reverse>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
          data-testid='test-item'
        />
      </Steps>
    );
    expect(container.firstChild.firstChild).toEqual(getByTestId('test-item'));
  });
});

