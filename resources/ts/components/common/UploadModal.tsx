
import React, {useState, useContext, useEffect, ReactNode} from 'react';
import Dropzone,{FileRejection, FileWithPath,useDropzone} from 'react-dropzone';
import { useSpring, animated, config } from 'react-spring'

import axios from 'axios';

import styles from '../../../styles/uploadmodal.module.scss';
import WorldMap from './WorldMap';
import {TravelPostsContext} from '../../index';
import {uploadModalStateContext} from '../home/Home';


const UploadModal: React.FC<{}> = ()=> {

    //useContext//////////////////////
    const{travelPosts, setTravelPosts} = useContext(TravelPostsContext);
    const{uploadModalState, setUploadModalState} = useContext(uploadModalStateContext);
    //////////////////////////////////

    //useState////////////////////////
    type uploadDataObject = {
        region:string|undefined;
        country:string|undefined;
        title?:string|null;
        image:any;
        latitude: number|undefined,
        longitude: number|undefined,
    };

    type mapGeoCodeObject = {
      country: string|undefined,
      latitude: number|undefined,
      longitude: number|undefined
    }

    const initialUploadData = {
      region:undefined,
      country:undefined,
      title:null,
      image:undefined,
      latitude:undefined,
      longitude:undefined
    }

    const initialMapGeoCode = {
      country: undefined,
      latitude: undefined,
      longitude: undefined
    }
    
    const [uploadData, setUploadData] = useState<uploadDataObject>(initialUploadData);

    const [mapGeoCode, setMapGeoCode] = useState<mapGeoCodeObject>(initialMapGeoCode)

    ////////////////////////////////////

    
        
    //Handler///////////////////////////////
    const setRegionHandler:(e: React.ChangeEvent<HTMLSelectElement>)=>void = (e) => {
        // setSelectedRegion(e.currentTarget.value);
        setUploadData({
          ...uploadData, 
          region:e.currentTarget.value, 
          country:undefined});
        setMapGeoCode(initialMapGeoCode)
      }

    const setCountryHandler:(e: React.ChangeEvent<HTMLSelectElement>) =>void = (e) => {
      if(uploadData.region){
      // setSelectedRegion(e.currentTarget.value);
      setUploadData({...uploadData, country:e.currentTarget.value});
      const extractedArr = countries[uploadData.region].splice(
        countries[uploadData.region].findIndex((obj) => obj.name === e.currentTarget.value)
        , 1
      );

      setMapGeoCode({
        country: extractedArr[0].name,
        latitude: extractedArr[0].lat,
        longitude: extractedArr[0].lng})
      }
    }

    const setLocationHandler:(e:any)=>void = (e)=>{
      const lat = e.latLng.lat()
      const lng =e.latLng.lng()
      setUploadData({...uploadData, latitude:lat, longitude: lng})
      setMapGeoCode({...mapGeoCode, latitude:lat, longitude: lng})
    }

    const cancelHandler:()=>void = ()=>{
      setUploadModalState(!uploadModalState)
      setUploadData(initialUploadData)
    }
    //////////////////////////////////////////


    //Animation///////////////////////////////
    const spring = useSpring({ 
      height: uploadData.image? "auto": "0px",
      opacity: uploadData.image? "1": "0",
      delay:200,
      config: {duration: 500}
    })
    //////////////////////////////////////////
    
    //Api/////////////////////////////////////
    const uploadHandler:()=> void = ()=>{
      axios.post('api/upload', uploadData)
      .then(()=>{
        const slice = travelPosts.slice();
        slice.push(uploadData);
        setTravelPosts(slice);
      })
      .then(()=>{
        setUploadData(initialUploadData);
        setMapGeoCode(initialMapGeoCode)
        setUploadModalState(false);
      }).then(()=>{setUploadModalState(false)})
      .catch(error => console.log(error));
    
    }
    //////////////////////////////////////////
    


    //jsx component///////////////////////////
 
      var countries: {[key:string]:{name:string,lng?:number,lat?:number}[]}  ={
        
        Africa:[{name:"Algeria",lng:3,lat:28},{name:"Angola",lng:18.5,lat:-12.5},{name:"Benin",lng:2.25,lat:9.5},{name:"Botswana",lng:24,lat:-22},{name:"British Indian Ocean Territory",lng:71.5,lat:-6},{name:"Burkina Faso",lng:-2,lat:13},{name:"Burundi",lng:30,lat:-3.5},{name:"Cabo Verde",lng:-24,lat:16},{name:"Cameroon",lng:12,lat:6},{name:"Central African Republic",lng:21,lat:7},{name:"Chad",lng:19,lat:15},{name:"Comoros",lng:44.25,lat:-12.1667},{name:"Congo",lng:15,lat:-1},{name:"Côte d’Ivoire",lng:-5,lat:8},{name:"Democratic Republic of the Congo",lng:-4.32244,lat:15.307045},{name:"Djibouti",lng:43,lat:11.5},{name:"Egypt",lng:30,lat:27},{name:"Equatorial Guinea",lng:10,lat:2},{name:"Eritrea",lng:39,lat:15},{name:"Eswatini",lng:-26.522503,lat:31.465866},{name:"Ethiopia",lng:38,lat:8},{name:"French Southern Territories",lng:67,lat:-43},{name:"Gabon",lng:11.75,lat:-1},{name:"Gambia",lng:-16.5667,lat:13.4667},{name:"Ghana",lng:-2,lat:8},{name:"Guinea",lng:-10,lat:11},{name:"Guinea-Bissau",lng:-15,lat:12},{name:"Kenya",lng:38,lat:1},{name:"Lesotho",lng:28.5,lat:-29.5},{name:"Liberia",lng:-9.5,lat:6.5},{name:"Libya",lng:17,lat:25},{name:"Madagascar",lng:47,lat:-20},{name:"Malawi",lng:34,lat:-13.5},{name:"Mali",lng:-4,lat:17},{name:"Mauritania",lng:-12,lat:20},{name:"Mauritius",lng:57.55,lat:-20.2833},{name:"Mayotte",lng:45.1667,lat:-12.8333},{name:"Morocco",lng:-5,lat:32},{name:"Mozambique",lng:35,lat:-18.25},{name:"Namibia",lng:17,lat:-22},{name:"Niger",lng:8,lat:16},{name:"Nigeria",lng:8,lat:10},{name:"Réunion",lng:55.6,lat:-21.1},{name:"Rwanda",lng:30,lat:-2},{name:"Saint Helena",lng:-5.7,lat:-15.9333},{name:"Sao Tome and Principe",lng:12.4167,lat:43.7667},{name:"Senegal",lng:45,lat:25},{name:"Seychelles",lng:21,lat:44},{name:"Sierra Leone",lng:55.6667,lat:-4.5833},{name:"Somalia",lng:159,lat:-8},{name:"South Africa",lng:49,lat:10},{name:"South Sudan",lng:-37,lat:-54.5},{name:"Sudan",lng:81,lat:7},{name:"Togo",lng:125.5167,lat:-8.55},{name:"Tunisia",lng:-61,lat:11},{name:"Uganda",lng:178,lat:-8},{name:"United Republic of Tanzania",lng:71,lat:39},{name:"Western Sahara",lng:-176.2,lat:-13.3},{name:"Zambia",lng:48,lat:15},{name:"Zimbabwe",lng:30,lat:-15}
                ],
        Asia:[{name:"Afghanistan",lng:65,lat:33},{name:"Armenia",lng:45,lat:40},{name:"Azerbaijan",lng:47.5,lat:40.5},{name:"Bahrain",lng:50.55,lat:26},{name:"Bangladesh",lng:90,lat:24},{name:"Bhutan",lng:90.5,lat:27.5},{name:"Brunei Darussalam",lng:114.6667,lat:4.5},{name:"Cambodia",lng:105,lat:13},{name:"China",lng:105,lat:35},{name:"China, Hong Kong Special Administrative Region",lng:114.1667,lat:22.25},{name:"China, Macao Special Administrative Region",lng:22.210928,lat:113.552971},{name:"Cyprus",lng:33,lat:35},{name:"Democratic People's Republic of Korea",lng:127,lat:40},{name:"Georgia",lng:43.5,lat:42},{name:"India",lng:77,lat:20},{name:"Indonesia",lng:120,lat:-5},{name:"Iran (Islamic Republic of)",lng:53,lat:32},{name:"Iraq",lng:44,lat:33},{name:"Israel",lng:34.75,lat:31.5},{name:"Japan",lng:138,lat:36},{name:"Jordan",lng:36,lat:31},{name:"Kazakhstan",lng:68,lat:48},{name:"Kuwait",lng:47.6581,lat:29.3375},{name:"Kyrgyzstan",lng:75,lat:41},{name:"Lao People's Democratic Republic",lng:105,lat:18},{name:"Lebanon",lng:35.8333,lat:33.8333},{name:"Malaysia",lng:112.5,lat:2.5},{name:"Maldives",lng:73,lat:3.25},{name:"Mongolia",lng:105,lat:46},{name:"Myanmar",lng:98,lat:22},{name:"Nepal",lng:84,lat:28},{name:"Oman",lng:57,lat:21},{name:"Pakistan",lng:70,lat:30},{name:"Philippines",lng:122,lat:13},{name:"Qatar",lng:51.25,lat:25.5},{name:"Republic of Korea",lng:127.5,lat:37},{name:"Saudi Arabia",lng:7,lat:1},{name:"Singapore",lng:-11.5,lat:8.5},{name:"Sri Lanka",lng:-4,lat:40},{name:"State of Palestine",lng:31.9474,lat:35.2272},{name:"Syrian Arab Republic",lng:8,lat:47},{name:"Tajikistan",lng:121,lat:23.5},{name:"Thailand",lng:35,lat:-6},{name:"Timor-Leste",lng:100,lat:15},{name:"Turkey",lng:9,lat:34},{name:"Turkmenistan",lng:35,lat:39},{name:"United Arab Emirates",lng:32,lat:49},{name:"Uzbekistan",lng:-56,lat:-33},{name:"Viet Nam",lng:-66,lat:8},{name:"Yemen",lng:-13,lat:24.5}
              ],
        Europe:[{name:"Åland Islands",lng:19.9156,lat:60.1785},{name:"Albania",lng:20,lat:41},{name:"Andorra",lng:1.6,lat:42.5},{name:"Austria",lng:13.3333,lat:47.3333},{name:"Belarus",lng:28,lat:53},{name:"Belgium",lng:4,lat:50.8333},{name:"Bosnia and Herzegovina",lng:18,lat:44},{name:"Bulgaria",lng:25,lat:43},{name:"Croatia",lng:15.5,lat:45.1667},{name:"Czechia",lng:15.5,lat:49.75},{name:"Denmark",lng:10,lat:56},{name:"Estonia",lng:26,lat:59},{name:"Faroe Islands",lng:-7,lat:62},{name:"Finland",lng:26,lat:64},{name:"France",lng:2,lat:46},{name:"Germany",lng:9,lat:51},{name:"Gibraltar",lng:-5.3667,lat:36.1833},{name:"Greece",lng:22,lat:39},{name:"Guernsey",lng:-2.56,lat:49.5},{name:"Holy See",lng:12.45,lat:41.9},{name:"Hungary",lng:20,lat:47},{name:"Iceland",lng:-18,lat:65},{name:"Ireland",lng:-8,lat:53},{name:"Isle of Man",lng:-4.55,lat:54.23},{name:"Italy",lng:12.8333,lat:42.8333},{name:"Jersey",lng:-2.13,lat:49.21},{name:"Latvia",lng:25,lat:57},{name:"Liechtenstein",lng:9.5333,lat:47.1667},{name:"Lithuania",lng:24,lat:56},{name:"Luxembourg",lng:6.1667,lat:49.75},{name:"Malta",lng:14.5833,lat:35.8333},{name:"Monaco",lng:7.4,lat:43.7333},{name:"Montenegro",lng:19,lat:42},{name:"Netherlands",lng:5.75,lat:52.5},{name:"North Macedonia",lng:22,lat:41.8333},{name:"Norway",lng:10,lat:62},{name:"Poland",lng:20,lat:52},{name:"Portugal",lng:-8,lat:39.5},{name:"Republic of Moldova",lng:29,lat:47},{name:"Romania",lng:25,lat:46},{name:"Russian Federation",lng:100,lat:60},{name:"San Marino",lng:-172.3333,lat:-13.5833},{name:"Sark",lng:49.42083165,lat:-2.366165202},{name:"Serbia",lng:-14,lat:14},{name:"Slovakia",lng:103.8,lat:1.3667},{name:"Slovenia",lng:19.5,lat:48.6667},{name:"Spain",lng:30,lat:8},{name:"Svalbard and Jan Mayen Islands",lng:-56,lat:4},{name:"Sweden",lng:31.5,lat:-26.5},{name:"Switzerland",lng:15,lat:62},{name:"Ukraine",lng:32,lat:1},{name:"United Kingdom of Great Britain and Northern Ireland",lng:54,lat:24}
              ],
        NorthAmerica:[{name:"Anguilla",lng:-63.1667,lat:18.25},{name:"Antigua and Barbuda",lng:-61.8,lat:17.05},{name:"Aruba",lng:-69.9667,lat:12.5},{name:"Bahamas",lng:-76,lat:24.25},{name:"Barbados",lng:-59.5333,lat:13.1667},{name:"Belize",lng:-88.75,lat:17.25},{name:"Bermuda",lng:-64.75,lat:32.3333},{name:"Bonaire, Sint Eustatius and Saba",lng:12.178361,lat:-68.238534},{name:"British Virgin Islands",lng:18.436539,lat:-64.618103},{name:"Canada",lng:-95,lat:60},{name:"Cayman Islands",lng:-80.5,lat:19.5},{name:"Costa Rica",lng:-84,lat:10},{name:"Cuba",lng:-80,lat:21.5},{name:"Curaçao",lng:12.16957,lat:-68.990021},{name:"Dominica",lng:-61.3333,lat:15.4167},{name:"Dominican Republic",lng:-70.6667,lat:19},{name:"El Salvador",lng:-88.9167,lat:13.8333},{name:"Greenland",lng:-40,lat:72},{name:"Grenada",lng:-61.6667,lat:12.1167},{name:"Guadeloupe",lng:-61.5833,lat:16.25},{name:"Guatemala",lng:-90.25,lat:15.5},{name:"Haiti",lng:-72.4167,lat:19},{name:"Honduras",lng:-86.5,lat:15},{name:"Jamaica",lng:-77.5,lat:18.25},{name:"Martinique",lng:-61,lat:14.6667},{name:"Mexico",lng:-102,lat:23},{name:"Montserrat",lng:-62.2,lat:16.75},{name:"Nicaragua",lng:-85,lat:13},{name:"Panama",lng:-80,lat:9},{name:"Puerto Rico",lng:-66.5,lat:18.25},{name:"Saint Barthélemy",lng:-62.8338521,lat:17.9139222},{name:"Saint Kitts and Nevis",lng:-62.75,lat:17.3333},{name:"Saint Lucia",lng:-61.1333,lat:13.8833},{name:"Saint Martin (French Part)",lng:18.075277,lat:-63.060001},{name:"Saint Pierre and Miquelon",lng:-56.3333,lat:46.8333},{name:"Saint Vincent and the Grenadines",lng:-61.2,lat:13.25},{name:"Sint Maarten (Dutch part)",lng:18.075277,lat:-63.060001},{name:"Trinidad and Tobago",lng:-175,lat:-20},{name:"Turks and Caicos Islands",lng:60,lat:40},{name:"United States of America",lng:-2,lat:54},{name:"United States Virgin Islands",lng:-64.5,lat:18.5},
        ],
        Oceania:[{name:"American Samoa",lng:-170,lat:-14.3333},{name:"Australia",lng:133,lat:-27},{name:"Christmas Island",lng:105.6667,lat:-10.5},{name:"Cocos (Keeling) Islands",lng:96.8333,lat:-12.5},{name:"Cook Islands",lng:-159.7667,lat:-21.2333},{name:"Fiji",lng:175,lat:-18},{name:"French Polynesia",lng:-140,lat:-15},{name:"Guam",lng:144.7833,lat:13.4667},{name:"Heard Island and McDonald Islands",lng:72.5167,lat:-53.1},{name:"Kiribati",lng:173,lat:1.4167},{name:"Marshall Islands",lng:168,lat:9},{name:"Micronesia (Federated States of)",lng:158.25,lat:6.9167},{name:"Nauru",lng:166.9167,lat:-0.5333},{name:"New Caledonia",lng:165.5,lat:-21.5},{name:"New Zealand",lng:174,lat:-41},{name:"Niue",lng:-169.8667,lat:-19.0333},{name:"Norfolk Island",lng:167.95,lat:-29.0333},{name:"Northern Mariana Islands",lng:145.75,lat:15.2},{name:"Palau",lng:134.5,lat:7.5},{name:"Papua New Guinea",lng:147,lat:-6},{name:"Pitcairn",lng:-127.4,lat:-24.7},{name:"Samoa",lng:-61.2,lat:13.25},{name:"Solomon Islands",lng:15,lat:46},{name:"Tokelau",lng:1.1667,lat:8},{name:"Tonga",lng:-172,lat:-9},{name:"Tuvalu",lng:-71.5833,lat:21.75},{name:"United States Minor Outlying Islands",lng:-97,lat:38},{name:"Vanuatu",lng:64,lat:41},{name:"Wallis and Futuna Islands",lng:-64.8333,lat:18.3333},
        ],
        SouthAmerica:[{name:"Argentina",lng:-64,lat:-34},{name:"Bolivia (Plurinational State of)",lng:-65,lat:-17},{name:"Bouvet Island",lng:3.4,lat:-54.4333},{name:"Brazil",lng:-55,lat:-10},{name:"Chile",lng:-71,lat:-30},{name:"Colombia",lng:-72,lat:4},{name:"Ecuador",lng:-77.5,lat:-2},{name:"Falkland Islands (Malvinas)",lng:-59,lat:-51.75},{name:"French Guiana",lng:-53,lat:4},{name:"Guyana",lng:-59,lat:5},{name:"Paraguay",lng:-58,lat:-23},{name:"Peru",lng:-76,lat:-10},{name:"South Georgia and the South Sandwich Islands",lng:24,lat:-29},{name:"Suriname",lng:30,lat:15},{name:"Uruguay",lng:166.6,lat:19.2833},{name:"Venezuela (Bolivarian Republic of)",lng:167,lat:-16},
        ]
      }

    
    const countryMap = ()=>{

      if(uploadData.region === undefined){
        return <option>select Region</option>
      }  
      else{
        const countryList = countries[uploadData.region].map((country)=>{
          return <option>{country.name}</option>
      })
      return countryList
    }
    }

    const placeInputBox: ()=>JSX.Element = ()=>{
      if(uploadData.title){
        return(
          <input 
          type="text"
          value={uploadData.title}
          onChange={(e)=>{setUploadData({...uploadData, title:e.currentTarget.value})}}
         />
        )
      }else{
        return(
          <input 
          type="text"
          value=""
          onChange={(e)=>{setUploadData({...uploadData, title:e.currentTarget.value})}}
          />
        )
      }
    }
  
    function Label():JSX.Element{
      return(
      <div className={styles.uploadModal__label}>
        <p>Upload your favourite photos</p>
        <p onClick={cancelHandler}>✕</p>
      </div>
    )
    }

    function Dropzone():JSX.Element{

      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept:"image/*",
        maxFiles:1,
        onDrop: acceptedFiles => {
     
          acceptedFiles.forEach((file) => {
            const reader = new FileReader()
      
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => alert('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              const binaryStr = reader.result
              //upload as binary/////////
              setUploadData({...uploadData, image:binaryStr})
  
            }
            //upload as binary//
            reader.readAsDataURL(file)
            /////////////////////
        })}
      })

      const preview = (
        <div>
            <img 
              src={uploadData.image}
              className={styles.uploadModal__dropContainer__previewPhoto}
              />
        </div>
      )

      return (
        <div 
          {...getRootProps({
           })}
           className={styles.uploadModal__dropContainer}
           style={{"border": uploadData.image? "":"0.5px dashed  gray" }}
        >
          <input {...getInputProps()} />
          {
            uploadData.image ?
            <div>
              {preview} 
            </div>  
            :
            <div>
              <p>Drag files to here</p>
            </div>
          }
        </div>
      )
    }
    
    //////////////////////////////////////////
    

    return(
      <div 
        className={styles.uploadModal}
        style={{
          "opacity": uploadModalState? 1:0,
          "pointerEvents":uploadModalState?  "auto": "none"
        }}
        >
        <Label/>
        <Dropzone/>
        <animated.div 
          className={styles.uploadModal__upperContainer}
          style={spring}  
        >
            <div 
              className={styles.uploadModal__upperContainer__left}
            >
                    <p>Region:<br/>
                        <select 
                          name="region" 
                          onChange={setRegionHandler}
                          value = {uploadData.region}
                        >
                            <option hidden >Select Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="NorthAmerica">NorthAmerica</option>
                            <option value="Oceania">Oceania</option>
                            <option value="SouthAmerica">SouthAmerica</option>
                        </select><br/>
                    </p>
                    <p>Country:<br/>
                        <select 
                          name="country"
                          onChange={setCountryHandler}
                          value= {uploadData.country === undefined? "Select Country": uploadData.country}     
                        >
                          <option hidden value="Select Country" >Select Country</option>
                          {countryMap()}
                        </select>
                    </p>
                    <p>Title:<br/>
                      {placeInputBox()}
                    </p>
                    <p>Location(Select Country, then GeoMap is shown)<br/>
                      latitude:{mapGeoCode.latitude && (mapGeoCode.latitude)}
                      <br/>
                      longitude:{mapGeoCode.longitude && (mapGeoCode.longitude)}
                    </p>
            </div>
            <div className={styles.uploadModal__upperContainer__right}>
                  <WorldMap 
                    lat={mapGeoCode.latitude} 
                    lng={mapGeoCode.longitude}
                    zoom={3}
                    onClick={setLocationHandler}
                  />
                
              </div>
        </animated.div>
        <div className={styles.uploadModal__lowerContainer}> 
            <button onClick={()=>console.log(uploadData)}>preview</button>
            <button type="button" className="btn btn-primary" onClick={uploadHandler}>Upload</button>
            <button type="button" className="btn btn-success" onClick={cancelHandler}>Cancel</button>
        </div>
      </div>
    )
}

export default UploadModal; 

