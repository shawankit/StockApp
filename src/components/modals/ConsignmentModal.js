import React, { useEffect, useState } from 'react';
import { Modal, Button, Row } from 'antd';
import FieldData from '../../data/FieldData';
import InputField from '../common/InputField';
import { createConsignment, getAllItems, getAllSuppliers, getAllTransporters, updateConsignment } from '../../api'; 
import SelectField from '../common/SelectField';

const ConsignmentModal = ({ visible , setVisible , data, fetchConsignments}) => {

    const initialData = FieldData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
    const [formData, setFormData] = useState(initialData);
    const [items, setItems] = useState([]);
    const [fitems, setFItems] = useState([]);

    const [suppliers, setSuppliers] = useState([]);
    const [fsuppliers, setFSuppliers] = useState([]);

    const [transporters, setTransporters] = useState([]);
    const [ftransporters, setFTransporters] = useState([]);
    
    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    useEffect(() => {
        setFormData(data);
        fetchItems();
    },[data])

    const onSubmit = async (close) => {
        console.log(formData);
    
        if(data) {
            let response = await updateConsignment(data.id,formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Success", "Succesfully updated consignments details");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        else{
            let response = await createConsignment(formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Success" , "Succesfully added consignments details");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        

        if(close) setVisible(false);

        await fetchConsignments();
    }

    const fetchItems = async () => {
        const response = await getAllItems();

        const items = response?.data?.entity;
        setItems(items);
        setFItems(items);

        const responses = await getAllSuppliers();

        const suppliers = responses?.data?.entity;
        setSuppliers(suppliers);
        setFSuppliers(suppliers);

        const trresponses = await getAllTransporters();

        const transporters = trresponses?.data?.entity;
        setTransporters(transporters);
        setFTransporters(transporters);
    }

    

    const onSelectChange = (name, value) => {
        setFormData({...formData,[name]: value});
    }

    const handleSearch = (field, value) => {
        if (value) {
            eval(`set${field.label}s`)([...eval(`f${field.list}`),{ name: value }]);
        }
        else {
            eval(`set${field.label}s`)(eval(`f${field.list}`));
        }
    }

    return (
        <>
        <Modal
            title={`${data ? 'Edit' : 'Add'} Consignment`}
            visible={visible}
            width={"85%"}
            style={{ top: 75 }}
            onCancel={() => setVisible(false)}
            footer={[
            <Button key="cancel" onClick={() => setVisible(false)}>
                Cancel
            </Button>,
            <Button key="save" type="primary" onClick={() => onSubmit()}>
                Save
            </Button>,
            <Button key="savclose" type="primary" onClick={() => onSubmit(true)}>
                Save and Close
            </Button>,
            ]}
        >
            <div>
                <Row>
                    { 
                        FieldData.map((field) => field.type == 'input' ?
                                <InputField 
                                    label={field.label}
                                    type={field.inputType} 
                                    name={field.name}
                                    onChange={onChange}
                                    key={field.name}
                                    value={formData ? formData[field.name] : ''}
                                /> : 
                                <SelectField
                                    label={field.label}
                                    option={eval(field.list).map((item) => ({ value: item.name, text: item.name}))}
                                    showSearch
                                    optionFilterProp="children"
                                    value={formData ? formData[field.name] : ''}
                                    showArrow={false}
                                    onSearch={(value) => handleSearch(field,value)}
                                    onChange={(value) => onSelectChange(field.name, value)}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    key={field.name}
                                />
                        )
                    }     
                </Row>
            </div>
                   
        </Modal>
        </>
    );
};

export default ConsignmentModal;