import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import { createSupplier, updateSupplier } from '../../api'; 
import moment from 'moment';
import swal from 'sweetalert';
import SupplierData from '../../data/SupplierData';


const SupplierModal = ({ visible , setVisible , data , callback}) => {

    const initialData = SupplierData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
    const [formData, setFormData] = useState(initialData);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    useEffect(() => {
        setFormData(data);
    },[data])

    const onSubmit = async (close) => {
        console.log(formData);
    
        if(data) {
            let response = await updateSupplier(data.id,formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully updated supplier details", "success");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        else{
            let response = await createSupplier(formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully added supplier details", "success");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        

        if(close) setVisible(false);

        await callback();
    }

    return (
        <>
        <Modal
            title={`${data ? 'Edit' : 'Add'} Supplier`}
            visible={visible}
            width={"50%"}
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
                        SupplierData.map((field) =>
                            <InputField 
                                label={field.label}
                                type={field.inputType} 
                                name={field.name}
                                onChange={onChange}
                                key={field.name}
                                value={formData ? formData[field.name] : ''}
                                lcol = {6}
                                icol = {18}
                            />
                        )
                    }     
                </Row>
            </div>
                   
        </Modal>
        </>
    );
};

export default SupplierModal;