import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './logEntryForm';
import './App.css'

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 33.65,
    longitude: -117.70,
    zoom: 8
  });

  const getEntries = async() => {
  	const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [ longitude, latitude ] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/vaposa9806/ckds7v7cb0ozp19pj2w5mwgt4'
      mapboxApiAccessToken={process.env.REACT_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
	    {
	    	logEntries.map(entry => (
	    		<React.Fragment key={entry._id}>
		    		<Marker
		    			latitude={entry.latitude}
		    			longitude={entry.longitude}
		    		>
		    			<div
								onClick={() => setShowPopup({
		    					[entry._id]: true,
		    				})}
		    			>
			    			<svg
			            style={{
			              height: `${3 * viewport.zoom}px`,
			              width: `${3 * viewport.zoom}px`,
			            }}
			            version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
			            <g>
			        	    <g>
			          		  <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
			                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
			                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
			              </g>
			            </g>
			          </svg>
	            </div>
		    		</Marker>
		    		{
		    			showPopup[entry._id] ? (
		    				<Popup
									latitude={entry.latitude}
		    					longitude={entry.longitude}
		    					closeButton={true}
		    					closeOnClick={false}
		    					dynamicPosition={true}
		    					onClose={() => setShowPopup({})}
		    					anchor="top"
		    				>
		    				<div className="popup">
		    					<h3>{entry.title}</h3>
		    					<p>{entry.mainActor}</p>
		    				</div>
		    				</Popup>
		    			) : null
		    		}
	    	</React.Fragment>
	    	))
	    }
	    {
	    	addEntryLocation ? (
	    		<>
	    		<Marker
	    			latitude={addEntryLocation.latitude}
	    			longitude={addEntryLocation.longitude}
	    		>
		    		<div>
			    		<svg
		            style={{
		              height: `${3 * viewport.zoom}px`,
		              width: `${3 * viewport.zoom}px`,
		            }}
		            version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
		            <g>
		        	    <g>
		          		  <path
		          		   d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
		                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
		                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
		                	/>
		              	</g>
		            </g>
		          </svg>
						</div>
		    	</Marker>
		      <Popup
		        latitude={addEntryLocation.latitude}
		        longitude={addEntryLocation.longitude}
		        closeButton={true}
	          closeOnClick={false}
	          dynamicPosition={true}
	          onClose={() => setAddEntryLocation(null)}
	          anchor="top" >
	          <div className="popup">
	            <LogEntryForm onClose={() => {
	              setAddEntryLocation(null);
	              getEntries();
	            }} location={addEntryLocation} />
	          </div>
	        </Popup>
	    		</>
	    	) : null
	    }
    </ReactMapGL>
  );
}

export default App;
