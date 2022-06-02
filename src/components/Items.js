import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import { deleteItem, getAllItems } from "../api";
import ItemData from "../data/ItemData";
import ItemModal from "./modals/ItemModal";
const { Title } = Typography;
const Items = ({ }) => {

    const [items, setItems] = useState(null);
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchItems = async () => {
        const response = await getAllItems();
        setItems(response?.data?.entity);
    }

    useEffect(() => {
        fetchItems();
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
            await deleteItem(data.id);
            fetchItems();
            refresh();
        } 
    }

    const fieldData = ItemData;
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
                <Title level={2} className="home-title">Items</Title>
                <Title level={3} className="show-more"><Button onClick={() => onAdd()}><PlusSquareOutlined />Add Item</Button></Title>
            </div>
            <Row className="w-full">
                <Col span={24}>
                    <Table
                        dataSource={items}
                        columns={columns}
                        bordered
                        pagination={ {pageSize: 10}}
                    />
                </Col>
            </Row> 
            <ItemModal visible={visible} setVisible={setVisible} data={editData} callback={fetchItems}/>       
        </>
    );
}

export default Items;

