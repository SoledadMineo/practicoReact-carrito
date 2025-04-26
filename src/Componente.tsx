import { useState } from 'react'
import './Componente.css'

function Componente({instrumento='', imagen='', descripcion='', initialHayStock=true}) {
    const [contador, incrementarCantidad] = useState(0);
    const text = initialHayStock ? 'Comprar' : 'Sin Stock';
    const buttonClassName = initialHayStock
    ? 'btn btn-primary'
    : 'btn btn-primary buttonSinStock';
    const handleClick = () => {
        initialHayStock ? incrementarCantidad((contador) => contador + 1) : 0;
      }
  return (
    <>
    <div className="col-sm-4 mb-3 mb-sm-0">
        <div className="card tarjeta">
        <div>
          <img src={`/public/images/${imagen}`} className="card-img-top img-altura" alt={imagen}></img>
        </div>
        <div className="card-body altura-cuerpo">
            <h5 className="card-title">{instrumento}</h5>
            <p className="card-text">{descripcion}</p>
            <a href="#" onClick={handleClick} className={buttonClassName}>{text}</a>
            <p>{contador}</p>
        </div>
        </div>
    </div>
    </>
  )
}

export default Componente