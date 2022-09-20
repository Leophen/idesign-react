import { render, fireEvent } from '@testing-library/react';
import Scrollbar from '../index';

describe('Scrollbar 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Scrollbar height={60}>
        {Array(24).fill('item').map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))}
      </Scrollbar>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

