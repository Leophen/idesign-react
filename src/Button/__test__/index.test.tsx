import { render, fireEvent } from '@testing-library/react';
import Button from '../index';

describe('Button 组件测试', () => {
  it('children', () => {
    const { queryByText } = render(<Button>foo</Button>);
    expect(queryByText('foo')).toBeInTheDocument();
  });

  it('type', () => {
    const { container } = render(<Button type="success" />);
    expect(container.firstChild.classList.contains('i-button--type-success')).toBeTruthy();
  });

  it('variant', () => {
    const { container } = render(<Button variant="outline" />);
    expect(container.firstChild.classList.contains('i-button--variant-outline')).toBeTruthy();
  });

  it('active', () => {
    const { container } = render(<Button active />);
    expect(container.firstChild.classList.contains('i-button-active')).toBeTruthy();
  });

  it('disabled', () => {
    const clickFn = jest.fn();
    const { container } = render(<Button disabled onClick={clickFn} />);
    expect(container.firstChild).toBeDisabled();
    fireEvent.click(container.firstChild);
    expect(clickFn).toBeCalledTimes(0);
  });

  it('size', () => {
    const { container } = render(<Button size="small" />);
    expect(container.firstChild.classList.contains('i-button--size-small')).toBeTruthy();
  });

  it('shape', () => {
    const { container } = render(<Button shape="circle" />);
    expect(container.firstChild.classList.contains('i-button--shape-circle')).toBeTruthy();
  });

  it('icon', () => {
    const { asFragment } = render(<Button icon="ThePlus" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('onClick', () => {
    const clickFn = jest.fn();
    const { container } = render(<Button onClick={clickFn} />);
    fireEvent.click(container.firstChild);
    expect(clickFn).toBeCalledTimes(1);
  });
});

