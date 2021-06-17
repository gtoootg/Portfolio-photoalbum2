import React, { useEffect, useState, ReactNode } from "react";
import {GoogleMap,LoadScript, Marker,InfoWindow } from "@react-google-maps/api";

type Props = {
  lat:number| undefined
  lng:number |undefined
  onClick?:(e:number)=>void
}

const API_KEY = "AIzaSyAhf8RgW3KVsaUK5Oqr-JKTpASBBrHlXd8"; // TODO: 自分のキーをここに入力

const WorldMap: React.FC<Props> = ({lat,lng, onClick}) => {

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
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={ {width: "100%", height: "100%" }}
          center={{
            lat: lat,
            lng: lng}}
          zoom={3}
          onClick={onClick}
        >
        <Marker position={{
            lat: lat,
            lng: lng}}/>
        </GoogleMap>
        </LoadScript>
    );
  }
  
};

export default WorldMap;
