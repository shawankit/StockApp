import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar, Row, Col } from 'antd';
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

  return (
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
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item icon={<FundOutlined />}  key={'Consignments'}>
                <Link to="/#consignments">Consignments</Link>
              </Menu.Item>
              <Menu.Item icon={<MoneyCollectOutlined />}  key={'Godowns'}>
                <Link to="/#godowns">Godowns</Link>
              </Menu.Item>
              <Menu.Item icon={<BulbOutlined />}  key={'Items'}>
                <Link to="/">Items</Link>
              </Menu.Item>
            </Menu>
            </div>
      </Col>
      
    </Row>
  );
};

export default Navbar;
