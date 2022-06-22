import { Col, Row, Select } from "antd";
import { useState } from "react";
import PackageData from "../../data/PackageData";

const PackageComponent = ({index, setPackageData, items , handleSearch }) => {

    const initialData = PackageData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
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
    

    return (
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
           
        </Row>
    )
}

export default PackageComponent;