import React, { useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import banner from './assets/banner.png';
import fast from './assets/fast.svg';
import customizable from './assets/customizable.svg';
import atomic from './assets/atomic.svg';
import fluent from './assets/fluent.svg';
import logo from './assets/logo.svg';

const contentArr = [
  {
    icon: fast,
    title: '高性能',
    value: 'high_performance',
    description: '为严苛场景精心优化，无需配置，即可拥有最佳的包体积大小和极致的性能。',
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
    title: '流畅',
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
  return (
    <div className="home-container">
      <header className="home-banner">
        <div className="home-banner-left">
          <h1>iDesign</h1>
          <p>一套基于 React 的高质量 UI 组件库</p>
          <div className="home-banner-btn-wrap">
            <Link to="/components">
              <div className="home-banner-btn">开始使用</div>
            </Link>
            <div className="home-banner-btn trans" onClick={toVueVersion}>
              切换 Vue3 版本
            </div>
          </div>
        </div>
        <div className="home-banner-right">
          <img src={banner} alt="banner" />
        </div>
      </header>

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
