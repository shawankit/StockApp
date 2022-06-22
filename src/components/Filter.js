import { CopyOutlined, DeleteOutlined, EditOutlined, HeatMapOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Select, Table, Typography, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { filterConsignments, getFilterMetaData } from "../api";
const { Title } = Typography;
const { RangePicker } = DatePicker;
const Filter = ({ filterCallback, fetchConsignments }) => {

    const [filter, setFilter] = useState({
        consignments: [],
        items: [],
        suppliers: [],
        transporters: [],
        privateMarks: [],
        godowns: []
    });

    const [selectedFilter, setSelectedFilter] = useState({
        consignmentNo: [],
        transporter: [],
        supplier:[],
        item:[],
        privateMark: [],
        fromDate: null,
        toDate: null,
        month: null
    })

    useEffect(async () => {
        const filter = await getFilterMetaData();

        setFilter(filter?.data?.entity);
    }, []);

    const handleChange = (value, name) => {
        setSelectedFilter({...selectedFilter, [name]: value})
    }

    const onRangeChange = (value) => {
        setSelectedFilter({...selectedFilter, fromDate: value[0], toDate: value[1]})
    }

    const onMonthChange = (value) => {
        setSelectedFilter({...selectedFilter, month: value})
    }

    const applyFilter = async () => {
        const { fromDate, toDate, month } = selectedFilter;
        const filterBody = { 
            ...selectedFilter,
            fromDate: fromDate ? fromDate.toDate(): null,
            toDate: toDate ? toDate.toDate(): null,
            month: month ? month.toDate(): null,
        }
        const filterResponse = await filterConsignments(filterBody);
        filterCallback(filterResponse)
    }

    const resetFilter = async () => {
        setSelectedFilter({
            consignmentNo: [],
            transporter: [],
            supplier:[],
            item:[],
            privateMark: [],
            fromDate: null,
            toDate: null,
            month: null
        })
        await fetchConsignments();
    }

    const getOptions = (list) => list.map((option, index) => <Option key={index} value={option.value}>{option.value}</Option>);

    const filterConfig = [
        {
            label: 'Consigments No.',
            list: 'consignments',
            name: 'consignmentNo'
        },
        {
            label: 'Private Mark',
            list: 'privateMarks',
            name: 'privateMark'
        },
        {
            label: 'Item',
            list: 'items',
            name: 'item'
        },
        {
            label: 'Supplier',
            list: 'suppliers',
            name: 'supplier'
        },
        {
            label: 'Transporter',
            list: 'transporters',
            name: 'transporter'
        },
        {
            label: 'Godowns',
            list: 'godowns',
            name: 'godown'
        }
    ]

    return (
        <div className="border-2 p-5">
            <Title level={4} className="heading" id='mainheader'>Advanced Filter</Title>
            <Row>
                {
                    filterConfig.map((config) =>
                        <Col span={4} className='mr-4'>
                            <label>{config.label}</label>
                            <Select 
                                mode="multiple"
                                allowClear
                                style={{ width: '100%'}}
                                placeholder="Please select "
                                onChange={(value) => handleChange(value, config.name)}
                                value={selectedFilter[config.name]}
                            >
                                { getOptions(filter[config.list]) }
                            </Select>
                        </Col>  
                    )
                        
                }
               

                <Col span={4} className='mr-4'>
                    <label>Date Range</label>
                    <RangePicker
                        dateRender={(current) => {
                            const style = {};

                            if (current.date() === 1) {
                                style.border = '1px solid #1890ff';
                                style.borderRadius = '50%';
                            }

                            return (
                                <div className="ant-picker-cell-inner" style={style}>
                                    {current.date()}
                                </div>
                            );
                        }}
                        onChange={onRangeChange}
                        value= { [selectedFilter.fromDate , selectedFilter.toDate ]} 
                        />
                </Col>

                <Col span={4} className='mr-4'>
                    <label>Month</label><br></br>
                    <DatePicker picker="month"  onChange={onMonthChange} value={ selectedFilter.month }/>
                </Col>

                <Col span={4} className='mr-4'>
                    <div className="mt-5">
                        <Button type="primary" className="mr-3" onClick={() => applyFilter()}>
                            Apply Filter
                        </Button>
                        <Button key="cancel" onClick={() => resetFilter(false)}>
                            Reset Filter
                        </Button>   
                    </div>
                    
                     
                </Col>
            </Row>
        </div>
    )
}

export default Filter;
