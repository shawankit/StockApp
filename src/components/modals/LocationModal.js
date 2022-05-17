import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import { getAllGodowns, changeConsignmentLocation, getConsignment } from '../../api'; 
import moment from 'moment';
import swal from 'sweetalert';


const LocationModal = ({ visible , setVisible , data, consigmentData, fetchConsignments}) => {

    const initialData = {
        consignmentId: '',
        consignmentNo : '',
        godownId: '',
        godownValue: '',
        date: moment().format("YYYY-MM-DDThh:mm")
    };

    const [formData, setFormData] = useState(initialData);
    const [godowns,setGodowns] = useState([]);
    const [consigment,setConsigment] = useState(consigmentData);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const onSelect = (value) => {
        setFormData({...formData,godownId: value});
    }

    const getGodowns = async () => {
        const list = await getAllGodowns();
        setGodowns(list?.data?.entity);
    }

    useEffect(() => {
        getGodowns();
        if(data){
            setFormData(data);
        }
    },[data]);

    useEffect(() => {
        setConsigment(consigmentData);
    },[consigmentData]);

    const addLocation = async() => {
        //console.log('change',consigmentData, formData);
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to update the location ?",
            icon: "warning",
            dangerMode: true,
          });
           
          if (willDelete) {
            const { godownId, date } = formData;
            const response = await changeConsignmentLocation(consigmentData.id,{ godownId, date});
            console.log(response);

            if(response?.data?.status == true){
                swal("Succesfully updated consignment location", "success");

                const fetched = await getConsignment(consigmentData.id);
            
                console.log(fetched);

                setFormData({...formData,godownId: ''});

                setConsigment(fetched.data.entity);

                await fetchConsignments()
            }
          }
    }

    const columns = [
        {
            title:  ( 
                <Typography.Text ellipsis={true} title={'Godown/Location'}>
                    {'Godown/Location'}
                </Typography.Text>
            ),
            dataIndex: 'location',
            key: 'location',
            width: '150px'
        },
        {
            title:  ( 
                <Typography.Text ellipsis={true} title={'Date-Time'}>
                    {'Date'}
                </Typography.Text>
            ),
            dataIndex: 'date',
            key: 'date',
            width: '150px'
        }
    ]

    let location = null
    if(consigment?.godowns.length > 0){
        location = consigment.godowns.map((value) => ({location: value.name, date: value.ConsigmentLocation.createdAt}));
        location.sort((a,b) => {
            return moment(b.date) - moment(a.date);
        });
        location = location.map((value) => ({...value, date: moment(value.date).format("DD MMM YYYY, hh:mm A")}))
    }


    return (
        <>
        <Modal
            title={`Track Consignment`}
            visible={visible}
            width={"45%"}
            style={{ top: 75 }}
            onCancel={() => setVisible(false)}
            footer={[
            <Button key="cancel" onClick={() => setVisible(false)}>
                Close
            </Button>
            ]}
        >
            <div>
                <Row>
                    <SelectField 
                        label={"Godown"}
                        name={"location"}
                        onChange={onSelect}
                        option={godowns.map((godown) => ({ value: godown.id, text: godown.name}))}
                        value={formData.godownId}
                    />
                    {/*<InputField
                        label={"Date"}
                        type={'datetime-local'} 
                        name={'date'}
                        onChange={onChange}
                        value={formData.date}
                        style={{display: 'none'}}
                    />*/}
                     <Col span={12} className="pb-3">
                        <Button className='float-right mt-4' type="primary" onClick={() => addLocation()}> Update Current Location</Button>
                    </Col>
                </Row>
               
                <Row>
                    <Col span={24}>
                        <Table columns={columns} dataSource={location}/>
                    </Col>
                </Row>
            </div>
                   
        </Modal>
        </>
    );
};

export default LocationModal;