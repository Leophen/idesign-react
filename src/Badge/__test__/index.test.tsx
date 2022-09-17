import { render } from '@testing-library/react';
import Badge from '../index';

describe('Badge 组件测试', () => {
  function renderSup(badge) {
    const { container } = render(badge);
    return container.firstChild.lastChild;
  }

  it('count', () => {
    expect(renderSup(<Badge />)).toHaveTextContent('0');
    expect(renderSup(<Badge count='new' />)).toHaveTextContent('new');
  });

  it('max count', () => {
    expect(renderSup(<Badge count={100} />)).toHaveTextContent('99+');
    expect(renderSup(<Badge count={10} maxCount={9} />)).toHaveTextContent('9+');
  });

  it('color', () => {
    const { asFragment } = render(<Badge color="red" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('dot', () => {
    expect(renderSup(<Badge dot />)).toHaveClass('i-badge--dot');
  })

  it('size', () => {
    expect(renderSup(<Badge size="small" />)).toHaveClass('i-badge__size-small');
  })

  it('shape', () => {
    expect(renderSup(<Badge shape="round" />)).toHaveClass('i-badge--round');
  })

  it('offset', () => {
    expect(renderSup(<Badge offset={[10, 10]} />)).toHaveStyle({ right: '10px', 'margin-top': '10px' });
  })
});

