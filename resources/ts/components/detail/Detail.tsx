import React, {useState, useContext}from 'react';
import axios from 'axios';
import Head from '../common/Head';

import {TravelPostsContext, DummyTravelPostsContext, SelectedPostIdContext} from '../../index';
import WorldMap from "../common/WorldMap";
import styles from '../../../styles/detail.module.scss';

const Detail:(()=>JSX.Element) = () => {

    const {travelPosts, setTravelPosts} = useContext(TravelPostsContext)!;    
    const{dummyTravelPosts, setDummyTravelPosts} = useContext(DummyTravelPostsContext);   
    const {selectedPostId, setSelectedPostId} = useContext(SelectedPostIdContext);


    //Handler///////////////////////////////////
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

    const deleteHandler = (e: React.MouseEvent<HTMLElement>)=>{
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



    //jsx//////////////////////////////////////////////////
    function UpperContainer(){
        return(
            <div className={styles.upperContainer}>

                    <div className={styles.upperContainer__selectedPhotoContainer}>   
                        <p onClick={DecrementPostIdHandler}>
                            &lt;
                        </p>
                        <img
                            className={styles.upperContainer__selectedPhotoContainer_selectedPhoto}
                            src={dummyTravelPosts[selectedPostId].image} style={{"width":"70%"}}
                            />
                        <p onClick={IncrementPostIdHandler}>
                            &gt;
                        </p>
                    </div><br/>
                    <div 
                        className={styles.upperContainer__bottomImageList}
                        style={{"justifyContent": selectedPostId >= dummyTravelPosts.length-2? "flex-end":""}}    
                    >
                        {photos}
                    </div>  
                </div>
          
        )
    }

    function LowerContainer(){

        return(
            <div className={styles.lowerContainer}>
                <div className={styles.lowerContainer__left}>
                    <h4>{dummyTravelPosts[selectedPostId].title}</h4>
                    <h6>region: {dummyTravelPosts[selectedPostId].region}</h6>
                    <h6>country: {dummyTravelPosts[selectedPostId].country}</h6>
                    <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
                </div>
                <div className={styles.lowerContainer__right}>
                    <WorldMap
                        lat={Number(dummyTravelPosts[selectedPostId].latitude)}
                        lng={Number(dummyTravelPosts[selectedPostId].longitude)}
                        zoom={12} 
                        multipleMarker={false}
                        elements={dummyTravelPosts}
                    />    
                </div>
            </div>
        )
    }

    let ids:[number,number,number,number,number] = [
        selectedPostId-2,
        selectedPostId-1,
        selectedPostId, 
        selectedPostId+1, 
        selectedPostId+2
    ]

    const photos: (JSX.Element | undefined)[] = ids.map(id=>{
        if(id>=0 && id<dummyTravelPosts.length){
            return(
                <img 
                    src={dummyTravelPosts[id].image}
                    className={styles.upperContainer__bottomImageList__images}
                    style={{
                        "opacity": id===selectedPostId? "1":"0.5"
                    }}
                />
            )
        }
    })        
    ///////////////////////////////////////////////////////

    return (
        <>
            <Head unusedIconOpacity={"0.5"} unusedIconSelect={"none"}/>
            <UpperContainer/>
            <LowerContainer/>
        </>
    );
}

export default Detail;