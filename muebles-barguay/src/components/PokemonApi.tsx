import React, { useState} from 'react';

interface Pokemon {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    }
  }[];
  sprites: {
    front_default: string;
  };
}

const PokemonApi: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (input: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError('Error al buscar el Pokémon. Por favor, intenta de nuevo.');
      setPokemon(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchPokemon(searchTerm);
    } else {
      fetchRandomPokemon();
    }
  };

  const fetchRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(randomId.toString());
  };

  return (
    <div className="pokemon-api">
      <h2>Buscador de Pokémon</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca un Pokémon o deja vacío para aleatorio"
        />
        <button type="submit">Buscar</button>
      </form>

      {isLoading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {pokemon && (
        <div className="pokemon-card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <p>Tipos: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonApi;