import { render } from '@testing-library/react';
import Grid from '../index';

describe('Grid 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Grid>
        <Grid.Item span={8}>
          <div>GridItem1</div>
        </Grid.Item>
        <Grid.Item span={8}>
          <div>GridItem2</div>
        </Grid.Item>
        <Grid.Item span={8}>
          <div>GridItem3</div>
        </Grid.Item>
      </Grid>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

