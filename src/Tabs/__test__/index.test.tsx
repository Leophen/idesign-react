import { render, fireEvent } from '@testing-library/react';
import Tabs from '../index';

describe('Tabs 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Tabs>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡2</Tabs.Item>
        <Tabs.Item>选项卡3</Tabs.Item>
      </Tabs>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('active', () => {
    const { getByTestId } = render(
      <Tabs active={1}>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item data-testid='test-item'>选项卡2</Tabs.Item>
        <Tabs.Item>选项卡3</Tabs.Item>
      </Tabs>
    );
    expect(getByTestId('test-item')).toHaveClass('i-tabs-item__active');
  });

  it('defaultActive', () => {
    const { getByTestId } = render(
      <Tabs defaultActive={1}>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item data-testid='test-item'>选项卡2</Tabs.Item>
        <Tabs.Item>选项卡3</Tabs.Item>
      </Tabs>
    );
    expect(getByTestId('test-item')).toHaveClass('i-tabs-item__active');
  });

  it('onChange', () => {
    const changeFn = jest.fn();
    const { getByTestId } = render(
      <Tabs onChange={changeFn}>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item data-testid='test-item'>选项卡2</Tabs.Item>
        <Tabs.Item>选项卡3</Tabs.Item>
      </Tabs>
    );
    fireEvent.click(getByTestId('test-item'));
    expect(changeFn).toHaveBeenCalled();
  });

  it('theme', () => {
    const { container } = render(
      <Tabs theme="card">
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item>选项卡2</Tabs.Item>
        <Tabs.Item>选项卡3</Tabs.Item>
      </Tabs>
    );
    expect(container.firstChild.firstChild).toHaveClass('i-tabs-item__card');
  });

  it('disabled', () => {
    const changeFn = jest.fn();
    const { getByTestId } = render(
      <Tabs disabled>
        <Tabs.Item>选项卡1</Tabs.Item>
        <Tabs.Item data-testid='test-item'>选项卡2</Tabs.Item>
        <Tabs.Item>选项卡3</Tabs.Item>
      </Tabs>
    );
    fireEvent.click(getByTestId('test-item'));
    expect(changeFn).not.toHaveBeenCalled();
  });
});

