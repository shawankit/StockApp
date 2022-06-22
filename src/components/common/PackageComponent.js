import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select } from "antd";
import { useState } from "react";
import PackageData from "../../data/PackageData";
import PackageItemData from "../../data/PackageItemData";

const PackageComponent = ({index, setPackageData, items , handleSearch }) => {

    const initialData = PackageData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
    initialData.itemsList = [];
    const [formData, setFormData] = useState(initialData);


    const onChange = (e) => {
        let data = {...formData,[e.target.name]: e.target.value};
        setFormData(data);
        setPackageData(index, data)
    }

    const onSelectChange = (name, value) => {
        let data = {...formData,[name]: value};
        setFormData(data);
        setPackageData(index, data);
    }

    const setItemData = (index, data) => {
        formData.itemsList[index] = data;
        setFormData({...formData});
    }

    const onAddMoreitems = () => {

        const initialData = PackageData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
        initialData.privateMark = formData.privateMark;
        formData.itemsList.push(initialData)
        setFormData({...formData});
    }

    const onRemoveMoreItems = (index) => {
        formData.itemsList.splice(index, 1)
        setFormData({...formData});
    }
    

    return (
        <>
        
        <Row>
            {
                 PackageData.map((field) => field.type == 'input'?
                    <Col span={3} className='border-4'>
                        <input 
                            placeholder={field.label}
                            type={field.inputType} 
                            name={field.name}
                            onChange={onChange}
                            key={field.name}
                            value={formData ? formData[field.name] : ''}
                            className="w-full py-2 px-2 mt-2"
                        />  
                    </Col> : 
                    <Col span={8} className='border-4 p-2'>
                        <Select 
                            className="w-full" 
                            placeholder={field.label}
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
                            >
                                { items.map((ele,index) => <Option value={ele.name} key={index}>{ele.name}</Option>) }
                        </Select>
                    </Col>  
                )
            }

            <Col span={1} className='p-2'>
                <a type="primary" onClick={() => onAddMoreitems()} className='text-lg' title="add more items to tha package">
                    <PlusSquareOutlined /> 
                </a>
            </Col>
           
        </Row>
        {
            formData.itemsList.map(
                (data, index) => <ItemComponent
                    index={index}
                    formData={data}
                    setItemData={setItemData}
                    items={items}
                    handleSearch={handleSearch}
                    onRemoveMoreItems={onRemoveMoreItems}
                />
            )
        }
        </>
    )
}

export default PackageComponent;


function ItemComponent({ index, setItemData, formData, items, handleSearch , onRemoveMoreItems}){


    const onChange = (e) => {
        let data = {...formData,[e.target.name]: e.target.value};
        setItemData(index, data)
    }

    const onSelectChange = (name, value) => {
        let data = {...formData,[name]: value};
        setItemData(index, data);
    }

    return (
        <Row>
             {  [1,2,4].map((v , index) => <Col span={3} key={index}></Col>)  }
             {
                PackageItemData.map((field) => field.type == 'input'?
                    <Col span={3} className='border-4' key={index}>
                        <input 
                            placeholder={field.label}
                            type={field.inputType} 
                            name={field.name}
                            onChange={onChange}
                            key={field.name}
                            value={formData ? formData[field.name] : ''}
                            className="w-full py-2 px-2 mt-2"
                        />  
                    </Col> : 
                    <Col span={8} className='border-4 p-2'>
                        <Select 
                            className="w-full" 
                            placeholder={field.label}
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
                            >
                                { items.map((ele,index) => <Option value={ele.name} key={index}>{ele.name}</Option>) }
                        </Select>
                    </Col>  
                )
            }

            <Col span={1} className='p-2'>
                <a type="primary" onClick={() => onRemoveMoreItems(index)} className='text-lg' title="delete items to tha package">
                    <MinusSquareOutlined /> 
                </a>
            </Col>
        </Row>
    )
}