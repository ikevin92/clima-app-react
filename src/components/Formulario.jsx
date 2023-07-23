import { useState } from 'react';
import useClima from '../hooks/useClima';

const Formulario = () => {
  const { busqueda, datosBusqueda, consultarClima } = useClima();

  const { ciudad, pais } = busqueda;

  const [alerta, setAlerta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(busqueda).includes('')) {
      setAlerta('Todos los campos son obligatorios');
      return;
    }

    consultarClima(busqueda);
  };

  return (
    <div className="contenedor">
      {alerta && <p>{alerta}</p>}
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            name="ciudad"
            id="ciudad"
            onChange={datosBusqueda}
            value={ciudad}
          />
        </div>
        <div className="campo">
          <label htmlFor="ciudad">País</label>
          <select
            name="pais"
            id="pais"
            value={pais}
            onChange={datosBusqueda}
          >
            <option value=""> -- Seleccione un país -- </option>
            <option value="US">Estado Unidos</option>
            <option value="AR">Argentina</option>
            <option value="MX">Mexico</option>
            <option value="CO">Colombia</option>
            <option value="CR">Costa Rica</option>
            <option value="CO">Colombia</option>
            <option value="PE">Perú</option>
            <option value="ES">España</option>
          </select>
        </div>

        <input
          type="submit"
          value="Consultar clima"
        />
      </form>
    </div>
  );
};
export default Formulario;
