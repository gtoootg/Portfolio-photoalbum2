import React, {useState, useContext, useEffect} from "react";
import {GoogleMap,LoadScript, Marker,InfoWindow } from "@react-google-maps/api";
import {Link} from 'react-router-dom';

import {SelectedPostIdContext} from '../../index';

type Props = {
  lat?:number| undefined
  lng?:number |undefined
  zoom:number
  multipleMarker?:boolean
  elements:object[]
  onClick?:(e:any)=>void
}


const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"; // TODO: 自分のキーをここに入力

const WorldMap: React.FC<Props> = ({lat,lng,zoom, multipleMarker, elements, onClick}) => {

  const {selectedPostId, setSelectedPostId} = useContext(SelectedPostIdContext);

  const marker = elements.map((element:any,index:number)=>{
   
    return(
      <>
      <Marker 
      position={{
        lat: Number(element.latitude),
        lng: Number(element.longitude)}}
       onClick={()=>setSelectedPostId(index)}
      />
        {selectedPostId===index&&
            <InfoWindow 
              position={{
                lat: Number(element.latitude),
                lng: Number(element.longitude)
              }} 
              >
                <Link
                    key={index}
                    to={"/detail"}
                    >
                  <img 
                    src={element.image} style={{"width":"150px","height":"100px"}}
                  />
                </Link>
            </InfoWindow>
        }
      </>
    )
  })



  if(lat === undefined && lng ===undefined){
    return(
      <div className="d-flex">
        Select Country, then google map is shown here
      </div>
    )
  }
  else{
    return (
      <LoadScript 
        googleMapsApiKey={API_KEY}
        language={"en"}
        >
        <GoogleMap       
          mapContainerStyle={ {width: "100%", height: "100%" }}
          center={{
            lat: lat,
            lng: lng}}
          zoom={zoom}
          onClick={onClick}
        >
        {
          multipleMarker? <>{marker}</>
          :
            <Marker 
            position={{
              lat: lat,
              lng: lng}}
            opacity= {0.9} 
            />
        }
        
        </GoogleMap>
        </LoadScript>
    );
  }
  
};

export default WorldMap;
