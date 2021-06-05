import React, {useState, useEffect, createContext}from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UploadModal from './common/UploadModal';
// import SortModal from './common/SortModal';
import SortModal2 from './common/SortModal2';
import styles from '../../css/top.module.scss'

export const TravelListsContext = createContext()
export const ModalStateContext = createContext()
// export const SortModalStateContext = createContext()
export const SortModalStateContext2 = createContext()
export const SortedStateContext = createContext()

function Top() {

    const[travelLists,setTravelLists] = useState([]);
   
    //ModalState//
    const [modal, setModal] = useState(false);
    // const [sortModal, setSortModal] = useState(false);
    const [sortModal2, setSortModal2] = useState(false);
    //////////////

    //Sort////////
    const [sortedState, setSortedState] = useState({region:[],country:[]});
    //////////////
    function loadTravelLists(){
        axios.get('http://127.0.0.1:8000/api/travellists')
        .then(response=>setTravelLists(response.data))
        .catch(error=>console.log(error))
    }

    // const sortTravelLists = () => {
    //     const filter = travelLists.filter(function(element){
    //         if(sortedState.region==="Null"){
    //             return travelLists
    //         }else if(sortedState.country==="Null"){
    //             return element.region === sortedState.region
    //         }else{
    //             return (element.region === sortedState.region && element.country === sortedState.country) 
    //         }
    //     })
    //     setTravelLists(filter)
    // }


    // const refilter = async() =>{
    //     await loadTravelLists()
    //     const filter = travelLists.filter(function(element){
    //             return element.region === "Asia"})
    //     // reload
    //     // filter
    //     await setTravelLists(filter);
    //     setTravelLists(filter);
    // }


    const sortTravelLists2 = () => {
        if(!sortedState.country.length){
            const filter =travelLists.filter(x=>sortedState.region.includes(x.region))
            setTravelLists(filter)
        }else{
            const filter =travelLists.filter(x=>sortedState.country.includes(x.country))
            setTravelLists(filter)
        }
    }
    
    useEffect(()=>loadTravelLists(),[]);
    useEffect(()=>loadTravelLists(),[modal]);
    // useEffect(()=>loadTravelLists(),[sortModal]);
    // useEffect(()=>sortTravelLists(),[sortedState]);
    useEffect(()=>sortTravelLists2(),[sortedState]);
   


    let travelList = travelLists.map(travelList=>{
        return(
                <Link 
                    key={travelList.id}
                    to={`/detail/${travelList.id}`}
                    className={styles.uploadedItemContainer}
                >
                    <img src={travelList.image} className={styles.image}/>
                </Link>                
        )
    })

    return (
        <div className="container">
            <TravelListsContext.Provider value={[travelLists, setTravelLists]}>
            <SortedStateContext.Provider value={[sortedState, setSortedState]}>
            <ModalStateContext.Provider value={[modal,setModal]}>
                <SortModalStateContext2.Provider value={[sortModal2,setSortModal2]}>
                    <div className="container d-flex flex-row">
                        <UploadModal 
                            buttonLabel="upload"
                        />
                        <SortModal2 
                            buttonLabel="sort2"
                        />
                        <div 
                            onClick={()=>console.log(sortedState)}
                        > check sortedState
                        </div>
                    </div>
                    <div className="row">
                        {travelList}
                    </div>
                </SortModalStateContext2.Provider>
            </ModalStateContext.Provider>
            </SortedStateContext.Provider>
            </TravelListsContext.Provider>
        </div>
    );
}

export default Top;
