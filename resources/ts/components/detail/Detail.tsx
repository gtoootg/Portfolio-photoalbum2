import React, {useState, useContext}from 'react';
import axios from 'axios';
import Head from '../common/Head';

import {TravelPostsContext, SelectedPostIdContext} from '../../index';

import styles from '../../../styles/detail.module.scss';

const Detail = () => {
    const {travelPosts, setTravelPosts} = useContext(TravelPostsContext)!;       
    const {selectedPostId, setSelectedPostId} = useContext(SelectedPostIdContext);

    const IncrementPostIdHandler = (e: React.MouseEvent<HTMLElement>)=>{
        if(selectedPostId !== travelPosts.length-1){
            setSelectedPostId(selectedPostId+1)
        }
    }

    const DecrementPostIdHandler = (e: React.MouseEvent<HTMLElement>)=>{
        if(selectedPostId !== 0){
            setSelectedPostId(selectedPostId-1)
        }
    }

    // function updateTask(){
    //     axios.put('http://127.0.0.1:8000/api/task/'+editTaskData.id, 
    //     editTaskData
    //  )
    // .then(() =>{
    //     setEditTaskModal(!editTaskModal);
    //     setEditTaskData({name:"", description:""});
    //     loadTasks();
    // })
    // .catch(error => {
    //     console.log(error);
    //   });

    // }

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
        if(id>=0 && id<travelPosts.length){
            return(
                <img 
                    src={travelPosts[id].image}
                    className={styles.bottomImageList__images}
                    style={{
                        "opacity": id===selectedPostId? "1":"0.5"
                    }}
                />
            )
        }
    })        
      

    return (
        <>
            <Head unusedIconOpacity={"0.5"} unusedIconSelect={"none"}/>
            <div className="container">
                <div className={styles.SelectedPhotoContainer}>   
                    <p onClick={DecrementPostIdHandler}>
                        &lt;
                    </p>
                    <img src={travelPosts[selectedPostId].image} style={{"width":"50%"}}/>
                    <p onClick={IncrementPostIdHandler}>
                        &gt;
                    </p>
                </div><br/>
                <div 
                    className={styles.bottomImageList}
                    style={{"justifyContent": selectedPostId >= travelPosts.length-2? "flex-end":""}}    
                >
                    {photos}
                </div>  
                 
            </div>
            <button onClick={()=>deleteHandler()}>Delete</button>
                
            
        </>
       
    );
}

export default Detail;