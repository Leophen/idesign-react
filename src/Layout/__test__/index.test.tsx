import { render } from '@testing-library/react';
import Layout from '../index';

const { Header, Content, Footer, Aside } = Layout;

describe('Layout 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Aside>Aside</Aside>
          <Layout>
            <Content>Content</Content>
            <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('width', () => {
    const wrapper = render(
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Aside data-testid="aside" width={100}>Aside</Aside>
          <Layout>
            <Content>Content</Content>
            <Footer>Copyright @ 2019-2021 iDesign. All Rights Reserved</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
    expect(wrapper.getByTestId('aside')).toHaveStyle('width: 100px');
  })
});

