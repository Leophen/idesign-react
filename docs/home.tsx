import React, { useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// import fast from './assets/fast.svg';
// import customizable from './assets/customizable.svg';
// import fluent from './assets/fluent.svg';
import logo from './assets/logo.svg';

import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  ColorPicker,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Layout,
  Menu,
  Message,
  Pagination,
  Popup,
  Progress,
  Radio,
  Rate,
  Slider,
  TimePicker,
  Upload,
} from 'idesign-react';

const contentArr = [
  {
    title: '高性能',
    value: 'high_performance',
    description: '为严苛场景精心优化，拥有最佳的包体积大小和极致的性能。',
  },
  {
    title: '可定制',
    value: 'customizable',
    description: '可以高效地对组件外观进行调整，或是创造出自己的主题。',
  },
  {
    title: '流畅性',
    value: 'fluency',
    description: '拥有流畅和细腻的动画，助力产品打造出极致体验。',
  },
];

const Home = () => {
  const toVueVersion = () => {
    window.open('https://idesign-vue.vercel.app/');
  };
  const [tipVisible, setTipVisible] = useState(false);
  const [copyText, setCopyText] = useState('点击复制邮箱');
  const myEmail = 'leophen@foxmail.com';
  const handleCopyEmail = () => {
    setCopyText('已复制');
    navigator.clipboard.writeText(myEmail);
    Message.success('复制成功')
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
      value: 1,
    },
    {
      content: '退出',
      value: 2,
    },
  ];

  const prefix = <img src="/images/logo.svg" />;
  const suffix = (
    <Dropdown options={options}>
      <Avatar size={24} />
    </Dropdown>
  );

  const [currentValue, setCurrentValue] = useState('2');
  const handleChange = (val: string) => {
    setCurrentValue(val);
  };

  const [currentValue2, setCurrentValue2] = useState(['gz']);
  const handleChange2 = (val: any) => {
    setCurrentValue2(val);
  };

  const header = (
    <header className="home-header">
      <header className="home-title-txt">
        <svg width="771" height="197" viewBox="0 0 771 197" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.7109 23.7539H0.320312V0.804688H25.7109V23.7539ZM25.7109 151H0.320312V45.4336H25.7109V151ZM192.703 92.4062C192.703 100.935 191.206 108.78 188.211 115.941C185.281 123.103 181.212 129.288 176.004 134.496C170.796 139.639 164.611 143.676 157.449 146.605C150.288 149.535 142.508 151 134.109 151H65.5547C63.7318 151 62.0391 150.674 60.4766 150.023C58.9141 149.372 57.5469 148.493 56.375 147.387C55.2682 146.215 54.3893 144.848 53.7383 143.285C53.0872 141.723 52.7617 140.03 52.7617 138.207V23.7539C52.7617 21.9961 53.0872 20.3359 53.7383 18.7734C54.3893 17.2109 55.2682 15.8438 56.375 14.6719C57.5469 13.5 58.9141 12.5885 60.4766 11.9375C62.0391 11.2865 63.7318 10.9609 65.5547 10.9609H134.109C142.508 10.9609 150.288 12.4258 157.449 15.3555C164.611 18.2852 170.796 22.3542 176.004 27.5625C181.212 32.7057 185.281 38.8906 188.211 46.1172C191.206 53.2786 192.703 61.0911 192.703 69.5547V92.4062ZM167.312 69.5547C167.312 64.6068 166.499 60.082 164.871 55.9805C163.309 51.8789 161.062 48.3958 158.133 45.5312C155.203 42.6016 151.688 40.3555 147.586 38.793C143.549 37.1654 139.057 36.3516 134.109 36.3516H78.1523V125.609H134.109C139.057 125.609 143.549 124.828 147.586 123.266C151.688 121.638 155.203 119.392 158.133 116.527C161.062 113.598 163.309 110.115 164.871 106.078C166.499 101.977 167.312 97.4193 167.312 92.4062V69.5547ZM328.348 80.3945C328.348 83.9102 327.729 87.7188 326.492 91.8203C325.255 95.8568 323.237 99.6328 320.438 103.148C317.703 106.599 314.09 109.496 309.598 111.84C305.171 114.184 299.767 115.355 293.387 115.355H247.586V91.2344H293.387C296.837 91.2344 299.507 90.1927 301.395 88.1094C303.283 85.9609 304.227 83.3242 304.227 80.1992C304.227 76.8789 303.152 74.2747 301.004 72.3867C298.921 70.4987 296.382 69.5547 293.387 69.5547H247.586C244.135 69.5547 241.466 70.6289 239.578 72.7773C237.69 74.8607 236.746 77.4648 236.746 80.5898V116.039C236.746 119.424 237.788 122.061 239.871 123.949C242.02 125.837 244.656 126.781 247.781 126.781H293.387V151H247.586C244.07 151 240.262 150.382 236.16 149.145C232.124 147.908 228.348 145.922 224.832 143.188C221.382 140.388 218.484 136.775 216.141 132.348C213.797 127.855 212.625 122.419 212.625 116.039V80.3945C212.625 76.8789 213.243 73.1029 214.48 69.0664C215.717 64.9648 217.703 61.1888 220.438 57.7383C223.237 54.2227 226.85 51.293 231.277 48.9492C235.77 46.6055 241.206 45.4336 247.586 45.4336H293.387C296.902 45.4336 300.678 46.0521 304.715 47.2891C308.816 48.526 312.592 50.5443 316.043 53.3438C319.559 56.0781 322.488 59.6914 324.832 64.1836C327.176 68.6107 328.348 74.0143 328.348 80.3945ZM447.488 115.355C447.488 119.717 446.935 123.656 445.828 127.172C444.721 130.622 443.257 133.682 441.434 136.352C439.611 138.956 437.495 141.202 435.086 143.09C432.677 144.913 430.138 146.41 427.469 147.582C424.865 148.754 422.195 149.633 419.461 150.219C416.792 150.74 414.253 151 411.844 151H343.094V125.609H411.648C415.099 125.609 417.703 124.73 419.461 122.973C421.219 121.215 422.098 118.676 422.098 115.355C421.772 108.585 418.354 105.199 411.844 105.199H372.488C366.889 105.199 362.137 104.223 358.23 102.27C354.324 100.316 351.134 97.875 348.66 94.9453C346.251 92.0156 344.493 88.8581 343.387 85.4727C342.345 82.0872 341.824 78.9297 341.824 76C341.824 70.3359 342.833 65.5833 344.852 61.7422C346.87 57.8359 349.409 54.6784 352.469 52.2695C355.529 49.8607 358.849 48.1354 362.43 47.0938C366.01 45.987 369.363 45.4336 372.488 45.4336H434.891V70.8242H372.684C371.382 70.8242 370.34 70.987 369.559 71.3125C368.842 71.5729 368.289 71.9635 367.898 72.4844C367.573 72.9401 367.378 73.4609 367.312 74.0469C367.247 74.5677 367.215 75.0885 367.215 75.6094C367.28 76.651 367.475 77.4648 367.801 78.0508C368.126 78.6367 368.517 79.0599 368.973 79.3203C369.493 79.5807 370.047 79.7435 370.633 79.8086C371.284 79.8086 371.902 79.8086 372.488 79.8086H411.844C418.354 79.8086 423.888 80.9805 428.445 83.3242C433.003 85.668 436.681 88.6302 439.48 92.2109C442.28 95.7266 444.298 99.5677 445.535 103.734C446.837 107.901 447.488 111.775 447.488 115.355ZM491.141 23.7539H465.75V0.804688H491.141V23.7539ZM491.141 151H465.75V45.4336H491.141V151ZM630.398 161.156C630.398 165.518 629.845 169.424 628.738 172.875C627.632 176.391 626.167 179.451 624.344 182.055C622.521 184.724 620.405 186.97 617.996 188.793C615.587 190.681 613.048 192.211 610.379 193.383C607.775 194.555 605.105 195.401 602.371 195.922C599.702 196.508 597.163 196.801 594.754 196.801H548.953V171.41H594.754C598.204 171.41 600.776 170.531 602.469 168.773C604.161 167.016 605.008 164.477 605.008 161.156V80.9805C605.008 77.6602 604.161 75.1536 602.469 73.4609C600.776 71.7031 598.204 70.8242 594.754 70.8242H548.953C545.828 70.8242 543.354 71.8008 541.531 73.7539C539.708 75.6419 538.797 78.0508 538.797 80.9805V115.355C538.797 118.676 539.676 121.215 541.434 122.973C543.191 124.73 545.763 125.609 549.148 125.609H594.754V151H548.953C546.544 151 544.005 150.74 541.336 150.219C538.667 149.633 535.997 148.754 533.328 147.582C530.724 146.41 528.217 144.913 525.809 143.09C523.4 141.202 521.284 138.956 519.461 136.352C517.638 133.682 516.173 130.622 515.066 127.172C513.96 123.656 513.406 119.717 513.406 115.355V80.9805C513.406 78.5716 513.667 76.0326 514.188 73.3633C514.773 70.694 515.652 68.0573 516.824 65.4531C517.996 62.7839 519.493 60.2448 521.316 57.8359C523.204 55.4271 525.451 53.3112 528.055 51.4883C530.724 49.6654 533.784 48.2005 537.234 47.0938C540.685 45.987 544.591 45.4336 548.953 45.4336H594.754C597.163 45.4336 599.702 45.7266 602.371 46.3125C605.105 46.8333 607.775 47.6797 610.379 48.8516C613.048 50.0234 615.587 51.5534 617.996 53.4414C620.405 55.2643 622.521 57.5104 624.344 60.1797C626.167 62.7839 627.632 65.8112 628.738 69.2617C629.845 72.7122 630.398 76.6185 630.398 80.9805V161.156ZM770.633 151H745.242V92.4062C745.242 89.0859 744.656 86.1237 743.484 83.5195C742.378 80.8503 740.848 78.5716 738.895 76.6836C736.941 74.7956 734.63 73.3633 731.961 72.3867C729.357 71.3451 726.525 70.8242 723.465 70.8242H679.031V151H653.641V58.0312C653.641 56.2734 653.966 54.6458 654.617 53.1484C655.268 51.5859 656.18 50.2513 657.352 49.1445C658.523 47.9727 659.891 47.0612 661.453 46.4102C663.016 45.7591 664.676 45.4336 666.434 45.4336H723.66C726.85 45.4336 730.203 45.7917 733.719 46.5078C737.299 47.224 740.815 48.3958 744.266 50.0234C747.781 51.5859 751.102 53.6042 754.227 56.0781C757.417 58.487 760.216 61.4492 762.625 64.9648C765.099 68.4154 767.052 72.4193 768.484 76.9766C769.917 81.5339 770.633 86.6771 770.633 92.4062V151Z" fill="url(#paint0_linear_1001_79)" />
          <defs>
            <linearGradient id="paint0_linear_1001_79" x1="-98" y1="81" x2="867" y2="81" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00EDDF" />
              <stop offset="1" stop-color="#A281FF" />
            </linearGradient>
          </defs>
        </svg>
      </header>
      <header className="home-title-info">
        <span>组件库</span>
      </header>
      <p className='home-header-description'>一套基于 React，TypeScript 友好的高质量 UI 组件库</p>
      <div className="home-title-btn-wrap">
        <Link to="/components/button">
          <div className="home-title-btn">
            快速开始
            <Icon name="ArrowRight" size={14} color="#fff" />
          </div>
        </Link>
        <div className="home-title-btn trans" onClick={toVueVersion}>
          切换 Vue 版本
        </div>
      </div>
    </header>
  );

  const content = (
    <section className="home-content">
      {contentArr.map((item) => (
        <div className="home-content-item" key={item.value}>
          <div className="home-content-item-title">{item.title}</div>
          <div className="home-content-item-description">{item.description}</div>
        </div>
      ))}
    </section>
  )

  const display = (
    <div className="home-display">
      <section className="home-web">
        <header className="home-web-header">
          <div className="home-web-header-dots">
            <div className="home-web-header-dot"></div>
            <div className="home-web-header-dot"></div>
            <div className="home-web-header-dot"></div>
          </div>
          <Input placeholder="iDesign" clearable size="small" suffixIcon="Search" />
        </header>
        <Layout>
          <Layout.Header>
            <Menu defaultActive="b" prefixContent={prefix} suffixContent={suffix}>
              <Menu.Item value="a">菜单1</Menu.Item>
              <Menu.Item value="b">菜单2</Menu.Item>
              <Menu.Item value="c">菜单3</Menu.Item>
              <Menu.Item value="d">菜单4</Menu.Item>
            </Menu>
          </Layout.Header>
          <Layout style={{ height: 320 }}>
            <Layout.Aside width={120}>
              <Menu width="100%" direction="vertical">
                <Menu.Item>选项1</Menu.Item>
                <Menu.Group title="选项2" expandAll>
                  <Menu.Item>选项2-1</Menu.Item>
                  <Menu.Item>选项2-2</Menu.Item>
                  <Menu.Item>选项2-3</Menu.Item>
                </Menu.Group>
                <Menu.Item>选项3</Menu.Item>
                <Menu.Item>选项4</Menu.Item>
              </Menu>
            </Layout.Aside>
            <Layout className="home-web-layout-content-wrapper">
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
                      <Button size="small" type="info">
                        填充按钮
                      </Button>
                      {/* 蓝色 primary（默认） */}
                      <Button size="small" type="primary">
                        填充按钮
                      </Button>
                      <Button size="small" type="primary" variant="dashed">
                        虚框按钮
                      </Button>
                      {/* 绿色 success */}
                      <Button size="small" type="success">
                        填充按钮
                      </Button>
                      <Button size="small" type="success" variant="dashed">
                        虚框按钮
                      </Button>
                      {/* 黄色 warning */}
                      <Button size="small" type="warning">
                        填充按钮
                      </Button>
                      <Button size="small" type="warning" variant="dashed">
                        虚框按钮
                      </Button>
                      {/* 红色 error */}
                      <Button size="small" type="error">
                        填充按钮
                      </Button>
                    </div>
                    <div className="home-web-block -demo2">
                      <Radio.Group
                        size="small"
                        currentValue={currentValue}
                        onChange={handleChange}
                      >
                        <Radio value="1">选项一</Radio>
                        <Radio value="2">选项二</Radio>
                        <Radio value="3">选项三</Radio>
                      </Radio.Group>
                      <Checkbox.Group
                        size="small"
                        currentValue={currentValue2}
                        onChange={handleChange2}
                      >
                        <Checkbox value="bj">北京</Checkbox>
                        <Checkbox value="sh">上海</Checkbox>
                        <Checkbox value="gz">广州</Checkbox>
                      </Checkbox.Group>
                      <DatePicker type="range" />
                    </div>
                    <div className="home-web-block -demo3">
                      <ColorPicker defaultValue="#5674f5" />
                      <ColorPicker defaultValue="#72d4b7" />
                      <ColorPicker defaultValue="#d8eef2" />
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
  )

  const footer = (
    <footer className="home-footer">
      <div className="home-footer-left">© 2022 iDesign UI. Made with ❤ by Leophen</div>
      <div className="home-footer-center">
        <img src={logo} alt="idesign" />
        <div className="home-footer-center-title">iDesign</div>
      </div>
      <div className="home-footer-right">
        联系方式：
        <Popup content={copyText}>
          <div
            className="home-footer-right-email"
            onClick={handleCopyEmail}
            onMouseEnter={handleEnterEmail}
            onMouseLeave={handleLeaveEmail}
          >
            {myEmail}
          </div>
        </Popup>
      </div>
    </footer>
  )

  return (
    <div className="home-container">
      {header}
      {content}
      {display}
      {footer}
    </div>
  );
};

export default Home;
