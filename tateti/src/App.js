import { useState } from 'react';
import './App.css'

export default function Tablero() {
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [pieza, setPieza] = useState('X');
  const [resultados, setResultados] = useState([0, 0, 0]);

  const ganador = verificarGanador(tablero);
  let mensaje;
  if (ganador) {
    mensaje = 'Ganador: ' + ganador;
  } else {
    if(tablero.some(elem => elem === null)) mensaje = 'Turno de ' + pieza;
    else mensaje = 'Empate';
  }

  function handleClick(i) {
    if(!tablero[i] && !verificarGanador(tablero)){
      const newTablero = tablero.slice();
      newTablero[i] = pieza;
      setTablero(newTablero);
      setPieza(pieza === 'X' ? 'O' : 'X');        
    }      
  }

  function reiniciar() {    
    actualizarTablero();
    actualizarResultados();            
  }

  function actualizarTablero() {    
    setTablero(Array(9).fill(null));
    setPieza('X');            
  }

  function actualizarResultados() {   
    const newResultados = resultados.slice(); 
    if(ganador === 'X'){
      newResultados[0]++;
    } 
    else if(ganador === 'O'){
      newResultados[1]++;
    } 
    else if(!tablero.some(elem => elem === null)) {
      newResultados[2]++;
    }
    setResultados(newResultados); 
  } 

  return (
    <div className="contenedor">    
      <p className='titulo'>TaTeTi</p>  
      <p className='subtitulo'>{mensaje}</p>
      <div className="fila1">
        <Cuadrado clase="cuadrado col1" valor={tablero[0]} onCuadradoClick={() =>handleClick(0)}/>
        <Cuadrado clase="cuadrado col2" valor={tablero[1]} onCuadradoClick={() =>handleClick(1)}/>
        <Cuadrado clase="cuadrado col3" valor={tablero[2]} onCuadradoClick={() =>handleClick(2)}/>        
      </div>
      <div className="fila2">
        <Cuadrado clase="cuadrado col1" valor={tablero[3]} onCuadradoClick={() =>handleClick(3)}/>
        <Cuadrado clase="cuadrado col2" valor={tablero[4]} onCuadradoClick={() =>handleClick(4)}/>
        <Cuadrado clase="cuadrado col3" valor={tablero[5]} onCuadradoClick={() =>handleClick(5)}/>
      </div>
      <div className="fila3">
        <Cuadrado clase="cuadrado col1" valor={tablero[6]} onCuadradoClick={() =>handleClick(6)}/>
        <Cuadrado clase="cuadrado col2" valor={tablero[7]} onCuadradoClick={() =>handleClick(7)}/>
        <Cuadrado clase="cuadrado col3" valor={tablero[8]} onCuadradoClick={() =>handleClick(8)}/>
      </div>  
      <div className="btn-contenedor">
        <MyBoton onClick={() =>reiniciar()}/> 
      </div>   
      <div className="resultados-contenedor">
        <div>
          <p>Victorias de X</p>
          <p>{resultados[0]}</p>
        </div>
        <div>
          <p>Empates</p>
          <p>{resultados[2]}</p>
        </div>  
        <div>
          <p>Victorias de O</p>
          <p>{resultados[1]}</p>
        </div>              
      </div>  
    </div>
  );
}

function Cuadrado({clase, valor, onCuadradoClick}) {   
  if(valor === 'X') clase = clase + ' gris';
  else if (valor === 'O') clase = clase + ' blanco';
  return <div className={clase} onClick={onCuadradoClick}>{valor}</div>;  
}

function MyBoton({onClick}) {   
  return (
  <button className='btn' onClick={onClick}>
    <span className='btn-text'>Reiniciar</span>
  </button>
  );  
}

function verificarGanador(tablero) {
  /*
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  */
  const posibilidades = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < posibilidades.length; i++) {
    const [a, b, c] = posibilidades[i];
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) return tablero[a];
  }
  return null;
}