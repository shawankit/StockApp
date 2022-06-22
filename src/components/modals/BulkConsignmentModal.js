import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Typography, Col } from 'antd';
import BulkFieldData from '../../data/BulkFieldData';
import InputField from '../common/InputField';
import { createBulkConsignment, createConsignment, getAllGodowns, getAllItems, getAllSuppliers, getAllTransporters, updateConsignment } from '../../api'; 
import SelectField from '../common/SelectField';
import PackageComponent from '../common/PackageComponent';
import PackageData from '../../data/PackageData';
const { Title } = Typography;

const BulkConsignmentModal = ({ visible , setVisible ,data, fetchConsignments}) => {

    const initialData = BulkFieldData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
    const [formData, setFormData] = useState(initialData);
    const [packageList, setPackageList] = useState([]);
    const [items, setItems] = useState([]);
    const [fitems, setFItems] = useState([]);

    const [suppliers, setSuppliers] = useState([]);
    const [fsuppliers, setFSuppliers] = useState([]);

    const [transporters, setTransporters] = useState([]);
    const [ftransporters, setFTransporters] = useState([]);

    const [godowns, setGodowns] = useState([]);
    const [fgodowns, setFGodowns] = useState([]);
    
    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    useEffect(() => {
        setFormData(initialData);
        setPackageList([]);
        fetchItems();
    },[])

    const onClose = () => {
        setVisible(false);
        setFormData(initialData);
        setPackageList([]);
    }

    const onSubmit = async (close) => {
        console.log(formData);
        console.log(packageList)

        if(packageList.length == 0){
            swal("Atleast 1 pacakge is needed", "validation");
            return;
        }
    
        formData.packageList = packageList;
        let response = await createBulkConsignment(formData);
        console.log(response);
        if(response?.data?.status == true){
            swal("Success" , "Succesfully added all consignments details");
        }
        else{
            swal("OOPS Something Went wrong", "error");
        }
        

        if(close) { 
            onClose();
        }

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

        const godownResponse = await getAllGodowns();
        setGodowns(godownResponse?.data?.entity);
        setFGodowns(godownResponse?.data?.entity);
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

    const setPackageData = (index, data) => {
        packageList[index] = data;
        setPackageList(packageList);
    }

    const renderPackages = () => {

        const renderList = [];


        if(formData?.numberOfPackage && formData?.numberOfPackage !== ''){
            const count = parseInt(formData.numberOfPackage)

            if(count > 100 )  { 
                swal('Maximum 100 Packages allowed to insert in bulk', 'validation');
                setFormData({...formData, numberOfPackage: count})
            }
            for(let i = 0 ; i < count && i < 100; i++){
                renderList.push(
                    <PackageComponent items={items} key={i} index={i} setPackageData={setPackageData} handleSearch={handleSearch}/>
                )
            }
            
        } 
       
        

        return renderList;
    }

    return (
        <>
        <Modal
            title={`${data ? 'Edit' : 'Add'} Bulk Consignment`}
            visible={visible}
            width={"85%"}
            style={{ top: 20 }}
            onCancel={() => onClose()}
            footer={[
            <Button key="cancel" onClick={() => onClose()}>
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
                        BulkFieldData.map((field) => field.type == 'input' ?
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

            <div id='packageDiv' className='ml-24'>
                <Title level={3} className="home-title">Packages</Title>
                <div>
                <Row>
                    {
                        PackageData.map((field,index) =>
                        <Col span={field.name === 'item'? 8 : 3} key={index} className='border-4'>
                            <h3 className='px-2 pt-2 text-lg font-bold'>{field.label}</h3>
                        </Col>)
                    }
                
                </Row>
                { renderPackages() }
                </div>
               
            </div>
                   
        </Modal>
        </>
    );
};

export default BulkConsignmentModal;