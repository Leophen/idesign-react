import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../index';

describe('Checkbox 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('checked & children', () => {
    const { container, queryByText } = render(<Checkbox checked={true}>广州</Checkbox>);
    expect(container.firstChild).toHaveClass('i-checkbox', 'i-checkbox-is-checked');
    expect(queryByText('广州')).toBeInTheDocument();
  });

  it('defaultChecked', () => {
    const { container } = render(<Checkbox defaultChecked={true} />);
    expect(container.firstChild).toHaveClass('i-checkbox', 'i-checkbox-is-checked');
  });

  it('disabled', () => {
    const fn = jest.fn();
    const { container } = render(<Checkbox disabled={true} onChange={fn} />);
    expect(container.firstChild).toHaveClass('i-checkbox-is-disabled');
    fireEvent.click(container.firstChild);
    expect(fn).toBeCalledTimes(0);
  });

  it('size', () => {
    const { container } = render(<Checkbox size="small" />);
    expect(container.firstChild).toHaveClass('i-checkbox--size-small');
  });
});

describe('CheckboxGroup 组件测试', () => {
  it('selected', () => {
    const { container } = render(
      <Checkbox.Group selected={['sz']}>
        <Checkbox value="gz">广州</Checkbox>
        <Checkbox value="sz">深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(container.firstChild.lastChild).toHaveClass('i-checkbox-is-checked');
  });

  it('defaultSelected', () => {
    const { container } = render(
      <Checkbox.Group defaultSelected={['gz']}>
        <Checkbox value="gz">广州</Checkbox>
        <Checkbox value="sz">深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(container.firstChild.firstChild).toHaveClass('i-checkbox-is-checked');
  });

  it('disabled', () => {
    const fn = jest.fn();
    const { container } = render(
      <Checkbox.Group disabled>
        <Checkbox value="gz">广州</Checkbox>
        <Checkbox value="sz">深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(container.firstChild.firstChild).toHaveClass('i-checkbox-is-disabled');
    fireEvent.click(container.firstChild.firstChild);
    expect(fn).toBeCalledTimes(0);
  });

  it('size', () => {
    const { container } = render(
      <Checkbox.Group size="small">
        <Checkbox value="gz">广州</Checkbox>
        <Checkbox value="sz">深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(container.firstChild.firstChild).toHaveClass('i-checkbox--size-small');
  });
});

