import React, {useState, useEffect, useContext}from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

import styles from '../../../styles/main.module.scss';
import {TravelPostsContext, SelectedPostIdContext, uploadModalStateContext } from '../../index';


const Main = ()=> {
    
    const {travelPosts, setTravelPosts} = useContext(TravelPostsContext)!;
    const {selectedPostId, setSelectedPostId} = useContext(SelectedPostIdContext);
    const {uploadModalState, setUploadModalState} = useContext(uploadModalStateContext);

    const loadTravelPosts = () => {
        //API connection to MAMP local server/////////////
        // axios.get('http://127.0.0.1:8000/api/travelposts')
        //////////////////////////////////////////////////

        // API connection to CLEAR DB//////////////////////

        axios.get('api/posts')
 
        ///////////////////////////////////////////////////

        .then(response=>setTravelPosts(response.data))
        // .then(()=>console.log(travelPosts))
        .catch(error=>console.log(error))
        // console.log("aaa")
    }

    useEffect(loadTravelPosts,[]);


    let Posts = travelPosts.map((travelPost:any,index:number) =>{
        return(
            <Link
                className={styles.main__imageContainer}
                to={"/detail"}
                style={{"backgroundImage":`url(${travelPost.image})`}} 
                onClick={()=>setSelectedPostId(index)}
            >
                <div className={styles.main__imageContainer__title}>
                    <p>
                        {travelPost.title}
                    </p>
                </div>
            </Link>
                
            
            
            
        )
    })

    return (
        <div 
            className="container"
            // style = {{
            //     "opacity": "1",
            //     "pointerEvents": uploadModalState!==false? "auto":"none"
            // }}
        >
            <main 
                className ={styles.main}
               
            >
                {Posts}
            </main>
            <button onClick={()=>console.log(travelPosts)}>check travelPosts</button>
            
        </div>
    );
}

export default Main; 
