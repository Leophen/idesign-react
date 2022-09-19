import { render } from '@testing-library/react';
import DatePicker from '../index';

describe('DatePicker 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<DatePicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    const { container } = render(<DatePicker value='2022-05-20' />);
    expect(container.firstChild.firstChild.firstChild.firstChild.value).toEqual('2022-05-20');
  });

  it('defaultValue', () => {
    const { container } = render(<DatePicker defaultValue='2022-05-20' />);
    expect(container.firstChild.firstChild.firstChild.firstChild.value).toEqual('2022-05-20');
  });

  it('disabled', () => {
    const { container } = render(<DatePicker disabled />);
    expect(container.firstChild.firstChild.firstChild).toHaveClass('i-input-is-disabled');
  });

  it('type', () => {
    const { container } = render(<DatePicker type="range" value={['2022-05-20', '2022-11-11']} />);
    expect(container.firstChild.firstChild.firstChild.firstChild.value).toEqual('2022-05-20 ~ 2022-11-11');
  });

  it('rangeSeparator', () => {
    const { container } = render(<DatePicker type="range" value={['2022-05-20', '2022-11-11']} rangeSeparator="/" />);
    expect(container.firstChild.firstChild.firstChild.firstChild.value).toEqual('2022-05-20 / 2022-11-11');
  });
});

