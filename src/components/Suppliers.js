import { DeleteOutlined, EditOutlined, HeatMapOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import { deleteSupplier, getAllSuppliers } from "../api";
import SupplierData from "../data/SupplierData";
import SupplierModal from "./modals/SupplierModal";
const { Title } = Typography;
const Suppliers = ({ refresh }) => {

    const [suppliers, setSuppliers] = useState(null);
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchSuppliers = async () => {
        const response = await getAllSuppliers();
        setSuppliers(response?.data?.entity);
    }

    useEffect(() => {
        fetchSuppliers();
    },[]);


    const onEdit = (data) => {
        setEditData({...data})
        setVisible(true);
    }

    const onAdd = () => {
        setEditData(null)
        setVisible(true);
    }

    const  onDelete = async (data) => {
        const isConfirm = confirm('Are you sure you want to delete ?')
        if(isConfirm){
            await deleteSupplier(data.id);
            fetchSuppliers();
            refresh();
        } 
    }

    const fieldData = SupplierData;
    const columns = fieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
                {column.label}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '150px'
    }));

    columns.push({
        title: 'Action',
        key: 'operation',
        width: 10,
        render: (data) => {
            return (
                <div className="float-right">
                    <Button key={'edit'+data.id} type="primary" onClick={() => onEdit(data)} title="Edit">
                        <EditOutlined />
                    </Button>
                    
                    <Button key={'delete'+data.id} type="secondary" onClick={() => onDelete(data)} className="ml-2" title="Delete">
                        <DeleteOutlined />
                    </Button>
                </div>
            );
        },
    });

    return (
        <>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Suppliers</Title>
                <Title level={3} className="show-more"><Button onClick={() => onAdd()}><PlusSquareOutlined />Add Suppliers</Button></Title>
            </div>
            <Row className="w-full">
                <Col span={24}>
                    <Table
                        dataSource={suppliers} 
                        columns={columns}
                        bordered
                        pagination={ {pageSize: 10}}
                        rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                    />
                </Col>
            </Row> 
            <SupplierModal visible={visible} setVisible={setVisible} data={editData} callback={fetchSuppliers}/>       
        </>
    );
}

export default Suppliers;

