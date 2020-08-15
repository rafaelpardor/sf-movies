import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {createLogEntry} from './API';

import './logEntryForm.css';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

	return(
		<form onSubmit={handleSubmit(onSubmit)} className="entry-form">
			{ error ? <h3 className="error">{error}</h3> : null }
			<label htmlFor="apiKey">Insert Api Key</label>
      <input type="password" name="apiKey" required ref={register} />
			<label htmlFor="title">Titulo</label>
			<input name="title" required ref={register} />

			<label htmlFor="releaseYear">Anio de lanzamiento:</label>
			<input name="releaseYear" ref={register}/>

			<label htmlFor="location">Locacion</label>
			<input name="location" required ref={register}/>

			<label htmlFor="productionComp">Productora</label>
			<input name="productionComp" ref={register}/>
			<label htmlFor="director">Directora </label>
			<input name="director" ref={register}/>
			<label htmlFor="distributor">Distribuidor</label>
			<input name="distributor" ref={register}/>

			<label htmlFor="mainActor">Actor Principal</label>
			<input name="mainActor" ref={register}/>
			<button disabled={loading}>{ loading ? 'loading...' : 'Crear'}</button>

		</form>
	);
};

export default LogEntryForm;
