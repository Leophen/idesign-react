import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popup from '../index';

const App = ({ children }) => (
  <div className="app">
    <header className="app-header">app header</header>
    <div className="app-body">{children}</div>
    <footer className="app-footer">footer</footer>
  </div>
)

describe('Popup 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Popup content="提示内容">
        <button>悬浮提示</button>
      </Popup>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('trigger', async () => {
    const { getByTestId } = render(
      <Popup content="提示内容" trigger="click">
        <button data-testid='trigger'>点击提示</button>
      </Popup>,
      { wrapper: App }
    );

    expect(document.querySelector('.i-popup')).not.toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(getByTestId('trigger'))

    expect(document.querySelector('.i-popup')).toBeInTheDocument()
  });

  it('disabled', async () => {
    const { getByTestId } = render(
      <Popup content="提示内容" trigger="click" disabled>
        <button data-testid='trigger'>点击提示</button>
      </Popup>,
      { wrapper: App }
    );

    expect(document.querySelector('.i-popup')).not.toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(getByTestId('trigger'))

    expect(document.querySelector('.i-popup')).not.toBeInTheDocument()
  });
});

