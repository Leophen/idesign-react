import { render, fireEvent } from '@testing-library/react';
import Switch from '../index';

describe('Switch 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Switch />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    const { container } = render(<Switch value={true} />);
    expect(container.firstChild).toHaveClass('i-switch-is-checked');
  });

  it('defaultValue', () => {
    const { container } = render(<Switch defaultValue={true} />);
    expect(container.firstChild).toHaveClass('i-switch-is-checked');
  });

  it('onChange', () => {
    const changeFn = jest.fn();
    const { container } = render(<Switch onChange={changeFn} />);
    fireEvent.click(container.firstChild);
    expect(changeFn).toHaveBeenCalled();
  });

  it('inactiveColor', () => {
    const { container } = render(<Switch inactiveColor="blue" />);
    expect(container.firstChild).toHaveStyle('background-color: blue');
  });

  it('activeColor', () => {
    const { container } = render(<Switch activeColor="red" value={true} />);
    expect(container.firstChild).toHaveStyle('background-color: red');
  });

  it('size', () => {
    const { container } = render(<Switch size="small" />);
    expect(container.firstChild).toHaveClass('i-switch--size-small');
  });

  it('inactiveLabel', () => {
    const { getByText } = render(<Switch inactiveLabel="关" />);
    expect(getByText('关')).toBeInTheDocument();
  });

  it('activeLabel', () => {
    const { getByText } = render(<Switch activeLabel="开" value={true} />);
    expect(getByText('开')).toBeInTheDocument();
  });

  it('disabled', () => {
    const { container } = render(<Switch disabled />);
    expect(container.firstChild).toHaveClass('i-switch-is-disabled');
  });
});

