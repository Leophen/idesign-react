import { render } from '@testing-library/react';
import Breadcrumb from '../index';

describe('Breadcrumb 组件测试', () => {
  const renderFirstItem = (breadcrumb) => {
    const { container } = render(breadcrumb);
    return container.firstChild.firstChild
  }

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
    expect(renderFirstItem(el)).toHaveTextContent('item');
  });

  it('breadcrumbItem disabled', () => {
    const el = (
      <Breadcrumb>
        <Breadcrumb.Item disabled>item</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(renderFirstItem(el)).toHaveClass('i-breadcrumb-is-disabled');
  });

  it('max width', () => {
    const el = (
      <Breadcrumb maxItemWidth="120px">
        <Breadcrumb.Item>item</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(renderFirstItem(el).firstChild).toHaveStyle('max-width: 120px');
  });

  it('separator', () => {
    const el = (
      <Breadcrumb separator="👉">
        <Breadcrumb.Item>item</Breadcrumb.Item>
      </Breadcrumb>
    );
    const { queryByText } = render(el);
    expect(queryByText('👉')).toBeInTheDocument();
  });
});

