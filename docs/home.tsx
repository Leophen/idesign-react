import React, { useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import fast from './assets/fast.svg';
import customizable from './assets/customizable.svg';
import atomic from './assets/atomic.svg';
import fluent from './assets/fluent.svg';
import logo from './assets/logo.svg';

import { Avatar, Breadcrumb, Button, Checkbox, ColorPicker, DatePicker, Dropdown, Input, Layout, Menu, Pagination, Progress, Radio, Rate, Slider, TimePicker, Upload } from 'idesign-react'

const contentArr = [
  {
    icon: fast,
    title: '高性能',
    value: 'high_performance',
    description: '为严苛场景精心优化，拥有最佳的包体积大小和极致的性能。',
  },
  {
    icon: customizable,
    title: '可定制',
    value: 'customizable',
    description: '可以可靠且高效地对组件外观进行调整，或是创造出自己的主题。',
  },
  {
    icon: atomic,
    title: '原子化',
    value: 'atomization',
    description: '每个组件的功能，不多也不少，恰好就是你所需。',
  },
  {
    icon: fluent,
    title: '流畅性',
    value: 'fluency',
    description: '拥有流畅和细腻的动画，助力产品打造出极致体验。',
  },
];

const Home = () => {
  const toVueVersion = () => {
    window.open('https://idesign-vue.vercel.app/')
  };
  const [tipVisible, setTipVisible] = useState(false);
  const [copyText, setCopyText] = useState('点击复制邮箱');
  const myEmail = 'leophen@foxmail.com';
  const handleCopyEmail = () => {
    setCopyText('已复制');
    navigator.clipboard.writeText(myEmail);
  };
  const handleEnterEmail = () => {
    setTipVisible(true);
  };
  const handleLeaveEmail = () => {
    setCopyText('点击复制邮箱');
    setTipVisible(false);
  };

  const options = [
    {
      content: '个人中心',
      value: 1
    },
    {
      content: '退出',
      value: 2
    },
  ]

  const prefix = <img src="/images/logo.svg" />
  const suffix = (
    <Dropdown options={options}>
      <Avatar size={24} />
    </Dropdown>
  )

  const [currentValue, setCurrentValue] = useState('2');
  const handleChange = (val: string) => {
    setCurrentValue(val);
  };

  const [currentValue2, setCurrentValue2] = useState(['gz']);
  const handleChange2 = (val: any) => {
    setCurrentValue2(val);
  };

  const banner = (
    <header className="home-banner">
      <div className="home-banner-left">
        <h1>iDesign</h1>
        <p>一套基于 React 的高质量 UI 组件库</p>
        <div className="home-banner-btn-wrap">
          <Link to="/components/button">
            <div className="home-banner-btn">开始使用</div>
          </Link>
          <div className="home-banner-btn trans" onClick={toVueVersion}>
            切换 Vue 版本
          </div>
        </div>
      </div>
      <div className="home-banner-right">
        <section className="home-web">
          <header className="home-web-header">
            <div className="home-web-header-dots">
              <div className="home-web-header-dot"></div>
              <div className="home-web-header-dot"></div>
              <div className="home-web-header-dot"></div>
            </div>
            <Input
              placeholder='iDesign'
              clearable
              size="small"
              suffixIcon="Search"
            />
          </header>
          <Layout>
            <Layout.Header>
              <Menu defaultActive='b' prefixContent={prefix} suffixContent={suffix}>
                <Menu.Item value='a'>菜单1</Menu.Item>
                <Menu.Item value='b'>菜单2</Menu.Item>
                <Menu.Item value='c'>菜单3</Menu.Item>
                <Menu.Item value='d'>菜单4</Menu.Item>
              </Menu>
            </Layout.Header>
            <Layout style={{ height: 320 }}>
              <Layout.Aside width={120}>
                <Menu
                  width="100%"
                  direction="vertical"
                >
                  <Menu.Item>选项1</Menu.Item>
                  <Menu.Group title='选项2' expandAll>
                    <Menu.Item>选项2-1</Menu.Item>
                    <Menu.Item>选项2-2</Menu.Item>
                    <Menu.Item>选项2-3</Menu.Item>
                  </Menu.Group>
                  <Menu.Item>选项3</Menu.Item>
                  <Menu.Item>选项4</Menu.Item>
                </Menu>
              </Layout.Aside>
              <Layout className='home-web-layout-content-wrapper'>
                <Layout.Content>
                  <div className="home-web-breadcrumb">
                    <Breadcrumb>
                      <Breadcrumb.Item>iDesign</Breadcrumb.Item>
                      <Breadcrumb.Item>一套基于 React 的高质量 UI 组件库</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="home-web-block-wrapper">
                    <div className="home-web-block-item">
                      <div className="home-web-block -demo1">
                        {/* 灰色 info */}
                        <Button size="small" type="info">填充按钮</Button>
                        {/* 蓝色 primary（默认） */}
                        <Button size="small" type="primary">填充按钮</Button>
                        <Button size="small" type="primary" variant="dashed">
                          虚框按钮
                        </Button>
                        {/* 绿色 success */}
                        <Button size="small" type="success">填充按钮</Button>
                        <Button size="small" type="success" variant="dashed">
                          虚框按钮
                        </Button>
                        {/* 黄色 warning */}
                        <Button size="small" type="warning">填充按钮</Button>
                        <Button size="small" type="warning" variant="dashed">
                          虚框按钮
                        </Button>
                        {/* 红色 error */}
                        <Button size="small" type="error">填充按钮</Button>
                      </div>
                      <div className="home-web-block -demo2">
                        <Radio.Group size="small" currentValue={currentValue} onChange={handleChange}>
                          <Radio value="1">选项一</Radio>
                          <Radio value="2">选项二</Radio>
                          <Radio value="3">选项三</Radio>
                        </Radio.Group>
                        <Checkbox.Group size="small" currentValue={currentValue2} onChange={handleChange2}>
                          <Checkbox value="bj">北京</Checkbox>
                          <Checkbox value="sh">上海</Checkbox>
                          <Checkbox value="gz">广州</Checkbox>
                        </Checkbox.Group>
                        <DatePicker type="range" />
                      </div>
                      <div className="home-web-block -demo3">
                        <ColorPicker />
                        <ColorPicker defaultValue='#79B48B' />
                        <ColorPicker defaultValue='#E7AE61' />
                        <TimePicker />
                        <Upload />
                      </div>
                    </div>

                    <div className="home-web-block-item">
                      <div className="home-web-block -demo4">
                        <Rate defaultValue={2} />
                        <Progress type="circle" percentage={30} width={100} />
                        <Progress type="circle" width={100} percentage={70} indeterminate />
                        <Rate defaultValue={4} />
                        <Progress width="100%" percentage={90} indeterminate />
                        <Slider defaultValue={30} />
                      </div>
                    </div>

                    <div className="home-web-block-item">
                      <div className="home-web-block -demo5">
                        <Pagination total={80} />
                      </div>
                    </div>
                  </div>

                </Layout.Content>
                <Layout.Footer>
                  <div className="home-web-footer">
                    Copyright @ 2019-2021 iDesign. All Rights Reserved
                  </div>
                </Layout.Footer>
              </Layout>
            </Layout>
          </Layout>
        </section>
      </div>
    </header>
  )

  return (
    <div className="home-container">
      {banner}

      <section className="home-content">
        {contentArr.map((item) => (
          <div className="home-content-item" key={item.value}>
            <div className="home-content-item-icon">
              <img src={item.icon} alt="fast" />
            </div>
            <div className="home-content-item-title">{item.title}</div>
            <div className="home-content-item-description">{item.description}</div>
          </div>
        ))}
      </section>

      <footer className="home-footer">
        <div className="home-footer-left">© 2022 iDesign UI. Made with ❤ by Leophen</div>
        <div className="home-footer-center">
          <img src={logo} alt="idesign" />
          <div className="home-footer-center-title">iDesign</div>
        </div>
        <div className="home-footer-right">
          联系方式：
          <div
            className="home-footer-right-email"
            onClick={handleCopyEmail}
            onMouseEnter={handleEnterEmail}
            onMouseLeave={handleLeaveEmail}
          >
            {myEmail}
          </div>
          <div className={classNames('home-footer-right-tip', tipVisible && '-visible')}>
            {copyText}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
