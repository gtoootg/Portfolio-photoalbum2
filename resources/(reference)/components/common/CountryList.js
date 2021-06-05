import React, {useState}from 'react';
import {FormGroup, Label, Input, Form } from 'reactstrap';
import Select from 'react-select';

function CountryList(){

const [selectedRegion, setSelectedRegion] = useState();

const countryList ={
    Japan:[{value:'Kyoto', label:'Kyoto'},{value:'TOkyo', label:'Tokyo'}],
    Asia:[{value:'Japan', label:'Japan'},{value:'Korea', label:'Korea'}],
    Europe:[ {value:'Germany', label:'Germany'},{value:'France', label:'France'}],
    America:[ {value:'USA', label:'USA'},{value:'Canada', label:'Canada'}],
    Africa:[ {value:'Morocco', label:'Morocco'},{value:'South-Africa', label:'South-Africa'}]
}


return (
    <div className="container">

    <Form>
        <FormGroup>
        <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect"
                onChange={(e)=>setSelectedRegion(e.target.value)}
            >
            <option>Select Region</option>
            <option>Japan</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>America</option>
            <option>Africa</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Select options={countryList[selectedRegion]}/>
        </FormGroup>
    </Form>
    </div>
);
}

export default CountryList;


