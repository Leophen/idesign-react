import { render, fireEvent } from '@testing-library/react';
import Menu from '../index';

describe('Menu 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('active', () => {
    const { getByTestId } = render(
      <Menu active='1'>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item data-testid='test-item'>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
      </Menu>
    );
    expect(getByTestId('test-item')).toHaveClass('i-menu-item__active');
  });

  it('defaultActive', () => {
    const { getByTestId } = render(
      <Menu defaultActive='1'>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item data-testid='test-item'>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
      </Menu>
    );
    expect(getByTestId('test-item')).toHaveClass('i-menu-item__active');
  });

  it('onChange', () => {
    const changeFn = jest.fn();
    const { getByTestId } = render(
      <Menu onChange={changeFn}>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item data-testid='test-item'>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
      </Menu>
    );
    fireEvent.click(getByTestId('test-item'));
    expect(changeFn).toHaveBeenCalled();
  });

  it('prefixContent suffixContent', () => {
    const prefix = <img src="https://picsum.photos/180/120" />
    const suffix = <div>个人中心</div>

    const { container } = render(
      <Menu prefixContent={prefix} suffixContent={suffix}>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
      </Menu>
    );
    expect(container.firstChild.firstChild).toHaveClass('i-menu__logo');
    expect(container.firstChild.lastChild).toHaveClass('i-menu__operations');
  });

  it('Menu Group', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Group title='菜单2'>
          <Menu.Item>菜单2-1</Menu.Item>
          <Menu.Group title='菜单2-2'>
            <Menu.Item>菜单2-2-1</Menu.Item>
            <Menu.Item>菜单2-2-2</Menu.Item>
            <Menu.Item value='menu2-2-3'>菜单2-2-3</Menu.Item>
          </Menu.Group>
          <Menu.Item value='menu2-3'>菜单2-3</Menu.Item>
        </Menu.Group>
        <Menu.Item>菜单3</Menu.Item>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Menu Group width & Direction', () => {
    const { asFragment } = render(
      <Menu width={200} direction="vertical">
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Group title='菜单2'>
          <Menu.Item>菜单2-1</Menu.Item>
          <Menu.Group title='菜单2-2'>
            <Menu.Item>菜单2-2-1</Menu.Item>
            <Menu.Item>菜单2-2-2</Menu.Item>
            <Menu.Item value='menu2-2-3'>菜单2-2-3</Menu.Item>
          </Menu.Group>
          <Menu.Item value='menu2-3'>菜单2-3</Menu.Item>
        </Menu.Group>
        <Menu.Item>菜单3</Menu.Item>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

