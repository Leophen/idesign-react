import { render, fireEvent } from '@testing-library/react';
import Textarea from '../index';

describe('Textarea 组件测试', () => {
  const renderTextarea = (textarea) => {
    const { container } = render(textarea);
    return container.querySelector('.i-textarea__inner')
  }

  it('create', () => {
    const { asFragment } = render(<Textarea />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('placeholder onChange', () => {
    const changeFn = jest.fn();
    const { queryByPlaceholderText } = render(<Textarea placeholder='请输入内容' onChange={changeFn} />);
    expect(queryByPlaceholderText('请输入内容')).toBeInTheDocument();
    fireEvent.change(queryByPlaceholderText('请输入内容'), { target: { value: 'iDesign' } });
    expect(changeFn).toBeCalledTimes(1);
    expect(changeFn.mock.calls[0][0]).toBe('iDesign');
  });

  it('value', () => {
    expect(renderTextarea(<Textarea value='iDesign' />).value).toEqual('iDesign');
  });

  it('defaultValue', () => {
    expect(renderTextarea(<Textarea defaultValue='iDesign' />).value).toEqual('iDesign');
  });

  it('disabled', () => {
    const focusFn = jest.fn();
    const { container } = render(<Textarea disabled onFocus={focusFn} />);
    expect(container.firstChild.firstChild).toHaveClass('i-textarea__inner-is-disabled');
    fireEvent.click(container.firstChild);
    expect(focusFn).toBeCalledTimes(0);
  });

  it('readonly', () => {
    expect(renderTextarea(<Textarea readonly />)).toHaveClass('i-textarea__inner-is-readonly');
  });

  it('maxLength', () => {
    const { container } = render(<Textarea maxLength={15} />);
    expect(container.querySelector('.i-textarea--limit')).toBeInTheDocument();
  })

  it('status', () => {
    expect(renderTextarea(<Textarea status="success" />)).toHaveClass('i-textarea__inner--status-success');
  });

  it('status-tips', () => {
    render(<Textarea status="success" tips="成功状态提示" />);
    expect(document.querySelector('.i-textarea__tips')).toBeInTheDocument();
  });

  it('noResize', () => {
    expect(renderTextarea(<Textarea noResize />)).toHaveStyle('resize: none');
  });
});

