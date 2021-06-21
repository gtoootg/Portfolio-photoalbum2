import React, {useEffect, useContext}from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import styles from '../../../styles/main.module.scss';
import {TravelPostsContext,TravelPostObject, DummyTravelPostsContext, SelectedPostIdContext, uploadModalStateContext } from '../../index';


const Main: React.FC<{}> = ()=> {
    
    const {travelPosts, setTravelPosts} = useContext(TravelPostsContext)!;
    const{dummyTravelPosts, setDummyTravelPosts} = useContext(DummyTravelPostsContext);
    const {selectedPostId, setSelectedPostId} = useContext(SelectedPostIdContext);
    const {uploadModalState, setUploadModalState} = useContext(uploadModalStateContext);

    const loadTravelPosts:()=>void = () => {
        //API connection to MAMP local server/////////////
        // axios.get('http://127.0.0.1:8000/api/travelposts')
        //////////////////////////////////////////////////

        // API connection to CLEAR DB//////////////////////
        axios.get('api/posts')
        ///////////////////////////////////////////////////
        .then(response=>{
            setTravelPosts(response.data)
            setDummyTravelPosts(response.data)
        })
        .catch(error=>console.log(error))
    }

    useEffect(loadTravelPosts,[]);

    const Posts : React.FC<{}>= travelPosts.map((travelPost:TravelPostObject,index:number) =>{
        return(
            <Link
                key={index}
                className={styles.main__imageContainer}
                to={"/detail"}
                style={{"backgroundImage":`url(${travelPost.image})`}} 
                onClick={()=>setSelectedPostId(index)}
            >
                <div className={styles.main__imageContainer__title}>
                    <h6>
                        {travelPost.title}
                    </h6>
                </div>
            </Link>
        )
    })

    return (
        <div className="container">
            <main className ={styles.main}  >
                {Posts}
            </main>            
        </div>
    );
}

export default Main; 
