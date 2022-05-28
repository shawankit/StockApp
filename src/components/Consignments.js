import { CopyOutlined, DeleteOutlined, EditOutlined, HeatMapOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Table, Typography } from "antd";
import { useState } from "react";
import FieldData from '../data/FieldData';
import ConsignmentModal from './modals/ConsignmentModal';
import LocationModal from "./modals/LocationModal";
import { createConsignment, deleteConsignment } from "../api";
const { Title } = Typography;
const Consigments = ({ consigments , fetchConsignments}) => {

    const [visibleCM, setVisibleCM] = useState(false);
    const [editData, setEditData] = useState(null);
    const [actionColumn,SetActionCol] = useState(true);
    const [visibleLM, setVisibleLM] = useState(false);
    const [editLData, setLEditData] = useState(null);

    const onEdit = (data) => {
        setEditData({...data})
        setVisibleCM(true);
    }

    const onAdd = () => {
        setEditData(null)
        setVisibleCM(true);
    }

    const  onDelete = async (data) => {
        const isConfirm = confirm('Are you sure you want to delete ?')
        if(isConfirm){
            await deleteConsignment(data.id);
            await fetchConsignments();
        } 
    }

    const onCopy = async(data) => {
        let response = await createConsignment(data);
        console.log(response);
        if(response?.data?.status == true){
            swal("Success" , "Succesfully copied and created the consignment");
        }
        else{
            swal("OOPS Something Went wrong", "error");
        }

        await fetchConsignments();
    }

    const onChangeLocation = (data) => {
        setEditData({...data})
        setLEditData(null)
        setVisibleLM(true);
    }

    const uniqueMap = consigments && consigments.length > 0 ? consigments.reduce((previous, current) => {
            for(let key in current){
                if(!previous[key]){
                    previous[key] = new Set();
                }
                previous[key].add(current[key]);
            }

            return previous;
    },{}) : {};

    const columns = FieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={column.label == 'Consignment Number'? false : true} title={column.label}>
                {column.label}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name + (new Date().getTime() + Math.random() * 10000),
        width: '150px',
        filters: uniqueMap[column.name] ? Array.from(uniqueMap[column.name]).map((value) => ({ text: value, value: value})) : [],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record[column.name] ? record[column.name].startsWith(value) : false,
    }));

    if(actionColumn){
        const actionCol = {
            title: 'Action',
            key: 'operation'  + (new Date().getTime() + Math.random() * 10000),
            fixed: 'right',
            width: 250,
            render: (data) => {
                return (
                    <>
                        <Button key={'edit'+data.id} type="primary" onClick={() => onEdit(data)} title="Edit">
                            <EditOutlined />
                        </Button>
                        
                        <Button key={'delete'+data.id} type="secondary" onClick={() => onDelete(data)} className="ml-2" title="Delete">
                            <DeleteOutlined />
                        </Button>
    
                        <Button key={'location'+data.id} type="secondary" onClick={() => onChangeLocation(data)} className="ml-2" title="Delete">
                            <HeatMapOutlined />
                        </Button>

                        <Button key={'copy'+data.id} type="dashed" onClick={() => onCopy(data)} className="ml-2" title="Copy">
                            <CopyOutlined />
                        </Button>
                        
                    </>
                );
            },
        };
    
        columns.push(actionCol);
    }
   

    return (
        <>
         <div className="home-heading-container">
            <Title level={2} className="home-title">Consignments</Title>
           
            <Title level={3} className="show-more">
                <a className="text-sm mr-4" onClick={() => SetActionCol(!actionColumn)}>Action</a>
                <Button onClick={() => onAdd()}><PlusSquareOutlined />Add Consigments</Button>
            </Title>
        </div>
        <Row className="w-full">
            <Col span={24}>
                <Table
                    dataSource={consigments.map((con,index) => ({ ...con,key: index + (new Date().getTime() + Math.random() * 10000)})) } 
                    columns={columns}
                    bordered
                    scroll={{ x: 1600 }}
                    pagination={ {pageSize: 10}}
                    rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                />
            </Col>
        </Row>
        <ConsignmentModal visible={visibleCM} setVisible={setVisibleCM} data={editData} fetchConsignments={fetchConsignments} />
        <LocationModal visible={visibleLM} setVisible={setVisibleLM} data={editLData} consigmentData = {editData} fetchConsignments={fetchConsignments}/>
        </>
    )
}

export default Consigments;