import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import imagen1 from './imagenes/1.png';
import imagen2 from './imagenes/2.png';
import imagen3 from './imagenes/3.png';
import imagen4 from './imagenes/4.png';
import imagen5 from './imagenes/5.png';
import imagen6 from './imagenes/6.png';
import imagen7 from './imagenes/7.png';

export default function Juego() {    
  const [miPalabra, setMiPalabra] = useState(null); 
  const [mensaje, setMensaje] = useState(null);  
  const [letrasMiPalabra, setLetrasMiPalabra] = useState(null);   
  const [palabraOculta, setPalabraOculta] = useState(null);
  const [fallos, setFallos] = useState(0);
  const [enJuego, setEnJuego] = useState(true);
  const [ejecutarEfecto, setEjecutarEfecto] = useState(0);
  const [letras, setLetras] = useState({
    'A': false,
    'B': false,
    'C': false,
    'D': false,
    'E': false,
    'F': false,
    'G': false,
    'H': false,
    'I': false,
    'J': false,
    'K': false,
    'L': false,
    'M': false,
    'N': false,
    'Ñ': false,
    'O': false,
    'P': false,
    'Q': false,
    'R': false,
    'S': false,
    'T': false,
    'U': false,
    'V': false,
    'W': false,
    'X': false,
    'Y': false,
    'Z': false
  });

  useEffect(() => {    
    if (fallos === 6) {
      setMensaje('Lo siento, has perdido, la palabra era "' + miPalabra + '"');
      setEnJuego(false);
    } else if (palabraOculta && !palabraOculta.includes('_')){
      setMensaje('Felicidades, has ganado');
      setEnJuego(false);
    }    
  }, [fallos, palabraOculta, miPalabra]);

  useEffect(() => {    
    const newPalabra = obtenerPalabraAleatoria(); 
    setMiPalabra(newPalabra);  
    const newLetrasMiPalabra = newPalabra.split("");
    setLetrasMiPalabra(newLetrasMiPalabra);  
    let guiones = Array(newLetrasMiPalabra.length).fill('_');

    if(newLetrasMiPalabra.includes(' ')){
      for (let i = 0; i < newLetrasMiPalabra.length; i++) {
        if (newLetrasMiPalabra[i] === ' ') {
          guiones[i] = ' ';
        }
      }
    }
    setPalabraOculta(guiones);    
  }, [ejecutarEfecto]);
  
  function handleClick(letra) {    
    if(enJuego){
      if (!letras[letra]) {
        setLetras(prevLetras => {
          return{ ...prevLetras, [letra]: true };        
        });

        if(!letrasMiPalabra.includes(letra)){
          let newFallos = fallos+1;
          setFallos(newFallos);
        }
        
        else{
          let guiones = [...palabraOculta];
          for (let i = 0; i < letrasMiPalabra.length; i++) {
            if (letrasMiPalabra[i] === letra) {
              guiones[i] = letra;
            }
          }
          setPalabraOculta(guiones);
        }
      }
    }    
  }

  function obtenerImagen (){
    switch (fallos){
      case 0:
        return imagen1;
      case 1:
        return imagen2;
      case 2:
        return imagen3;
      case 3:
        return imagen4;
      case 4:
        return imagen5;       
      case 5:
        return imagen6;
      case 6:
        return imagen7;        
      default:
        break;  
    }      
  }

  function reiniciar() {
    setMiPalabra(null);  
    setMensaje(null);  
    setLetrasMiPalabra(null);   
    setPalabraOculta(null);
    setFallos(0);
    setEnJuego(true);
    setLetras({
      'A': false,
      'B': false,
      'C': false,
      'D': false,
      'E': false,
      'F': false,
      'G': false,
      'H': false,
      'I': false,
      'J': false,
      'K': false,
      'L': false,
      'M': false,
      'N': false,
      'Ñ': false,
      'O': false,
      'P': false,
      'Q': false,
      'R': false,
      'S': false,
      'T': false,
      'U': false,
      'V': false,
      'W': false,
      'X': false,
      'Y': false,
      'Z': false
    });  
    setEjecutarEfecto(ejecutarEfecto+1);       
  }

  const botones = [];
  for (let letra in letras) {
    botones.push(
      <Letras key={letra} letra={letra} estado={letras[letra]} estado2={enJuego} onClick={() => handleClick(letra)}/>         
    );
  }

  return (
    <div className="contenedor">     
     
      <div className={`${enJuego ? 'invisible' : 'fin'}`}>
        {mensaje}
      </div>

      <p className='titulo'>Ahorcado</p>       
      
      <div className="img-contenedor">
        <Imagen funcion = {obtenerImagen()}/>
      </div> 

      <p className='palabra'>{palabraOculta}</p>  

      <div className="btn-contenedor">
        {botones}
      </div>               

      <div className="btn-contenedor">        
        <MyBotonReinicio onClick={() =>reiniciar()}/> 
      </div> 
    </div>
  );
}

function MyBotonReinicio({onClick}) {   
  return (
  <button className='btn' onClick={onClick}>
    <span className='btn-text'>Reiniciar</span>
  </button>
  );  
}

function Letras({letra, estado, estado2, onClick}) {  
  return (
    <button className={(!estado && estado2)?'btn':'nobtn'} onClick={onClick}>
        <span className='btn-text'>{letra}</span>
    </button>
  ); 
}

function Imagen({funcion}) {  
  return (
    <img className='img' src={funcion} alt='ahorcado'/>
  ); 
}

function obtenerPalabraAleatoria() {
  const animales = ['CALAMAR', 'FOCA', 'DELFIN', 'PEZ LEON', 'CACHALOTE', 'BALLENA FRANCA', 'ANGUILA ELECTRICA', 
  'MEDUSA', 'BALLENA AZUL', 'PEPINO DE MAR', 'TIBURON', 'SARDINAS', 'TRUCHA', 'PULPO', 'CARACOL', 'TORTUGA MARINA', 
  'PEZ GLOBO', 'LANGOSTA', 'CARPA DORADA', 'ALMEJA', 'CORAL', 'PIRAÑA', 'BACALAO', 'CABALLITO DE MAR', 'ESTRELLA DE MAR', 
  'ORCA', 'CAMELLO', 'LOBO', 'TOPO', 'LIEBRE', 'PANTERA', 'GALLINA', 'GATO', 'PERRO', 'TARANTULA', 'OVEJA', 'CERDO', 
  'IGUANA', 'BUFALO', 'GUSANO', 'MAPACHE', 'ALCE', 'ESCORPION', 'ELEFANTE', 'VENADO', 'OSO POLAR', 'ARAÑA', 'RINOCERONTE', 
  'MULA', 'ORANGUTAN', 'RATA', 'CHITA', 'AVESTRUZ', 'LEOPARDO', 'GORILA', 'SERPIENTE', 'GANSO', 'RATON', 'COCODRILO', 
  'TIGRE', 'ANACONDA', 'GALLO', 'ÑANDU', 'CABALLO', 'CABRA', 'JAGUAR', 'VACA', 'VIBORA', 'CASTOR', 'RANA', 'CANGURO', 
  'HAMSTER', 'CONEJO', 'ASNO', 'LAGARTIJA', 'BECERRO', 'ALACRAN', 'MANDRIL', 'ARMADILLO', 'CAIMAN', 'OSO', 'CAMALEON', 
  'TORTUGA', 'KOALA', 'ARDILLA', 'HORMIGA', 'BURRO', 'JIRAFA', 'LEON', 'MONO', 'TORO'];
  const randomIndex = Math.floor(Math.random() * animales.length); 
    
  return animales[randomIndex];  
}