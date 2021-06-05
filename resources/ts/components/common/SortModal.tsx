import React, {useState, useContext, useEffect, ReactNode} from 'react';

import styles from '../../../styles/sortmodal.module.scss';
import {TravelPostsContext} from '../../index';
import {sortModalStateContext} from '../home/Home';



const SortModal: React.FC<{}> = ()=> {

    //useContext//////////////////////
    const{travelPosts, setTravelPosts} = useContext(TravelPostsContext);
    const{sortModalState, setSortModalState} = useContext(sortModalStateContext);

    //////////////////////////////////

    return(
        <div
        className={styles.sortModal}
        style={{
            "opacity": sortModalState? 1:0,
            "pointerEvents":sortModalState?  "auto": "none"
          }}
        >

        </div>)
////
}

export default SortModal; 

// console.log(file);
//     setUploadData({...uploadData, image:`/img/${file.name}`});
    ///////////////////////