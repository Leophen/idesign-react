import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '../index';

describe('DatePicker 组件测试', () => {
  const renderInputVal = (comp) => {
    const { container } = render(comp);
    return container.querySelector('.i-input__inner').value
  }
  it('create', () => {
    const { asFragment } = render(<DatePicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    expect(renderInputVal(<DatePicker value='2022-05-20' />)).toEqual('2022-05-20');
  });

  it('defaultValue', () => {
    expect(renderInputVal(<DatePicker defaultValue='2022-05-20' />)).toEqual('2022-05-20');
  });

  it('disabled', () => {
    const { container } = render(<DatePicker disabled />);
    expect(container.querySelector('.i-input')).toHaveClass('i-input-is-disabled');
  });

  it('type', () => {
    expect(renderInputVal(<DatePicker type="range" value={['2022-05-20', '2022-11-11']} />)).toEqual('2022-05-20 ~ 2022-11-11');
  });

  it('rangeSeparator', () => {
    expect(renderInputVal(<DatePicker type="range" value={['2022-05-20', '2022-11-11']} rangeSeparator="/" />)).toEqual('2022-05-20 / 2022-11-11');
  });
});

