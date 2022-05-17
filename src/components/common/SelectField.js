import { Col, Row, Select } from "antd";
const { Option } = Select;

const SelectField = ({label, option, selected, ...property}) => {
    return (
        <>
                <Col span={4} className="mb-3">
                    <label className="block font-semibold mt-5 text-right mr-10">{label}</label>
                </Col>
                <Col span={8} className="mb-3">
                    <div className="mt-5">
                        <Select className="w-full" placeholder={label} {...property}>
                            { option.map((ele,index) => <Option value={ele.value} key={index}>{ele.text}</Option>) }
                        </Select>
                    </div>
                </Col> 
        </>
    )
}

export default SelectField