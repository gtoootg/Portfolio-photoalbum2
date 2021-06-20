import React, { useEffect, useState, ReactNode } from "react";
import {GoogleMap,LoadScript, Marker,InfoWindow } from "@react-google-maps/api";

type Props = {
  lat:number| undefined
  lng:number |undefined
  icon:any
  zoom:number
  onClick?:(e:number)=>void
}

const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"; // TODO: 自分のキーをここに入力

const WorldMap: React.FC<Props> = ({lat,lng, icon,zoom, onClick}) => {

  if(lat === undefined && lng ===undefined){
    return(
      <div className="d-flex">
      <div>
        Select Country, then google map is shown here
      </div>
      </div>
      
    )
  }else{
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
        <Marker 
            position={{
              lat: lat,
              lng: lng}}
            icon={{
              url:icon,
              scaledSize: {width: 60, height: 40},
            }}
            opacity= {0.9}
            
            // options={{border=solid 1px white}}
        />
        </GoogleMap>
        </LoadScript>
    );
  }
  
};

export default WorldMap;
