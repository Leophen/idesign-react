import { render, fireEvent } from '@testing-library/react';
import ColorPicker from '../index';

describe('ColorPicker 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<ColorPicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    const { container } = render(<ColorPicker value='#5cc083' />);
    expect(container.firstChild.firstChild.firstChild).toHaveStyle('background: #5cc083');
  });

  it('defaultValue', () => {
    const { container } = render(<ColorPicker value='#5cc083' />);
    expect(container.firstChild.firstChild.firstChild).toHaveStyle('background: #5cc083');
  });

  it('disabled', () => {
    const clickFn = jest.fn();
    const { container } = render(<ColorPicker disabled onTrigger={clickFn} />);
    expect(container.firstChild.firstChild.firstChild).toHaveClass('i-color__disabled');
    fireEvent.click(container.firstChild.firstChild.firstChild);
    expect(clickFn).toBeCalledTimes(0);
  });

  it('size', () => {
    const { container } = render(<ColorPicker size="small" />);
    expect(container.firstChild.firstChild.firstChild).toHaveClass('i-color--size-small');
  });
});

