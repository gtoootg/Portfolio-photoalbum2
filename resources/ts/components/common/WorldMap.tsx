import React, { useEffect, useState, ReactNode } from "react";
import {GoogleMap,LoadScript, Marker,InfoWindow } from "@react-google-maps/api";

type Props = {
  lat?:number| undefined
  lng?:number |undefined
  // icon:any
  zoom:number
  multipleMarker?:boolean
  elements:object[]
  onClick?:(e:number)=>void
}

const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"; // TODO: 自分のキーをここに入力

const WorldMap: React.FC<Props> = ({lat,lng,zoom, multipleMarker, elements, onClick}) => {

  const [id, setId]= useState<any>()

  const marker = elements.map((element:any,index:number)=>{
    const setLocationHandler:(e:any)=>void = (e)=>{
      const lat = e.latLng.lat()
      const lng =e.latLng.lng()
      setId(index)
      // setMapGeoCode({latitude:lat, longitude: lng})
    }
    // const [toggle, setToggle] = useState(false);
    // setToggle({...toggle, index:false})
    // let createToggleObject:any ={}
    // createToggleObject.index=false
    // // setToggle(createToggleObject)
    

    return(
      <>
      <Marker 
      position={{
        lat: Number(element.latitude),
        lng: Number(element.longitude)}}
      onClick={setLocationHandler}
      />
        {id===index&&
          <InfoWindow 
            position={{
              lat: Number(element.latitude),
              lng: Number(element.longitude)
            }}    
            >
          <img src={element.image} style={{"width":"150px","height":"100px"}}/>
        </InfoWindow>
      }
      </>
    )
   
  })



  if(lat === undefined && lng ===undefined){
    return(
      <div className="d-flex">
      <div>
        Select Country, then google map is shown here
      </div>
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
