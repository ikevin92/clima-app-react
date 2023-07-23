/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useState } from 'react';

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [noResultado, setNoResultado] = useState('');

  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const consultarClima = async (datos) => {
    setNoResultado('');
    setCargando(true);
    try {
      const { ciudad, pais } = datos;

      const appId = import.meta.env.VITE_API_KEY;

      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=${1}&appid=${appId}`;

      const { data } = await axios(url);
      const { lat, lon } = data[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: clima } = await axios(urlClima);
      setResultado(clima);
    } catch (error) {
      console.log(error);
      setResultado(null);
      setNoResultado('No se encontraron resultados');
    } finally {
      setCargando(false);
    }
  };

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        resultado,
        cargando,
        noResultado,
        datosBusqueda,
        consultarClima,
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
};

export { ClimaProvider };

export default ClimaContext;
