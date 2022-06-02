import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Button } from 'antd';
import { Link } from 'react-router-dom';

import { getAllConsigment, getAllStats, getAllConsigmentWithFilter } from '../api/index.js';
import Consigments from './Consignments.js';
import Godowns from './Godowns.js';
import Items from './Items.js';
import Suppliers from './Suppliers.js';
import InputField from './common/InputField.js';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Homepage = () => {

  const [consigments, setConsignments] = useState([]);
  const [globalStats, setStats] = useState({
      itemCount: 0,
      consignmentCount: 0,
      packageCount: 0,
      supplierCount: 0,
      godownCount: 0
  });
  useEffect(() => {
    fetchConsignments();
  },[]);

  const fetchConsignments = async () => {
    const sValue = document.getElementById('searchByConNo').value;

    const response = await getAllConsigment(sValue);
    
    setConsignments(response?.data?.entity);

    const statsResponse = await getAllStats();
    console.log(statsResponse)
    setStats(statsResponse?.data?.entity);
  }

  const getFilterValue = async (value) => {
    await fetchConsignments();
  }

  const handleKeyPress = async (event) => {
    if(event.key === 'Enter'){
      await fetchConsignments();
    }
  }


  return (
    <>
      <Title level={2} className="heading">Stock Management Stats</Title>
      <Row gutter={[32, 32]}>
            <Col span={12}><Statistic title="Total Consigments" value={globalStats?.consignmentCount ? globalStats.consignmentCount : 0 }/></Col>
            <Col span={12}><Statistic title="Total Packages" value={millify(globalStats?.packageCount ? globalStats.packageCount : 0)}/></Col>
            <Col span={12}><Statistic title="Total Items" value={millify(globalStats?.itemCount? globalStats.itemCount : 0)}/></Col>
            <Col span={12}><Statistic title="Total Godowns" value={millify(globalStats?.godownCount ? globalStats.godownCount : 0)}/></Col>
            <Col span={12}><Statistic title="Total Suppliers" value={millify(globalStats?.supplierCount ? globalStats.supplierCount : 0)}/></Col>
      </Row>
      
      <Row>
        <InputField
              label={'Search'}
              placeholder={'consignment no, transporter, supplier, item, bill no, mr no,godown'}
              type="text"
              name="searchByConNo"
              id="searchByConNo"
              onKeyPress={handleKeyPress}
              icol={10}
          />
          <Col span={4}>
                <Button type="primary" className='mt-3 ml-4' onClick={(event) => getFilterValue(event.target.value)} title="Search" >
                    <SearchOutlined /> Search
                </Button>
          </Col>
      </Row>
      <div id='consignments'>
        <Consigments consigments={ consigments } fetchConsignments={fetchConsignments}/>
      </div>
      
      <div id='godowns'>
        <Godowns refresh={fetchConsignments} />
      </div>
      <div id='items'>
        <Items refresh={fetchConsignments} />
      </div>
      <div id='suppliers'>
        <Suppliers refresh={fetchConsignments} />
      </div>
    </>
  );
};

export default Homepage;
