import { render, fireEvent } from '@testing-library/react';
import Button from '../index';

describe('Button 组件测试', () => {
  const renderBtn = (btn) => {
    const { container } = render(btn);
    return container.firstChild
  }

  const renderBtnHasClass = (btn, className) => {
    return expect(renderBtn(btn)).toHaveClass(className);
  }

  it('children', () => {
    const { queryByText } = render(<Button>foo</Button>);
    expect(queryByText('foo')).toBeInTheDocument();
  });

  it('type', () => {
    renderBtnHasClass(<Button type="success" />, 'i-button--type-success')
  });

  it('variant', () => {
    renderBtnHasClass(<Button variant="outline" />, 'i-button--variant-outline')
  });

  it('active', () => {
    renderBtnHasClass(<Button active />, 'i-button-active')
  });

  it('disabled', () => {
    const clickFn = jest.fn();
    const btn = renderBtn(<Button disabled onClick={clickFn} />)
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(clickFn).toBeCalledTimes(0);
  });

  it('size', () => {
    renderBtnHasClass(<Button size="small" />, 'i-button--size-small')
  });

  it('shape', () => {
    renderBtnHasClass(<Button shape="circle" />, 'i-button--shape-circle')
  });

  it('icon', () => {
    const { asFragment } = render(<Button icon="ThePlus" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('onClick', () => {
    const clickFn = jest.fn();
    fireEvent.click(renderBtn(<Button onClick={clickFn} />));
    expect(clickFn).toHaveBeenCalled();
  });
});

