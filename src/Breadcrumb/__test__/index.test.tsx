import { render } from '@testing-library/react';
import Breadcrumb from '../index';

describe('Breadcrumb 组件测试', () => {
  it('create', () => {
    const el = (
      <Breadcrumb>
        <Breadcrumb.Item>item1</Breadcrumb.Item>
        <Breadcrumb.Item>item2</Breadcrumb.Item>
        <Breadcrumb.Item>item3</Breadcrumb.Item>
      </Breadcrumb>
    );
    const { asFragment } = render(el);
    expect(asFragment()).toMatchSnapshot();
  });

  it('breadcrumbItem children', () => {
    const el = (
      <Breadcrumb>
        <Breadcrumb.Item>item</Breadcrumb.Item>
      </Breadcrumb>
    );
    const { container } = render(el);
    expect(container.firstChild.firstChild).toHaveTextContent('item');
  });

  it('breadcrumbItem disabled', () => {
    const el = (
      <Breadcrumb>
        <Breadcrumb.Item disabled>item</Breadcrumb.Item>
      </Breadcrumb>
    );
    const { container } = render(el);
    expect(container.firstChild.firstChild).toHaveClass('i-breadcrumb-is-disabled');
  });

  it('max width', () => {
    const el = (
      <Breadcrumb maxItemWidth="120px">
        <Breadcrumb.Item>item</Breadcrumb.Item>
      </Breadcrumb>
    );
    const { container } = render(el);
    expect(container.firstChild.firstChild.firstChild).toHaveStyle('max-width: 120px');
  });

  it('separator', () => {
    const el = (
      <Breadcrumb separator="👉">
        <Breadcrumb.Item>item</Breadcrumb.Item>
      </Breadcrumb>
    );
    const { container } = render(el);
    expect(container.firstChild.firstChild.lastChild).toHaveTextContent('👉');
  });
});

