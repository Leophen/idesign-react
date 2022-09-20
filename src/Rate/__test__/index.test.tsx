import { render, fireEvent } from '@testing-library/react';
import Rate from '../index';

describe('Rate 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Rate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    const { container } = render(<Rate value={3} />);
    expect(container.firstChild.firstChild.firstChild).toHaveStyle('color: rgb(245, 219, 77)');
    expect(container.firstChild.lastChild.firstChild).toHaveStyle('color: var(--i-bg-back)');
  });

  it('defaultValue', () => {
    const { container } = render(<Rate defaultValue={3} />);
    expect(container.firstChild.firstChild.firstChild).toHaveStyle('color: rgb(245, 219, 77)');
    expect(container.firstChild.lastChild.firstChild).toHaveStyle('color: var(--i-bg-back)');
  });

  it('onChange', () => {
    const changeFn = jest.fn();
    const { container } = render(<Rate onChange={changeFn} />);
    fireEvent.mouseDown(container.firstChild.firstChild);
    expect(changeFn).toHaveBeenCalled();
  });

  it('readonly', () => {
    const changeFn = jest.fn();
    const { container } = render(<Rate readonly onChange={changeFn} />);
    expect(container.firstChild).toHaveClass('i-rate__readonly');
    fireEvent.mouseDown(container.firstChild.firstChild);
    expect(changeFn).toBeCalledTimes(0);
  });

  it('allowHalf', () => {
    const { container } = render(<Rate allowHalf />);
    expect(container.querySelectorAll('.i-rate-star__first')[0]).toBeInTheDocument();
  });

  it('count', () => {
    const { container } = render(<Rate count={10} />);
    expect(container.querySelectorAll('.i-rate-star').length).toBe(10);
  });

  it('activeColor voidColor', () => {
    const { container } = render(<Rate defaultValue={3} activeColor="blue" voidColor="red" />);
    expect(container.firstChild.firstChild.firstChild).toHaveStyle('color: blue');
    expect(container.firstChild.lastChild.firstChild).toHaveStyle('color: red');
  });

  it('activeIcon voidIcon', () => {
    const { container } = render(<Rate defaultValue={3} activeIcon="BellFill" voidIcon="Bell" />);
    expect(container.firstChild.firstChild.firstChild).toHaveClass('icon-BellFill');
  });
});

