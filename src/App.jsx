import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [poke, setPoke] = useState('pikachu');
  const [pokeInfo, setPokeInfo] = useState(poke);
  const [pokeIn, setPokeIn] = useState('');
  const [loading, setLoading] = useState('Carregando...');
  const [shiny, setShiny] = useState(false);

  const getPoke = async () => {
    try {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        .then((response) => setPokeInfo(response.data));

      setLoading(false);
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
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              width: '35vw',
              margin: 'auto',
              fontSize: '3rem',
              textAlign: 'center',
            }}
          >
            PokéNome ou PokéNúmero
          </h1>
          <input
            style={{
              width: '35vw',
              margin: 'auto',
              fontSize: '2rem',
              textAlign: 'center',
            }}
            type="text"
            onChange={({ target }) => setPokeIn(target.value)}
            placeholder="Digite aqui...."
          />
          <br />
          <button
            style={{
              fontSize: '2rem',
              width: '20rem',
            }}
            onClick={handleClick}
          >
            Enviar
          </button>
          <button
            style={{ fontSize: '2rem', width: '20rem' }}
            onClick={() => setPoke(Math.floor(Math.random() * 1025))}
          >
            Poké Aleatório
          </button>
        </div>
        <div>
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
              <h1 style={{ textAlign: 'center', textTransform: 'uppercase' }}>
                {pokeInfo.forms[0].name}
                <br />({pokeInfo.id})
              </h1>
              <section style={{ display: 'flex' }}>
                <div>
                  <img
                    style={{ width: '40rem', height: '60vh', margin: 'auto' }}
                    src={
                      shiny
                        ? pokeInfo.sprites.other.showdown.front_shiny
                        : pokeInfo.sprites.other.showdown.front_default
                    }
                    alt=""
                  />
                  <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>
                    Shiny
                    <input
                      style={{
                        borderRadius: '5px',
                        width: '4rem',
                        height: '1rem',
                      }}
                      type="checkbox"
                      checked={shiny}
                      onChange={() => setShiny(!shiny)}
                    />
                  </h1>
                  <h1
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    PokéSom <audio src={pokeInfo.cries.latest} controls />
                  </h1>
                </div>
                <div>
                  <h1>Titulo</h1>
                  <h2>Subtitulo</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    corporis est eaque architecto inventore esse maxime ipsa
                    quidem, eum blanditiis molestiae provident neque, dolore
                    maiores ab fuga corrupti recusandae vero!
                  </p>
                  <br />
                  <h1>Titulo</h1>
                  <h2>Subtitulo</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iusto iure sint veniam ea consectetur rerum, nulla
                    repellendus inventore, nemo sequi libero! Nemo dolorum,
                    inventore explicabo ducimus cumque deserunt pariatur qui.
                  </p>
                  <h1>Titulo</h1>
                  <h2>Subtitulo</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    corporis est eaque architecto inventore esse maxime ipsa
                    quidem, eum blanditiis molestiae provident neque, dolore
                    maiores ab fuga corrupti recusandae vero!
                  </p>
                  <br />
                  <h1>Titulo</h1>
                  <h2>Subtitulo</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iusto iure sint veniam ea consectetur rerum, nulla
                    repellendus inventore, nemo sequi libero! Nemo dolorum,
                    inventore explicabo ducimus cumque deserunt pariatur qui.
                  </p>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default App;
