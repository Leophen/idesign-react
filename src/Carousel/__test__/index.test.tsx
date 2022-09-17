import { render } from '@testing-library/react';
import Carousel from '../index';

describe('Carousel 组件测试', () => {
  it('create', () => {
    const el = (
      <Carousel defaultCurrent={1}>
        <Carousel.Item>
          item1
        </Carousel.Item>
        <Carousel.Item>
          item2
        </Carousel.Item>
        <Carousel.Item>
          item3
        </Carousel.Item>
      </Carousel>
    );
    const { asFragment } = render(el);
    expect(asFragment()).toMatchSnapshot();
  });
});

