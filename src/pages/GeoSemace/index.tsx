import MapaGoogle from "@/components/MapaGoogle";
import React from "react";

export default function GeoSemace() {
  return <>
   <MapaGoogle 
        center={{ lat: -3.71722, lng: -38.5433 }} 
        zoom={12}
        stats={{ camadas: 150, tipos: 75, fontes: 30 }}
      />
  </>;
}
