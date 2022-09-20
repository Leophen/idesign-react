import { render, fireEvent } from '@testing-library/react';
import Radio from '../index';

describe('Radio 组件测试', () => {
  const renderRadio = (box) => {
    const { container } = render(box);
    return container.firstChild
  }

  it('create', () => {
    const { asFragment } = render(<Radio />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('checked & children', () => {
    const { container, queryByText } = render(<Radio checked={true}>广州</Radio>);
    expect(container.firstChild).toHaveClass('i-radio', 'i-radio-is-checked');
    expect(queryByText('广州')).toBeInTheDocument();
  });

  it('defaultChecked', () => {
    expect(renderRadio(<Radio defaultChecked={true} />)).toHaveClass('i-radio', 'i-radio-is-checked');
  });

  it('disabled', () => {
    const fn = jest.fn();
    const radio = renderRadio(<Radio disabled={true} onChange={fn} />)
    expect(radio).toHaveClass('i-radio-is-disabled');
    fireEvent.click(radio);
    expect(fn).toBeCalledTimes(0);
  });

  it('type', () => {
    expect(renderRadio(<Radio type="radio-button" />)).toHaveClass('i-radio-button');
  });

  it('size', () => {
    expect(renderRadio(<Radio type="radio-button" size="small" />)).toHaveClass('i-radio-button--size-small');
  });
});

describe('RadioGroup 组件测试', () => {
  it('selected', () => {
    const { getByTestId } = render(
      <Radio.Group selected='sz'>
        <Radio value="gz">广州</Radio>
        <Radio value="sz" data-testid='sz-item'>深圳</Radio>
      </Radio.Group>,
    );
    expect(getByTestId('sz-item')).toHaveClass('i-radio-is-checked');
  });

  it('defaultSelected', () => {
    const { getByTestId } = render(
      <Radio.Group defaultSelected='gz'>
        <Radio value="gz" data-testid='gz-item'>广州</Radio>
        <Radio value="sz">深圳</Radio>
      </Radio.Group>,
    );
    expect(getByTestId('gz-item')).toHaveClass('i-radio-is-checked');
  });

  it('disabled', () => {
    const fn = jest.fn();
    const { getByTestId } = render(
      <Radio.Group disabled>
        <Radio value="gz" data-testid='gz-item'>广州</Radio>
        <Radio value="sz">深圳</Radio>
      </Radio.Group>,
    );
    expect(getByTestId('gz-item')).toHaveClass('i-radio-is-disabled');
    fireEvent.click(getByTestId('gz-item'));
    expect(fn).toBeCalledTimes(0);
  });

  it('size', () => {
    const { getByTestId } = render(
      <Radio.Group type="radio-button" size="small">
        <Radio value="gz" data-testid='gz-item'>广州</Radio>
        <Radio value="sz">深圳</Radio>
      </Radio.Group>,
    );
    expect(getByTestId('gz-item')).toHaveClass('i-radio-button--size-small');
  });
});

