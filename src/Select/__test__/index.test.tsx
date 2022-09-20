import { useState } from 'react'
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../index';

describe('Select 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Select>
        <Select.Item value="item1">选项一</Select.Item>
        <Select.Item value="item2">选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('onChange', async () => {
    const SingleSelect = () => {
      const [value, setValue] = useState('item2');
      const onChange = (value) => {
        setValue(value);
      };
      return (
        <Select value={value} onChange={onChange}>
          <Select.Item value="item1">选项一</Select.Item>
          <Select.Item value="item2">选项二</Select.Item>
          <Select.Item value="item3">选项三</Select.Item>
        </Select>
      );
    };
    const { container, getByText } = render(<SingleSelect />);

    // 未点击 input 前，popup 不出现
    expect(document.querySelector('.i-popup')).toBeNull();

    // 鼠标点击 input，popup 出现
    const user = userEvent.setup()
    await user.click(container.querySelector('.i-input'))

    const popupElement = document.querySelector('.i-popup')
    expect(popupElement).not.toBeNull();
    expect(popupElement).toHaveTextContent('选项一');
    expect(popupElement).toHaveTextContent('选项二');
    expect(popupElement).toHaveTextContent('选项三');

    // 点击'选项一'选项，input 展示该选项，且 popup 消失
    await user.click(getByText('选项一'))

    expect(document.querySelector('.i-input__inner')).toHaveValue('选项一');
    expect(document.querySelector('.i-popup')).toBeInTheDocument();
  });

  it('size', () => {
    const { container } = render(
      <Select size="small">
        <Select.Item value="item1">选项一</Select.Item>
        <Select.Item value="item2">选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
    );
    expect(container.querySelector('.i-input--size-small')).toBeInTheDocument();
  });

  it('disabled', async () => {
    const { container } = render(
      <Select disabled={true}>
        <Select.Item value="item1">选项一</Select.Item>
        <Select.Item value="item2">选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
    );
    expect(container.querySelector('.i-input-is-disabled')).toBeInTheDocument();

    const user = userEvent.setup()
    await user.click(container.querySelector('.i-input'))

    expect(document.querySelector('.i-popup')).toBeNull();
  });

  it('single disabled', async () => {
    const { container, getByText } = render(
      <Select>
        <Select.Item value="item1" disabled>选项一</Select.Item>
        <Select.Item value="item2">选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
    );
    expect(document.querySelector('.i-popup')).toBeNull();

    const user = userEvent.setup()
    await user.click(container.querySelector('.i-input'))

    expect(document.querySelector('.i-popup')).not.toBeNull();

    await user.click(getByText('选项一'))

    expect(document.querySelector('.i-popup')).not.toBeNull();
  });

  it('title', async () => {
    const { container, getByText } = render(
      <Select>
        <Select.Item value="item1" title="分组 1">选项一</Select.Item>
        <Select.Item value="item2">选项二</Select.Item>
        <Select.Item value="item3">选项三</Select.Item>
      </Select>
    );

    const user = userEvent.setup()
    await user.click(container.querySelector('.i-input'))

    expect(getByText('分组 1')).toBeInTheDocument();
  });
});



