import React, {useState, useContext, useEffect, ReactNode} from 'react';

import styles from '../../../styles/sortmodal.module.scss';
import {TravelPostsContext, TravelPostObject} from '../../index';
import {sortModalStateContext} from '../home/Home';

const SortModal: React.FC<{}> = ()=> {

    //useContext//////////////////////
    const{travelPosts, setTravelPosts} = useContext(TravelPostsContext);
    const{sortModalState, setSortModalState} = useContext(sortModalStateContext);
    // const {sortedState, setSortedState} = useContext(SortedStateContext);
    //////////////////////////////////


    //useState////////////////////////
    type RegionsCheckBoxObject = {[key: string]: boolean}
    
    type SortedRegionsObject = string[];

    type CountriesCheckBoxObject = {[key: string]: boolean};
    
    const initialRegionsCheckBox = {
      Africa: false,
      Asia: false,
      Europe: false,
      NorthAmerica: false,
      Oceania: false,
      SouthAmerica: false
    };

    const initialSorterRegionsObject: string[] = []

    const initialDisplayedCountries:[] = []

    const initialCountriesCheckBox = {}

    const [regionsCheckBox, setRegionsCheckBox] = useState<RegionsCheckBoxObject>(initialRegionsCheckBox);
  
    const [sortedRegions, setSortedRegions] = useState<SortedRegionsObject>(initialSorterRegionsObject);
    
    const [displayedCountries, setDisplayedCountries] = useState<TravelPostObject[]>(initialDisplayedCountries);
    
    const [countriesCheckBox, setCountriesCheckBox] = useState<CountriesCheckBoxObject>({});
      // {"Afghanistan":false,"Åland Islands":false,"Albania":false,"Algeria":false,"American Samoa":false,"Andorra":false,"Angola":false,"Anguilla":false,"Antarctica":false,"Antigua and Barbuda":false,"Argentina":false,"Armenia":false,"Aruba":false,"Australia":false,"Austria":false,"Azerbaijan":false,"Bahamas":false,"Bahrain":false,"Bangladesh":false,"Barbados":false,"Belarus":false,"Belgium":false,"Belize":false,"Benin":false,"Bermuda":false,"Bhutan":false,"Bolivia (Plurinational State of)":false,"Bonaire, Sint Eustatius and Saba":false,"Bosnia and Herzegovina":false,"Botswana":false,"Bouvet Island":false,"Brazil":false,"British Indian Ocean Territory":false,"British Virgin Islands":false,"Brunei Darussalam":false,"Bulgaria":false,"Burkina Faso":false,"Burundi":false,"Cabo Verde":false,"Cambodia":false,"Cameroon":false,"Canada":false,"Cayman Islands":false,"Central African Republic":false,"Chad":false,"Chile":false,"China":false,"China, Hong Kong Special Administrative Region":false,"China, Macao Special Administrative Region":false,"Christmas Island":false,"Cocos (Keeling) Islands":false,"Colombia":false,"Comoros":false,"Congo":false,"Cook Islands":false,"Costa Rica":false,"Côte d’Ivoire":false,"Croatia":false,"Cuba":false,"Curaçao":false,"Cyprus":false,"Czech Republic":false,"Democratic People's Republic of Korea":false,"Democratic Republic of the Congo":false,"Denmark":false,"Djibouti":false,"Dominica":false,"Dominican Republic":false,"Ecuador":false,"Egypt":false,"El Salvador":false,"Equatorial Guinea":false,"Eritrea":false,"Estonia":false,"Eswatini":false,"Ethiopia":false,"Falkland Islands (Malvinas)":false,"Faroe Islands":false,"Fiji":false,"Finland":false,"France":false,"French Guiana":false,"French Polynesia":false,"French Southern Territories":false,"Gabon":false,"Gambia":false,"Georgia":false,"Germany":false,"Ghana":false,"Gibraltar":false,"Greece":false,"Greenland":false,"Grenada":false,"Guadeloupe":false,"Guam":false,"Guatemala":false,"Guernsey":false,"Guinea":false,"Guinea-Bissau":false,"Guyana":false,"Haiti":false,"Heard Island and McDonald Islands":false,"Holy See":false,"Honduras":false,"Hungary":false,"Iceland":false,"India":false,"Indonesia":false,"Iran (Islamic Republic of)":false,"Iraq":false,"Ireland":false,"Isle of Man":false,"Israel":false,"Italy":false,"Jamaica":false,"Japan":false,"Jersey":false,"Jordan":false,"Kazakhstan":false,"Kenya":false,"Kiribati":false,"Kuwait":false,"Kyrgyzstan":false,"Lao People's Democratic Republic":false,"Latvia":false,"Lebanon":false,"Lesotho":false,"Liberia":false,"Libya":false,"Liechtenstein":false,"Lithuania":false,"Luxembourg":false,"Madagascar":false,"Malawi":false,"Malaysia":false,"Maldives":false,"Mali":false,"Malta":false,"Marshall Islands":false,"Martinique":false,"Mauritania":false,"Mauritius":false,"Mayotte":false,"Mexico":false,"Micronesia (Federated States of)":false,"Monaco":false,"Mongolia":false,"Montenegro":false,"Montserrat":false,"Morocco":false,"Mozambique":false,"Myanmar":false,"Namibia":false,"Nauru":false,"Nepal":false,"Netherlands":false,"New Caledonia":false,"New Zealand":false,"Nicaragua":false,"Niger":false,"Nigeria":false,"Niue":false,"Norfolk Island":false,"North Macedonia":false,"Northern Mariana Islands":false,"Norway":false,"Oman":false,"Pakistan":false,"Palau":false,"Panama":false,"Papua New Guinea":false,"Paraguay":false,"Peru":false,"Philippines":false,"Pitcairn":false,"Poland":false,"Portugal":false,"Puerto Rico":false,"Qatar":false,"Republic of Korea":false,"Republic of Moldova":false,"Réunion":false,"Romania":false,"Russian Federation":false,"Rwanda":false,"Saint Barthélemy":false,"Saint Helena":false,"Saint Kitts and Nevis":false,"Saint Lucia":false,"Saint Martin (French Part)":false,"Saint Pierre and Miquelon":false,"Saint Vincent and the Grenadines":false,"Samoa":false,"San Marino":false,"Sao Tome and Principe":false,"Sark":false,"Saudi Arabia":false,"Senegal":false,"Serbia":false,"Seychelles":false,"Sierra Leone":false,"Singapore":false,"Sint Maarten (Dutch part)":false,"Slovakia":false,"Slovenia":false,"Solomon Islands":false,"Somalia":false,"South Africa":false,"South Georgia and the South Sandwich Islands":false,"South Sudan":false,"Spain":false,"Sri Lanka":false,"State of Palestine":false,"Sudan":false,"Suriname":false,"Svalbard and Jan Mayen Islands":false,"Sweden":false,"Switzerland":false,"Syrian Arab Republic":false,"Tajikistan":false,"Thailand":false,"Timor-Leste":false,"Togo":false,"Tokelau":false,"Tonga":false,"Trinidad and Tobago":false,"Tunisia":false,"Turkey":false,"Turkmenistan":false,"Turks and Caicos Islands":false,"Tuvalu":false,"Uganda":false,"Ukraine":false,"United Arab Emirates":false,"United Kingdom of Great Britain and Northern Ireland":false,"United Republic of Tanzania":false,"United States Minor Outlying Islands":false,"United States of America":false,"United States Virgin Islands":false,"Uruguay":false,"Uzbekistan":false,"Vanuatu":false,"Venezuela (Bolivarian Republic of)":false,"Viet Nam":false,"Wallis and Futuna Islands":false,"Western Sahara":false,"Yemen":false,"Zambia":false,"Zimbabwe":false}
    const [sortedCountries, setSortedCountries] = useState([]);
  
    //////////////////////////////////



    const countriesInPosts = travelPosts.reduce((a:any,v:any)=>{
      if(!a.some((e:TravelPostObject)=>e.country === v.country)){
        a.push(v)
      }
      return a
    }
    ,[])

    
    const setSortedRegionsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dummyArray :string[]|null[] = sortedRegions.slice()
     
   
      if(!regionsCheckBox[e.currentTarget.value]){
          dummyArray.push(e.currentTarget.value)
          setSortedRegions(dummyArray)
          setRegionsCheckBox({...regionsCheckBox, [e.currentTarget.value]:true})
      }else{
          const regionFilter = dummyArray.filter(n => n !== e.target.value)
          setSortedRegions(regionFilter)
          setRegionsCheckBox({...regionsCheckBox,[e.currentTarget.value]:false})
        }

    }

    const regions = Object.keys(regionsCheckBox)
    const regionMap = regions.map(region=>{
        return(
            <div >
              <input 
                type="checkbox" 
                id="checkbox"
                name={region} 
                value={region} 
                onChange={setSortedRegionsHandler}
              />
              {region}
            </div>
          )
         })
    
   
    const toggle = () => setSortModalState(!sortModalState);
    const DisplayCountriesHandler = () => {
      const b = displayedCountries.forEach((a)=>{
        const dummy:{[key:string]:boolean} = {}
        dummy[a.country]=false
        // return dummy
        setCountriesCheckBox(dummy)
        return dummy
      })

      const filterByRegion =countriesInPosts.filter((x:TravelPostObject)=>sortedRegions.includes(x.region))
      setDisplayedCountries(filterByRegion)
      b
    }
  

   
    // const setSortedStateHandler = () =>{
    //   setSortedState({
    //     ...sortedState,
    //     region:sortedRegions,
    //     country:selectedCountries
    //   })
    //   setSortModalState(!sortModalState)
    // }
  
 
    const countryMap = displayedCountries.map((displayedCountry)=>{
      // const setSelectedCountriesHandler = (e) => {
      //   const array = selectedCountries.slice()
      //   const country = showCountry.country
      //   if(!countryChecked[country]){
      //     array.push(e.target.value)
      //     setSelectedCountries(array)
      //     setCountryChecked({...countryChecked, [country]:true})
      //   }else{
      //     const countryFilter = array.filter(n => n !== e.target.value)
      //     setSelectedCountries(countryFilter)
      //     setCountryChecked({...countryChecked, [country]:false})
      //   }
      // }
  
      return(
        <div>
            <input 
            id="checkbox"
            type="checkbox" 
            name={displayedCountry.country} 
            value={displayedCountry.country} 
            // onChange={setSelectedCountriesHandler}
          /> {displayedCountry.country}
        </div>
      )     
    })



    return(
        <div
        className={styles.sortModal}
        style={{
            "opacity": sortModalState? 1:0,
            "pointerEvents":sortModalState?  "auto": "none"
          }}
        >
          <div>Sort pictures by your preference</div>
          <div 
            // onClick={()=>console.log(SortedCountries)}
            >check selectedRegion</div><br></br>
          <div >show country</div><br></br>
          <div 
            // onClick={()=>console.log(showCountries)}
            >show countryyyy</div><br></br>
          <div className={styles.regionListContainer}>
            {regionMap}
            <button onClick={DisplayCountriesHandler}>Sort Region</button>
          </div>
          <div className={styles.countryListContainer}>
            {countryMap}
          </div>
          <div>
            <button 
              
              // onClick={setSortedStateHandler}
            >Sort</button>
            <button 
              onClick= {()=>{toggle}}
            >Cancel
            </button>
            <button 
                onClick={
                  ()=>console.log(regionsCheckBox)
                }
            >
              regionsCheckBox
            </button>
            <button 
                onClick={
                  ()=>console.log(sortedRegions)
                }
            >
              sortedRegions
            </button>
            <button 
                onClick={
                  ()=>console.log(displayedCountries)
                }
            >
              displayedCountries
            </button>

            <button 
                onClick={
                  ()=>console.log(countriesCheckBox)
                }
            >
              CountriesCheckBox
            </button>
          </div>

        </div>
      )
////
}

export default SortModal; 

// console.log(file);
//     setUploadData({...uploadData, image:`/img/${file.name}`});
    ///////////////////////