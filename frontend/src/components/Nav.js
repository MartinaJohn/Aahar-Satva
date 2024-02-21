
import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, MessageOutlined, AppstoreOutlined, LoginOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
    href: '/',
  },
  {
    label: 'Forum',
    key: 'forum',
    icon: <MessageOutlined />,
    href: '/viewforum',
  },
  {
    label: 'Product Compliance Journey',
    key: 'journey',
    icon: <AppstoreOutlined />,
    href: '/product-dets/1',
  },
  {
    label: 'Login',
    key: 'login',
    icon: <LoginOutlined />,
    href: '/Signin',
  },
];

const menuStyle = {
   
    color: '#432818'
  };
const Navbar = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='fixed top-0 w-full z-10 '>
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"  style={menuStyle} className='pt-4 pr-10 justify-end space-x-10 bg-[#FFF8EB] '>
      {items.map(item => (
        <Menu.Item key={item.key} icon={item.icon}>
          <a href={item.href}>{item.label}</a>
        </Menu.Item>
      ))}
    </Menu>
    </div>
  );
};

export default Navbar;