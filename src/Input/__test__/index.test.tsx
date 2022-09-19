import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../index';

describe('Input 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Input />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('placeholder onChange', () => {
    const changeFn = jest.fn();
    const { queryByPlaceholderText } = render(<Input placeholder='请输入内容' onChange={changeFn} />);
    expect(queryByPlaceholderText('请输入内容')).toBeInTheDocument();
    fireEvent.change(queryByPlaceholderText('请输入内容'), { target: { value: 'iDesign' } });
    expect(changeFn).toBeCalledTimes(1);
    expect(changeFn.mock.calls[0][0]).toBe('iDesign');
  });

  it('value', () => {
    const { container } = render(<Input value='iDesign' />);
    expect(container.firstChild.firstChild.value).toEqual('iDesign');
  });

  it('defaultValue', () => {
    const { container } = render(<Input defaultValue='iDesign' />);
    expect(container.firstChild.firstChild.value).toEqual('iDesign');
  });

  it('disabled', () => {
    const focusFn = jest.fn();
    const { container } = render(<Input disabled onFocus={focusFn} />);
    expect(container.firstChild).toHaveClass('i-input-is-disabled');
    fireEvent.click(container.firstChild);
    expect(focusFn).toBeCalledTimes(0);
  });

  it('readonly', () => {
    const { container } = render(<Input readonly />);
    expect(container.firstChild).toHaveClass('i-input-is-readonly');
  });

  it('size', () => {
    const { container } = render(<Input size="small" />);
    expect(container.firstChild).toHaveClass('i-input--size-small');
  })

  it('maxLength', () => {
    const { container } = render(<Input maxLength={15} />);
    expect(container.querySelector('.i-input--limit')).toBeInTheDocument();
  })

  it('password', () => {
    const { container } = render(<Input type="password" />);
    expect(container.firstChild.firstChild.type).toEqual('password');
  })

  it('number', () => {
    const { asFragment, container } = render(<Input type="number" />);
    expect(asFragment()).toMatchSnapshot();
    expect(container.firstChild.firstChild.type).toEqual('number');
  })

  it('clearable', () => {
    const clearFn = jest.fn();
    const { container } = render(<Input defaultValue='iDesign' clearable onClear={clearFn} />);
    fireEvent.mouseEnter(container.firstChild);
    expect(container.firstChild.lastChild).toHaveClass('icon-TipCloseFill');
    fireEvent.click(container.querySelector('.icon-TipCloseFill'));
    expect(container.firstChild.firstChild.value).toEqual('');
  })

  it('prefixIcon', () => {
    const { container } = render(<Input prefixIcon="Search" />);
    expect(container.firstChild.firstChild).toHaveClass('i-input-prefix-icon');
  })

  it('suffixIcon', () => {
    const { container } = render(<Input suffixIcon="Search" />);
    expect(container.firstChild.lastChild).toHaveClass('i-input-suffix-icon');
  })

  it('keyDown', async () => {
    const onKeydownFn = jest.fn();
    const onEnterFn = jest.fn();

    const { container } = render(
      <Input onKeyDown={onKeydownFn} onEnter={onEnterFn} />,
    );
    const InputDOM = container.firstChild.firstChild;

    const user = userEvent.setup()
    await user.click(InputDOM)
    await user.keyboard('abc{enter}')

    expect(onEnterFn).toBeCalled();
    expect(onKeydownFn).toBeCalled();
  });
});

