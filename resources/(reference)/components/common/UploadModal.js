import React, { useState,useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form } from 'reactstrap';
import axios from 'axios';
import {ModalStateContext} from '../Top'

const UploadModal = (props) => {
  const {
    buttonLabel,
    className,
  } = props;


const [modal, setModal] = useContext(ModalStateContext);

const [uploadData, setUploadData] = useState({
  region:"",
  country:"", 
  place:"",
  image:""
});

const [selectedRegion, setSelectedRegion] = useState("Null");

const toggle = () => setModal(!modal);


const countries ={
  Null:['Select Region'],
  Africa:['Algeria' , 'Angola' , 'Benin' , 'Botswana' , 'British Indian Ocean Territory' , 'Burkina Faso' , 'Burundi' , 'Cabo Verde' , 'Cameroon' , 'Central African Republic' , 'Chad' , 'Comoros' , 'Congo' , 'Côte d’Ivoire' , 'Democratic Republic of the Congo' , 'Djibouti' , 'Egypt' , 'Equatorial Guinea' , 'Eritrea' , 'Eswatini' , 'Ethiopia' , 'French Southern Territories' , 'Gabon' , 'Gambia' , 'Ghana' , 'Guinea' , 'Guinea-Bissau' , 'Kenya' , 'Lesotho' , 'Liberia' , 'Libya' , 'Madagascar' , 'Malawi' , 'Mali' , 'Mauritania' , 'Mauritius' , 'Mayotte' , 'Morocco' , 'Mozambique' , 'Namibia' , 'Niger' , 'Nigeria' , 'Réunion' , 'Rwanda' , 'Saint Helena' , 'Sao Tome and Principe' , 'Senegal' , 'Seychelles' , 'Sierra Leone' , 'Somalia' , 'South Africa' , 'South Sudan' , 'Sudan' , 'Togo' , 'Tunisia' , 'Uganda' , 'United Republic of Tanzania' , 'Western Sahara' , 'Zambia' , 'Zimbabwe'
],
  Asia:['Afghanistan' , 'Armenia' , 'Azerbaijan' , 'Bahrain' , 'Bangladesh' , 'Bhutan' , 'Brunei Darussalam' , 'Cambodia' , 'China' , 'China, Hong Kong Special Administrative Region' , 'China, Macao Special Administrative Region' , 'Cyprus' , 'North Korea' , 'Georgia' , 'India' , 'Indonesia' , 'Iran' , 'Iraq' , 'Israel' , 'Japan' , 'Jordan' , 'Kazakhstan' , 'Kuwait' , 'Kyrgyzstan' , 'Laos' , 'Lebanon' , 'Malaysia' , 'Maldives' , 'Mongolia' , 'Myanmar' , 'Nepal' , 'Oman' , 'Pakistan' , 'Philippines' , 'Qatar' , 'Republic of Korea' , 'Saudi Arabia' , 'Singapore' , 'Sri Lanka' , 'State of Palestine' , 'Syrian Arab Republic' , 'Tajikistan' , 'Thailand' , 'Timor-Leste' , 'Turkey' , 'Turkmenistan' , 'United Arab Emirates' , 'Uzbekistan' , 'Viet Nam' , 'Yemen'
],
  Europe:['Åland Islands' , 'Albania' , 'Andorra' , 'Austria' , 'Belarus' , 'Belgium' , 'Bosnia and Herzegovina' , 'Bulgaria' , 'Croatia' , 'Czechia' , 'Denmark' , 'Estonia' , 'Faroe Islands' , 'Finland' , 'France' , 'Germany' , 'Gibraltar' , 'Greece' , 'Guernsey' , 'Holy See' , 'Hungary' , 'Iceland' , 'Ireland' , 'Isle of Man' , 'Italy' , 'Jersey' , 'Latvia' , 'Liechtenstein' , 'Lithuania' , 'Luxembourg' , 'Malta' , 'Monaco' , 'Montenegro' , 'Netherlands' , 'North Macedonia' , 'Norway' , 'Poland' , 'Portugal' , 'Republic of Moldova' , 'Romania' , 'Russian Federation' , 'San Marino' , 'Sark' , 'Serbia' , 'Slovakia' , 'Slovenia' , 'Spain' , 'Svalbard and Jan Mayen Islands' , 'Sweden' , 'Switzerland' , 'Ukraine' , 'United Kingdom of Great Britain and Northern Ireland'
],
  NorthAmerica:['Antigua and Barbuda', 'Aruba' , 'Bahamas' , 'Barbados' , 'Belize' , 'Bermuda' , 'Bonaire, Sint Eustatius and Saba' , 'British Virgin Islands' , 'Canada' , 'Cayman Islands' , 'Costa Rica' , 'Cuba' , 'Curaçao' , 'Dominica' , 'Dominican Republic' , 'El Salvador' , 'Greenland' , 'Grenada' , 'Guadeloupe' , 'Guatemala' , 'Haiti' , 'Honduras' , 'Jamaica' , 'Martinique' , 'Mexico' , 'Montserrat' , 'Nicaragua' , 'Panama' , 'Puerto Rico' , 'Saint Barthélemy' , 'Saint Kitts and Nevis' , 'Saint Lucia' , 'Saint Martin' , 'Saint Pierre and Miquelon' , 'Saint Vincent and the Grenadines' , 'Sint Maarten' , 'Trinidad and Tobago' , 'Turks and Caicos Islands' , 'United States of America' , 'United States Virgin Islands'
],
  Oceania:['American Samoa' , 'Australia' , 'Christmas Island' , 'Cocos (Keeling) Islands' , 'Cook Islands' , 'Fiji' , 'French Polynesia' , 'Guam' , 'Heard Island and McDonald Islands' , 'Kiribati' , 'Marshall Islands' , 'Micronesia (Federated States of)' , 'Nauru' , 'New Caledonia' , 'New Zealand' , 'Niue' , 'Norfolk Island' , 'Northern Mariana Islands' , 'Palau' , 'Papua New Guinea' , 'Pitcairn' , 'Samoa' , 'Solomon Islands' , 'Tokelau' , 'Tonga' , 'Tuvalu' , 'United States Minor Outlying Islands' , 'Vanuatu' , 'Wallis and Futuna Islands'
],
  SouthAmerica:['Argentina' , 'Bolivia' , 'Bouvet Island' , 'Brazil' , 'Chile' , 'Colombia' , 'Ecuador' , 'Falkland Islands (Malvinas)' , 'French Guiana' , 'Guyana' , 'Paraguay' , 'Peru' , 'South Georgia and the South Sandwich Islands' , 'Suriname' , 'Uruguay' , 'Venezuela'
  ],

}

const countryMap = countries[selectedRegion].map((country)=>{
  return <option>{country}</option>
})

const setRegionHandler = (e) => {
  setSelectedRegion(e.target.value);
  setUploadData({...uploadData, region:e.target.value})
}

const setCountryHandler = (e) => {
  setUploadData({...uploadData, country:e.target.value})
}

const setPlaceHandler = (e) => {
  setUploadData({...uploadData, place:e.target.value})
}

const setImageHandler = (e) => {
  e.preventDefault()
  let files = e.target.files
  if(files.length > 0){
    let file = files[0]
    
    //Save to local//
    // const fs = require('fs');
    // fs.copyFile("/img/de250.jpg",`/img/de250-1.jpg`,(err) => {
    //   if (err) throw err;
    //     console.log('ファイルをコピーしました');
    // })

    console.log(file);
    setUploadData({...uploadData, image:`/img/${file.name}`});
    ////////////////////////


    // BinaryをDBに保存////////////////
    // var reader = new FileReader()
    // reader.onloadend = () => {
    //   setUploadData({...uploadData, image:reader.result});
    // }
    // reader.readAsDataURL(file)
    /////////////////////////////////
  }else{
      setUploadData({...uploadData, image:""})
  }
  
}

const uploadTravellist=()=>{
  axios.post('http://127.0.0.1:8000/api/upload/', uploadData)
  .then(()=>{
    setModal(!modal);
    setUploadData({region:"",country:"", place:""});
    })
  .catch(error => console.log(error));
}



return (
  <div>
    <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="Region">Region</Label>
              <Input 
                type="select" name="select" id="exampleSelect"
                onChange={setRegionHandler}
              >
              <option>Select Region</option>
              <option>Africa</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>NorthAmerica</option>
              <option>Oceania</option>
              <option>SouthAmerica</option>
          </Input>
            <Label for="Country">Country</Label>
              <Input  type="select"
            onChange={setCountryHandler}
              >
            <option hidden>Select Country</option>
            {countryMap}
              </Input>
            <Label for="country">Place</Label>
              <Input id="place"
                onChange={setPlaceHandler}
              ></Input>
            <Label for="country">Picture</Label>
            <br/>
              <Input 
                type="file" 
                accept="image/*"
                onChange={setImageHandler}
              />
              <Button onClick={()=>console.log(uploadData)} /> 
              <div className="container">
                <img style={{width:"100%"}} src={uploadData.image}/>
              </div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" 
                onClick={uploadTravellist} 
                // onClick={console.log(uploadData)}
        >Upload</Button>
        <Button 
          color="secondary" 
          onClick={toggle}
        >Cancel
        </Button>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default UploadModal;
 
 
{/* <FormGroup>
<Label for="country">Continent</Label>
 
<Label for="country">Country</Label>
  <Input
    id="country"
 
    onChange={(e)=>{
      setUploadData({...uploadData, country:e.target.value})
    }}
  />
<Label for="country">Place</Label>
  <Input
    id="place"
 
    onChange={(e)=>{
      setUploadData({...uploadData, place:e.target.value})
    }}
  >  
  </Input>
</FormGroup> */}