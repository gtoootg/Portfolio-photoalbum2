import React, {useState, useContext}from 'react';
import axios from 'axios';
import Head from '../common/Head';

import {TravelPostsContext, DummyTravelPostsContext, SelectedPostIdContext} from '../../index';
import WorldMap from "../common/WorldMap";
import styles from '../../../styles/map.module.scss';

const Map:(()=>JSX.Element) = () => {

    const{travelPosts, setTravelPosts} = useContext(TravelPostsContext);
    const{dummyTravelPosts, setDummyTravelPosts} = useContext(DummyTravelPostsContext);

    //Handler///////////////////////////////////
    ////////////////////////////////////////////


    //jsx//////////////////////////////////////////////////
 
    ///////////////////////////////////////////////////////
    
  
    return (
        <>
            <Head unusedIconOpacity={"0.5"} unusedIconSelect={"none"}/>
            <div className="container">
            <div className={styles.map}>
                <WorldMap
                        lat={0}
                        lng={0}
                        zoom={2}
                        elements={dummyTravelPosts}
                        multipleMarker={true}
                    />
            </div>
            </div>
        </>
    );
}

export default Map;