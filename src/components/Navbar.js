import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar, Row, Col, Affix } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const linkClick = (id) => {
    var divElement = document.getElementById(id);
    window.scroll({
      top: divElement.offsetTop - 100//divElement.offsetHeight,//scroll to the bottom of the element
      //behavior: 'smooth' //auto, smooth, initial, inherit
    });
  }

  return (
    <Affix offsetTop={0} id=''>
        <Row className='bg-regal-blue p-2 pb-0'>
          <Col span={3}>
            <div className='flex w-full items-center'>
              <Avatar src={icon} size="large" />
              <Typography.Title level={1} className="ml-2 mt-2"><Link to="/">SMA</Link></Typography.Title>
              <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            
          </Col>    
          <Col span={21}>
          <div className='w-full bg-regal-blue'>
            <Menu theme="dark" mode="horizontal" >
              <Menu.Item icon={<HomeOutlined />} key={'home'}>
                <Link to="/" onClick={() => linkClick('mainheader')}>Home</Link>
              </Menu.Item>
              <Menu.Item icon={<FundOutlined />}  key={'Consignments'}>
                <Link to="/#consignments" onClick={() => linkClick('consignments')}>Consignments</Link>
              </Menu.Item>
              <Menu.Item icon={<MoneyCollectOutlined />}  key={'Godowns'}>
                <Link to="/#godowns" onClick={() => linkClick('godowns')}>Godowns</Link>
              </Menu.Item>
              <Menu.Item icon={<BulbOutlined />}  key={'Items'}>
                <Link to="/#items" onClick={() => linkClick('items')}>Items</Link>
              </Menu.Item>
            </Menu>
            </div>
      </Col>
      
    </Row>
    </Affix>
  );
};

export default Navbar;
