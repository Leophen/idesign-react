import { render } from '@testing-library/react';
import TimePicker from '../index';

describe('TimePicker 组件测试', () => {
  const renderTimeVal = (comp) => {
    const { container } = render(comp);
    const inputList = container.querySelectorAll('.i-input__inner')
    return `${inputList[0].value}:${inputList[1].value}:${inputList[2].value}`
  }

  it('create', () => {
    const { asFragment } = render(<TimePicker value='12:34:56' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    expect(renderTimeVal(<TimePicker value='12:34:56' />)).toEqual('12:34:56');
  });

  it('defaultValue', () => {
    expect(renderTimeVal(<TimePicker defaultValue='12:34:56' />)).toEqual('12:34:56');
  });

  it('disabled', () => {
    const { container } = render(<TimePicker disabled />);
    expect(container.querySelector('.i-input')).toHaveClass('i-input-is-disabled');
  });
});

