import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Button } from 'antd';
import { Link } from 'react-router-dom';

import { getAllConsigment, getAllStats } from '../api/index.js';
import Consigments from './Consignments.js';
import Godowns from './Godowns.js';

const { Title } = Typography;

const Homepage = () => {

  const [consigments, setConsignments] = useState([]);
  const [globalStats, setStats] = useState({
      itemCount: 0,
      consignmentCount: 0,
      packageCount: 0,
      godownCount: 0
  });
  useEffect(() => {
    fetchConsignments();
  },[]);

  const fetchConsignments = async () => {
    const response = await getAllConsigment();
    setConsignments(response?.data?.entity);

    const statsResponse = await getAllStats();
    console.log(statsResponse)
    setStats(statsResponse?.data?.entity);
  }

  

  return (
    <>
      <Title level={2} className="heading">Stock Management Stats</Title>
      <Row gutter={[32, 32]}>
            <Col span={12}><Statistic title="Total Consigments" value={globalStats.consignmentCount ? globalStats.consignmentCount : 0 }/></Col>
            <Col span={12}><Statistic title="Total Packages" value={millify(globalStats.packageCount ? globalStats.packageCount : 0)}/></Col>
            <Col span={12}><Statistic title="Total Items" value={millify(globalStats.itemCount? globalStats.itemCount : 0)}/></Col>
            <Col span={12}><Statistic title="Total Godowns" value={millify(globalStats.godownCount ? globalStats.godownCount : 0)}/></Col>
      </Row>
      
      
      <div id='consignments'>
        <Consigments consigments={ consigments } fetchConsignments={fetchConsignments}/>
      </div>
      
      <div id='godowns'>
        <Godowns />
      </div>
    </>
  );
};

export default Homepage;
