import './App.css';
import { useState, useEffect } from 'react';

function PokeApp() {

  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const getPokemon = async () => {

      try {

        // Pedir la lista de Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=152&offset=0')
        const pokeLista = await response.json();
        const { results } = pokeLista;
  
        // Para cada Pokémon, pedir sus detalles
        const pokemons = results.map(async (pokemon) => {
  
          const response = await fetch(pokemon.url)

          const poke = await response.json()
  
          return {
            id: poke.id,
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default,
            ability: poke.abilities[0].ability.name
          };
        });
  
        // Guardar todos los Pokémon
        setDatos(await Promise.all(pokemons))          
        
      } catch (error) {
        setError(error.message)
        console.error('No se pudo obtener el pokemon', error)

      } finally {
        setLoading(false);
      }
      
    } 
  
    getPokemon();
  
  }, []);

  if (loading) return <div>Cargando pokémons...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="poke-container">

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Habilidad</th>
          </tr>
        </thead>
        <tbody>

          {datos.map((pokeDato) => (
            <tr key={pokeDato.id}>
              <td>
                <img 
                  src={pokeDato.img} 
                  alt={pokeDato.name} 
                  style={{ 
                    height: "120px", 
                    width: "auto", 
                    objectFit: "contain" 
                  }}                   
                />
              </td>
              <td>{pokeDato.name}</td>
              <td>{pokeDato.ability}</td>              
            </tr>
          ))}

        </tbody>
      </table>

    </div>

  );
}

export default PokeApp;
