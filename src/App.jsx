import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [poke, setPoke] = useState('pikachu');
  const [pokeIn, setPokeIn] = useState('');
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState('Carregando...');

  const getPoke = async () => {
    try {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        .then(
          (response) =>
            axios(response.data.forms[0].url).then((response) =>
              setImg(response.data.sprites),
            ),
          setLoading(false),
        );
    } catch {
      setLoading('Desculpe pokémon não encontrado 😞');
    }
  };

  useEffect(() => {
    getPoke();
  }, [poke]);

  const handleClick = () => {
    if (pokeIn.trim() != '') {
      setPoke(pokeIn.toLowerCase());
    }
  };

  return (
    <form
      style={{ fontFamily: 'sans-serif' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        style={{
          width: '100vw',
          padding: '1rem 1rem ',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <h1
          style={{
            width: '50rem',
            margin: 'auto',
            fontSize: '3rem',
            textAlign: 'center',
          }}
        >
          PokéNome ou PokéNúmero
        </h1>
        <input
          style={{
            width: '50rem',
            margin: 'auto',
            fontSize: '3rem',
            textAlign: 'center',
          }}
          type="text"
          onChange={({ target }) => setPokeIn(target.value)}
          placeholder="Digite aqui...."
        />
        <button
          style={{ width: '10rem', margin: 'auto', fontSize: '3rem' }}
          onClick={handleClick}
        >
          Enviar
        </button>

        {loading ? (
          <h1
            style={{
              width: '50rem',
              margin: 'auto',
              fontSize: '3rem',
              textAlign: 'center',
            }}
          >
            {loading}
          </h1>
        ) : (
          <>
            <img
              style={{ width: '50rem', height: '100rem', margin: 'auto' }}
              src={img.front_default}
              alt=""
            />
            <img
              style={{ width: '50rem', height: '100rem', margin: 'auto' }}
              src={img.front_shiny}
              alt=""
            />
          </>
        )}
      </div>
    </form>
  );
}

export default App;
