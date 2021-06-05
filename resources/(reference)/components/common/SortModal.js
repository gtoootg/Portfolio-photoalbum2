import React, { useState ,useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form } from 'reactstrap';

//Context//
import {SortModalStateContext} from '../Top'
import {SortedStateContext} from '../Top'
///////////

const SortModal = (props) => {
  const {
    buttonLabel,
    className,
  } = props;

const [sortModal, setSortModal] = useContext(SortModalStateContext);
const [sortedState, setSortedState] = useContext(SortedStateContext);

const [selectedRegion, setSelectedRegion] = useState("Null");
const [selectedCountry, setSelectedCountry] = useState("Null");


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

const toggle = () => setSortModal(!sortModal);

const setSelectedRegionHandler = (e) => {
  setSelectedRegion(e.target.value);
  console.log(selectedRegion)
}

const setSelectedCountryHandler = (e) => {
  setSelectedCountry(e.target.value)
}

const setSortedStateHandler = () =>{
  setSortedState({region:selectedRegion,country:selectedCountry})
  setSortModal(!sortModal)
}





return (
  <div>
    <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
    <Modal isOpen={sortModal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Sort pictures by your preference</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="Region">Region</Label>
              <Input 
                type="select" name="select" id="exampleSelect"
                onChange={setSelectedRegionHandler}
              >
              <option type="hidden">Select Region</option>
              <option>Africa</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>NorthAmerica</option>
              <option>Oceania</option>
              <option>SouthAmerica</option>
          </Input>
            <Label for="Country">Country</Label>
              <Input  
                type="select"
                onChange={setSelectedCountryHandler}
              >
            <option hidden>Select Country</option>
            {countryMap}
              </Input>
          </FormGroup>
        </Form>
      
      </ModalBody>
      <ModalFooter>
        <Button 
          color="primary" 
          onClick={setSortedStateHandler}
        >Sort</Button>
        <Button 
          color="secondary" 
          onClick={toggle}
        >Cancel
        </Button>
        <a>check</a>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default SortModal;

