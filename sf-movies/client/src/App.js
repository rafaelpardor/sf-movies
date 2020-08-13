import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import {listLogEntries} from './API';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10
  }); 

  useEffect(()=>{
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
    })();
  }, []);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/vaposa9806/ckds7v7cb0ozp19pj2w5mwgt4'
      mapboxApiAccessToken={process.env.REACT_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default App;
