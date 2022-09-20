import { render } from '@testing-library/react';
import Slider from '../index';

describe('Slider 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Slider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('value', () => {
    const { container } = render(<Slider value={90} />);
    expect(container.querySelector('.i-slider__button')).toHaveStyle('left: calc(90% - 0px)');
  });

  it('defaultValue', () => {
    const { container } = render(<Slider defaultValue={90} />);
    expect(container.querySelector('.i-slider__button')).toHaveStyle('left: calc(90% - 0px)');
  });

  it('disabled', () => {
    const { container } = render(<Slider disabled />);
    expect(container.firstChild).toHaveClass('i-slider__disabled');
  });

  it('range', () => {
    const { asFragment } = render(<Slider range defaultValue={[30, 90]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('vertical', () => {
    const { asFragment } = render(<Slider layout="vertical" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

