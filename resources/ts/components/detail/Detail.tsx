import React, {useState, useContext}from 'react';
import axios from 'axios';
import Head from '../common/Head';

import {TravelPostsContext, DummyTravelPostsContext, SelectedPostIdContext} from '../../index';
import WorldMap from "../common/WorldMap";
import styles from '../../../styles/detail.module.scss';

import {GoogleMap,LoadScript, Marker,InfoWindow } from "@react-google-maps/api";

const Detail = () => {
    const {travelPosts, setTravelPosts} = useContext(TravelPostsContext)!;    
    const{dummyTravelPosts, setDummyTravelPosts} = useContext(DummyTravelPostsContext);   
    const {selectedPostId, setSelectedPostId} = useContext(SelectedPostIdContext);

    const IncrementPostIdHandler = (e: React.MouseEvent<HTMLElement>)=>{
        if(selectedPostId !== dummyTravelPosts.length-1){
            setSelectedPostId(selectedPostId+1)
        }
    }

    const DecrementPostIdHandler = (e: React.MouseEvent<HTMLElement>)=>{
        if(selectedPostId !== 0){
            setSelectedPostId(selectedPostId-1)
        }
    }

    const deleteHandler = ()=>{
        // setEditTaskData({id,name,description})
        axios.delete('api/detail/delete/'+ travelPosts[selectedPostId].id, 
        travelPosts[travelPosts[selectedPostId].id]
     )
    .then(() =>{
        alert('deleted!!')
    })
    .catch(error => {
        console.log(error);
      });

    }


    let ids:[number,number,number,number,number] = [
        selectedPostId-2,
        selectedPostId-1,
        selectedPostId, 
        selectedPostId+1, 
        selectedPostId+2
    ]

    const photos = ids.map(id=>{
        if(id>=0 && id<dummyTravelPosts.length){
            return(
                <img 
                    src={dummyTravelPosts[id].image}
                    className={styles.bottomImageList__images}
                    style={{
                        "opacity": id===selectedPostId? "1":"0.5"
                    }}
                />
            )
        }
    })        

    // const googleMap = ()=>{

    //     const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"; // TODO: Input API keys of myself

    //     return(
    //         <LoadScript googleMapsApiKey={API_KEY}>
    //             <GoogleMap
    //             mapContainerStyle={ {width: "100%", height: "100%" }}
    //             center={{
    //                 lat: 10,
    //                 // dummyTravelPosts[selectedPostId].lattitude,
    //                 lng: 10,
    //                 // dummyTravelPosts[selectedPostId].longitude,
    //             }}
    //             zoom={3}
    //             >
    //            
    //             {/* <Marker position={{
    //                 lat: dummyTravelPosts[selectedPostId].lattitude,
    //                 lng: dummyTravelPosts[selectedPostId].longitude,
    //                 icon: dummyTravelPosts[selectedPostId].image
    //                 }}/> */}
    //             </GoogleMap>
    //         </LoadScript>
    //     )
    // }

    
    

    return (
        <>
            <Head unusedIconOpacity={"0.5"} unusedIconSelect={"none"}/>
            <div className="container">
                <div className={styles.SelectedPhotoContainer}>   
                    <p onClick={DecrementPostIdHandler}>
                        &lt;
                    </p>
                    <img src={dummyTravelPosts[selectedPostId].image} style={{"width":"50%"}}/>
                    <p onClick={IncrementPostIdHandler}>
                        &gt;
                    </p>
                </div><br/>
                <div 
                    className={styles.bottomImageList}
                    style={{"justifyContent": selectedPostId >= dummyTravelPosts.length-2? "flex-end":""}}    
                >
                    {photos}
                </div>  
                 
            </div>
            <div className={styles.map}>
            <WorldMap 
                lat={Number(dummyTravelPosts[selectedPostId].latitude)}
                lng={Number(dummyTravelPosts[selectedPostId].longitude)} 
                icon={dummyTravelPosts[selectedPostId].image} 
            />    
            </div>
            <button onClick={()=>deleteHandler()}>Delete</button>
            <button onClick={()=>console.log(typeof(dummyTravelPosts[selectedPostId].latitude))}>type</button>
                
            
        </>
       
    );
}

export default Detail;