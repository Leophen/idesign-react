import { render, fireEvent } from '@testing-library/react';
import ColorPicker from '../index';

describe('ColorPicker 组件测试', () => {
  const renderColor = (comp) => {
    const { container } = render(comp);
    return container.querySelector('.i-color')
  }
  it('create', () => {
    const { asFragment } = render(<ColorPicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    expect(renderColor(<ColorPicker value='#5cc083' />)).toHaveStyle('background: #5cc083');
  });

  it('defaultValue', () => {
    expect(renderColor(<ColorPicker value='#5cc083' />)).toHaveStyle('background: #5cc083');
  });

  it('disabled', () => {
    const clickFn = jest.fn();
    const color = renderColor(<ColorPicker disabled onTrigger={clickFn} />)
    expect(color).toHaveClass('i-color__disabled');
    fireEvent.click(color);
    expect(clickFn).toBeCalledTimes(0);
  });

  it('size', () => {
    expect(renderColor(<ColorPicker size="small" />)).toHaveClass('i-color--size-small');
  });
});

