import { useState } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import './App.css';
import imagen1 from './imagenes/1.png';
import imagen2 from './imagenes/2.png';
import imagen3 from './imagenes/3.png';
import imagen4 from './imagenes/4.png';
import imagen5 from './imagenes/5.png';
import imagen6 from './imagenes/6.png';
import imagenAtras from './imagenes/atras.png';


function App() {  
  let [tablero, setTablero] = useState(Array(12).fill(null));
  let [clickeado, setClickeado] = useState(Array(12).fill(false));  
  let [actualVolteada, setActualVolteada] = useState([null,null]);
  let [aciertos, setAciertos] = useState(0);
  let [ejecutarEfecto, setEjecutarEfecto] = useState(0);
  let [time, setTime] = useState({ horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const cartas = obtenerCartasAleatorias();
    setTablero(cartas);
  }, [ejecutarEfecto]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {  
        let newSegundos = prevTime.segundos;
          let newMinutos = prevTime.minutos;
          let newHoras = prevTime.horas;
        if(aciertos !== 6){
          newSegundos++;         
          if(newSegundos === 60){
            newSegundos = 0;
            newMinutos++;
            if(newMinutos === 60){
              newMinutos = 0;
              newHoras++;
            }
          }
        }            

        // Devuelve el nuevo estado basado en el estado anterior (prevTime)
        return { horas: newHoras, minutos: newMinutos, segundos: newSegundos };
      });
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [aciertos]);

  useLayoutEffect(() => {    
    const newClickeado = [...clickeado];
        
      if (actualVolteada[0] !== null && actualVolteada[1] !== null) {    
        const timeoutId = setTimeout(() => {   
            if (tablero[actualVolteada[0]] !== tablero[actualVolteada[1]]) {
                newClickeado[actualVolteada[0]] = false;
                newClickeado[actualVolteada[1]] = false;
                setClickeado(newClickeado);
            }else{
              setAciertos(aciertos+1);
            }        
          setActualVolteada([null, null]);
        }, 700);    
        return () => clearTimeout(timeoutId);
      }    
  }, [actualVolteada, clickeado, tablero, aciertos]);
  
  function handleClick(num) {   
    const newClickeado = [...clickeado];    
    const newActualVolteada = [...actualVolteada];   

    if(!newClickeado[num]){
      if(newActualVolteada[0] === null){
        newActualVolteada[0] = num;
        setActualVolteada(newActualVolteada);
        newClickeado[num] = true;
        setClickeado(newClickeado);        
      }
      else if(newActualVolteada[1] === null){
        newActualVolteada[1] = num;
        setActualVolteada(newActualVolteada);
        newClickeado[num] = true;
        setClickeado(newClickeado);     
      }  
    }
  }; 

  function darCarta (num){
    switch (num){
      case 1:
        return imagen1;
      case 2:
        return imagen2;
      case 3:
        return imagen3;
      case 4:
        return imagen4;       
      case 5:
        return imagen5;
      case 6:
        return imagen6;        
      default:
        break;  
    }      
  }

  function recargarPagina(){
    //window.location.reload();
    setTablero(Array(12).fill(null));
    setClickeado(Array(12).fill(false));  
    setActualVolteada([null,null]);
    setAciertos(0);
    setEjecutarEfecto(ejecutarEfecto+1);
    setTime({ horas: 0, minutos: 0, segundos: 0 });
  }

  return (
    <div className="contenedor">    
      <p className='titulo'>Memory</p> 

      <div className="fila">
        <div className="columna">
          <Imagen estado = {clickeado[0]} funcion = {darCarta(tablero[0])} handleClick ={() => handleClick(0)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[1]} funcion = {darCarta(tablero[1])} handleClick={() => handleClick(1)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[2]} funcion = {darCarta(tablero[2])} handleClick={() => handleClick(2)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[3]} funcion = {darCarta(tablero[3])} handleClick={() => handleClick(3)}/>
        </div>
      </div>

      <div className="fila">
        <div className="columna">
          <Imagen estado = {clickeado[4]} funcion = {darCarta(tablero[4])} handleClick={() => handleClick(4)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[5]} funcion = {darCarta(tablero[5])} handleClick={() => handleClick(5)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[6]} funcion = {darCarta(tablero[6])} handleClick={() => handleClick(6)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[7]} funcion = {darCarta(tablero[7])} handleClick={() => handleClick(7)}/>
        </div>
      </div>

      <div className="fila">
        <div className="columna">
          <Imagen estado = {clickeado[8]} funcion = {darCarta(tablero[8])} handleClick={() => handleClick(8)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[9]} funcion = {darCarta(tablero[9])} handleClick={() => handleClick(9)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[10]} funcion = {darCarta(tablero[10])} handleClick={() => handleClick(10)}/>
        </div>
        <div className="columna">
          <Imagen estado = {clickeado[11]} funcion = {darCarta(tablero[11])} handleClick={() => handleClick(11)}/>
        </div>
      </div>    

      <MyDiv aciertos = {aciertos} recargarPagina = {() => recargarPagina()} tiempo = {(time.horas<10? '0' + time.horas : time.horas) + 
      ':' + (time.minutos<10? '0' + time.minutos : time.minutos) + 
      ':' + (time.segundos<10? '0' + time.segundos : time.segundos)}/>  
      
      <Tiempo aciertos = {aciertos} tiempo = {(time.horas<10? '0' + time.horas : time.horas) + 
      ':' + (time.minutos<10? '0' + time.minutos : time.minutos) + 
      ':' + (time.segundos<10? '0' + time.segundos : time.segundos)}/>                    
    </div>
  );
}

function Imagen ({funcion, handleClick, estado}){  
  return (   
    <div className={`carta ${estado ? 'volteada' : ''}`} onClick={handleClick}>
      <div className='cara frontal'>
        <img className='carta-img' src={imagenAtras} alt='CartaMisteriosa'/>   
      </div>   
      <div className='cara trasera'>
        <img className='carta-img' src={funcion} alt='CartaMisteriosa'/>   
      </div>     
    </div> 
  );
}

function MyDiv ({aciertos, recargarPagina, tiempo}){     
  return (       
    <div className={`fin ${aciertos===6 ? '' : 'invisible'}`}>     
      <p>Felicidades, has ganado en</p> 
      <br></br>
      <p>{tiempo}</p>     
      <button className='boton' onClick={recargarPagina}>Volver a jugar</button>
    </div> 
  );
}

function Tiempo ({aciertos, tiempo}){     
  return (        
    <p className={`tiempo ${aciertos!==6 ? '' : 'invisible'}`}>{tiempo}</p>
  );
}

function obtenerCartasAleatorias() {
  return [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6].sort(() => Math.random() - 0.5);
}

export default App;
