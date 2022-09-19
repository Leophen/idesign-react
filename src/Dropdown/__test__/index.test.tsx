import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '../index';

const App = ({ children }) => (
  <div className="app">
    <header className="app-header">app header</header>
    <div className="app-body">{children}</div>
    <footer className="app-footer">footer</footer>
  </div>
)

const options = [
  {
    content: '操作一',
    value: 1
  },
  {
    content: '操作二',
    value: 2
  },
  {
    content: '操作三',
    value: 3
  }
]

describe('Dropdown 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Dropdown options={options}>
        <button>更多</button>
      </Dropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('onClick', async () => {
    const clickFn = jest.fn();

    const { getByTestId } = render(
      <Dropdown options={options} onClick={clickFn}>
        <button data-testid='trigger'>更多</button>
      </Dropdown>,
      { wrapper: App }
    );

    expect(document.querySelector('.i-popup')).not.toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(getByTestId('trigger'))

    expect(document.querySelector('.i-popup')).toBeInTheDocument()

    await user.click(document.querySelectorAll('.i-dropdown__item')[0])

    expect(clickFn).toBeCalled();
  });

  it('onTrigger', async () => {
    const triggerFn = jest.fn();

    const { getByTestId } = render(
      <Dropdown options={options} onTrigger={triggerFn}>
        <button data-testid='trigger'>更多</button>
      </Dropdown>,
      { wrapper: App }
    );

    expect(document.querySelector('.i-popup')).not.toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(getByTestId('trigger'))

    expect(document.querySelector('.i-popup')).toBeInTheDocument()
    expect(triggerFn).toBeCalled();
  });
});



