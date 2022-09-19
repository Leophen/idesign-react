import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../index';

describe('Checkbox 组件测试', () => {
  const renderBox = (box) => {
    const { container } = render(box);
    return container.firstChild
  }

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
    expect(renderBox(<Checkbox defaultChecked={true} />)).toHaveClass('i-checkbox', 'i-checkbox-is-checked');
  });

  it('disabled', () => {
    const fn = jest.fn();
    const checkbox = renderBox(<Checkbox disabled={true} onChange={fn} />)
    expect(checkbox).toHaveClass('i-checkbox-is-disabled');
    fireEvent.click(checkbox);
    expect(fn).toBeCalledTimes(0);
  });

  it('size', () => {
    expect(renderBox(<Checkbox size="small" />)).toHaveClass('i-checkbox--size-small');
  });
});

describe('CheckboxGroup 组件测试', () => {
  it('selected', () => {
    const { getByTestId } = render(
      <Checkbox.Group selected={['sz']}>
        <Checkbox value="gz">广州</Checkbox>
        <Checkbox value="sz" data-testid='sz-item'>深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(getByTestId('sz-item')).toHaveClass('i-checkbox-is-checked');
  });

  it('defaultSelected', () => {
    const { getByTestId } = render(
      <Checkbox.Group defaultSelected={['gz']}>
        <Checkbox value="gz" data-testid='gz-item'>广州</Checkbox>
        <Checkbox value="sz">深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(getByTestId('gz-item')).toHaveClass('i-checkbox-is-checked');
  });

  it('disabled', () => {
    const fn = jest.fn();
    const { getByTestId } = render(
      <Checkbox.Group disabled>
        <Checkbox value="gz" data-testid='gz-item'>广州</Checkbox>
        <Checkbox value="sz">深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(getByTestId('gz-item')).toHaveClass('i-checkbox-is-disabled');
    fireEvent.click(getByTestId('gz-item'));
    expect(fn).toBeCalledTimes(0);
  });

  it('size', () => {
    const { getByTestId } = render(
      <Checkbox.Group size="small">
        <Checkbox value="gz" data-testid='gz-item'>广州</Checkbox>
        <Checkbox value="sz">深圳</Checkbox>
      </Checkbox.Group>,
    );
    expect(getByTestId('gz-item')).toHaveClass('i-checkbox--size-small');
  });
});

