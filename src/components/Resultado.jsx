import useClima from '../hooks/useClima';
import Loading from './Loading';

const Resultado = () => {
  const { resultado, cargando, noResultado } = useClima();

  if (cargando) return <Loading />;
  if (!resultado && !noResultado) return <p>El clima se va a mostrar aquí</p>;
  if (noResultado) return <p>{noResultado}</p>;

  const { name, main } = resultado;

  // Grados Kelvin
  const kelvin = 273.15;

  return (
    <div className="contenedor clima">
      <h2>El Clima de {name} es:</h2>
      <p>
        {parseInt(main.temp - kelvin)}
        <span>&#x2103;</span>
      </p>

      <div className="temp_min_max">
        <p>
          Mín: {parseInt(main.temp_min - kelvin)}
          <span>&#x2103;</span>
        </p>
        <p>
          Máx: {parseInt(main.temp_max - kelvin)}
          <span>&#x2103;</span>
        </p>
      </div>
    </div>
  );
};
export default Resultado;
