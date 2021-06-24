// import React, {useState, useContext, useEffect} from 'react';

// import styles from '../../../styles/mapmodal.module.scss';
// import WorldMap from './WorldMap';
// import {TravelPostsContext, DummyTravelPostsContext, TravelPostObject} from '../../index';
// import {sortModalStateContext,MapModalStateContext} from '../home/Home';

// const MapModal: React.FC<{}> = ()=> {

//     //useContext//////////////////////
//     const{travelPosts, setTravelPosts} = useContext(TravelPostsContext);
//     const{dummyTravelPosts, setDummyTravelPosts} = useContext(DummyTravelPostsContext);
//     const{sortModalState, setSortModalState} = useContext(sortModalStateContext);
//     const{mapModalState, setMapModalState} = useContext(MapModalStateContext);
//     //////////////////////////////////


//     //useState////////////////////////

//     //////////////////////////////////

    

//     //handler///////////////////////////

//     const cancelHandler:()=>void = ()=>{
//         setMapModalState(false)
//     }
   
//     //////////////////////////////


//   ///////////////////////////////////////////////
 
 

//     return(
//         <div
//         className={styles.mapModal}
//         style={{
//             "opacity": mapModalState? 1:0,
//             "pointerEvents":mapModalState?  "auto": "none"
//           }}
//         >
//             <div className={styles.mapModal__label}>
//               <h3>Sort pictures by your preference</h3>
//               <p onClick={cancelHandler}>✕</p>
//             </div>
//             <div className={styles.mapModal__mapContainer}>
//                 <WorldMap
//                     lat={0}
//                     lng={0}
//                     zoom={1}
//                     elements={dummyTravelPosts}
//                     multipleMarker={true}

//                 />
//             </div>    
//           <div className={styles.sortModal__buttonContainer}>
//               <button type="button" className="btn btn-secondary" onClick={()=>setMapModalState(false)}>Cancel</button>
//           </div>
//         </div>
//       )
// }

// export default MapModal; 