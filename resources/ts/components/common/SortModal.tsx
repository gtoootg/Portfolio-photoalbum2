import React, {useState, useContext, useEffect, ReactNode} from 'react';
import axios from "axios";
import { useSpring, animated, config } from 'react-spring'


import styles from '../../../styles/sortmodal.module.scss';
import {TravelPostsContext, DummyTravelPostsContext, TravelPostObject} from '../../index';
import {sortModalStateContext} from '../home/Home';
import { fitBounds } from 'google-map-react';

const SortModal: React.FC<{}> = ()=> {

    //useContext//////////////////////
    const{travelPosts, setTravelPosts} = useContext(TravelPostsContext);
    const{dummyTravelPosts, setDummyTravelPosts} = useContext(DummyTravelPostsContext);
    const{sortModalState, setSortModalState} = useContext(sortModalStateContext);
    //////////////////////////////////


    //useState////////////////////////
    type RegionsCheckBoxObject = {[key: string]: boolean}
    
    type SortedRegionsObject = string[];

    type CountriesCheckBoxObject = {[key: string]: boolean};

    type SortedCountriesObject = string[];

    type SortedPostsObject =TravelPostObject;

    const initialRegionsCheckBox = {
      Africa: false,
      Asia: false,
      Europe: false,
      NorthAmerica: false,
      Oceania: false,
      SouthAmerica: false
    };

    const initialSortedRegions: string[] = []

    const initialDisplayedCountries:[] = []

    const initialCountriesCheckBox:{[key: string]: false} = {}

    const initalSortedCountries:string[] = []

    const [regionsCheckBox, setRegionsCheckBox] = useState<RegionsCheckBoxObject>(initialRegionsCheckBox);
  
    const [sortedRegions, setSortedRegions] = useState<SortedRegionsObject>(initialSortedRegions);
    
    const [displayedCountries, setDisplayedCountries] = useState<TravelPostObject[]>(initialDisplayedCountries);
    
    const [countriesCheckBox, setCountriesCheckBox] = useState<CountriesCheckBoxObject>(initialCountriesCheckBox);
      
    const [sortedCountries, setSortedCountries] = useState<SortedCountriesObject>(initalSortedCountries);
  

    //////////////////////////////////

    

    //handler///////////////////////////
    
    const cancelHandler = ()=>{
      setSortModalState(false);
      setRegionsCheckBox(initialRegionsCheckBox);
      setSortedRegions(initialSortedRegions);
      setDisplayedCountries(initialDisplayedCountries);
      setCountriesCheckBox(initialCountriesCheckBox);
      setSortedCountries(initalSortedCountries);
    }

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

    const DisplayCountriesHandler = () => {
      const countriesInPosts = dummyTravelPosts.reduce((accu:any,curr:any)=>{
        if(!accu.some((e:TravelPostObject)=>e.country === curr.country)){
          accu.push(curr)
        }
        return accu
      },[])

      const filterByRegion =countriesInPosts.filter((x:TravelPostObject)=>sortedRegions.includes(x.region))
      
      const createCountriesCheckBox = filterByRegion.reduce((accu:any,curr:TravelPostObject)=>{
        accu[curr.country]=false
        return accu
      },{})

      setCountriesCheckBox(createCountriesCheckBox)
      setDisplayedCountries(filterByRegion)
    }

    const setSelectedCountriesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dummySortedCountries:string[] = sortedCountries.slice()
      
      if(!countriesCheckBox[e.currentTarget.value]){
        dummySortedCountries.push(e.currentTarget.value)
        setSortedCountries(dummySortedCountries)
        setCountriesCheckBox({...countriesCheckBox, [e.currentTarget.value]:true})
      }else{
        const countryFilter = dummySortedCountries.filter(n => n !== e.currentTarget.value)
        setSortedCountries(countryFilter)
        setCountriesCheckBox({...countriesCheckBox, [e.currentTarget.value]:false})
      }
    }

    const setSortedPostsHandler =async() =>{
      function filterPosts(){
        if(!sortedCountries.length){
                const filterByRegion =dummyTravelPosts.filter((x:TravelPostObject)=>sortedRegions.includes(x.region))
                setTravelPosts(filterByRegion)
                console.log("b")
            }else{
                const filterByCountry =dummyTravelPosts.filter((x:TravelPostObject)=>sortedCountries.includes(x.country))
                setTravelPosts(filterByCountry)
                console.log("b")
            }
      }

      function reset(){
          setSortModalState(false);
          setRegionsCheckBox(initialRegionsCheckBox);
          setSortedRegions(initialSortedRegions);
          setDisplayedCountries(initialDisplayedCountries);
          setCountriesCheckBox(initialCountriesCheckBox);
          setSortedCountries(initalSortedCountries);       
      }

      new Promise((resolve:(value:string)=>void)=>{
        filterPosts()
        resolve("sort complete")
      }).then(()=>reset())
  }


  //JSX component/////////////////////////////////
    const regions = Object.keys(regionsCheckBox)
    const regionMap = regions.map(region=>{
        return(
            <div>
              <input 
                type="checkbox" 
                id="checkbox"
                name={region} 
                value={region}
                checked={regionsCheckBox[region]}
                onChange={setSortedRegionsHandler}
              />
              {region}
            </div>
          )
         })
    
    const countryMap = displayedCountries.map((displayedCountry)=>{
    return(
      <div>
          <input 
          id="checkbox"
          type="checkbox" 
          name={displayedCountry.country} 
          value={displayedCountry.country} 
          onChange={setSelectedCountriesHandler}
        /> {displayedCountry.country}
      </div>
    )     
  })
  ///////////////////////////////////////////////
 
    //Animation///////////////////////
    const spring = useSpring({ 
      height: displayedCountries.length? "auto": "0px",
      opacity: displayedCountries.length? "1": "0",
      // delay:200,
      config: {duration: 500}
    })
    //////////////////////////////////


    return(
        <div
        className={styles.sortModal}
        style={{
            "opacity": sortModalState? 1:0,
            "pointerEvents":sortModalState?  "auto": "none"
          }}
        >
          <div className={styles.sortModal__label}>
              <h3>Sort pictures by your preference</h3>
              <p onClick={cancelHandler}>✕</p>
          </div>
          <div className={styles.sortModal__mainContainer}>
              <div className={styles.sortModal__mainContainer__left}>
                  <h6>Which Regions is your interest?</h6>
                  <div className={styles.sortModal__mainContainer__left__checkBox}>
                    {regionMap}
                  </div>
                  <button type="button" className="btn btn-success" onClick={DisplayCountriesHandler}>Click to see countries</button>
              </div>
              <animated.div 
                className={styles.sortModal__mainContainer__right}
                style={spring}
              >
                  <h6>Which Country is your interest?</h6>
                  <div className={styles.sortModal__mainContainer__right__checkBox}>
                      {countryMap}
                  </div>
              </animated.div>
            </div>
          <div className={styles.sortModal__buttonContainer}>
              <button type="button" className="btn btn-primary" onClick={setSortedPostsHandler}>Sort</button>
              <button type="button" className="btn btn-secondary" onClick= {cancelHandler}>Cancel</button>
              <button onClick={()=>{setTravelPosts(dummyTravelPosts)}}>aaa</button>
          </div>
        </div>
      )
}

export default SortModal; 

