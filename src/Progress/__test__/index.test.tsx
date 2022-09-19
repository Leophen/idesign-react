import { render } from '@testing-library/react';
import Progress from '../index';

describe('Progress 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Progress percentage={60} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('label', () => {
    const { queryByText } = render(<Progress label="😄" />);
    expect(queryByText('😄')).toBeInTheDocument();
  });

  it('hide label', () => {
    const { container } = render(<Progress labelTxt={false} />);
    expect(container.querySelector('.i-progress__info')).not.toBeInTheDocument();
  });

  it('innerLabel', () => {
    const { container } = render(<Progress innerLabel />);
    expect(container.firstChild.firstChild).toHaveClass('i-progress-bar__has-label');
  });

  it('color backColor', () => {
    const { container } = render(<Progress color="blue" backColor="red" />);
    expect(container.querySelector('.i-progress-bar')).toHaveStyle('background: red');
    expect(container.querySelector('.i-progress-bar__inner')).toHaveStyle('background: blue');
  });

  it('width', () => {
    const { container } = render(<Progress width={300} />);
    expect(container.firstChild.firstChild).toHaveStyle('width: 300px');
  });

  it('strokeWidth', () => {
    const { container } = render(<Progress strokeWidth={30} />);
    expect(container.firstChild.firstChild).toHaveStyle('height: 30px');
  });

  it('circle', () => {
    const { asFragment } = render(<Progress type="circle" percentage={60} width={100} strokeWidth={20} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

