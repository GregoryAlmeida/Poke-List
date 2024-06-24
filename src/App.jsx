import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [poke, setPoke] = useState('pikachu');
  const [pokeInfo, setPokeInfo] = useState(poke);
  const [pokeIn, setPokeIn] = useState('');
  const [loading, setLoading] = useState('Carregando...');
  const [shiny, setShiny] = useState(false);
  const [allType, setAllType] = useState();
  const [species, setSpecies] = useState();

  const getPoke = async () => {
    try {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        .then((response) => setPokeInfo(response.data));

      await axios
        .get(pokeInfo.types[0].type.url)
        .then((response) => setAllType(response.data));

      setLoading(false);
    } catch {
      setLoading('Escreva um PokéNome ou PokéNúmero válido 😁');
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
      style={{
        fontFamily: 'sans-serif',
      }}
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
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            PokéNome ou PokéNúmero
          </h1>
          <input
            style={{
              width: '35vw',
              margin: 'auto',
              fontSize: '1.5rem',
              textAlign: 'center',
            }}
            type="text"
            onChange={({ target }) => setPokeIn(target.value)}
            placeholder="Digite aqui...."
          />
          <br />
          <button
            style={{
              fontSize: '1.5rem',
              width: '20rem',
            }}
            onClick={handleClick}
          >
            Enviar
          </button>
          <button
            style={{ fontSize: '1.5rem', width: '20rem' }}
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
                fontSize: '2rem',
                textAlign: 'center',
              }}
            >
              {loading}
            </h1>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  marginTop: '5rem',
                }}
              >
                <button
                  style={{
                    fontSize: '1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setPoke(pokeInfo.id - 1)}
                >
                  Anterior
                </button>

                <h1 style={{ textAlign: 'center', textTransform: 'uppercase' }}>
                  {pokeInfo.forms[0].name}
                  <br />({pokeInfo.id})
                </h1>

                <button
                  style={{
                    fontSize: '1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setPoke(pokeInfo.id + 1)}
                >
                  Proximo
                </button>
              </div>
              <section style={{ display: 'flex' }}>
                <div>
                  <img
                    style={{ width: '30rem', height: '30rem', margin: 'auto' }}
                    src={
                      shiny
                        ? pokeInfo.sprites.front_shiny
                        : pokeInfo.sprites.front_default
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
                      marginTop: '2rem',
                      paddingBottom: '5rem',
                    }}
                  >
                    PokéSom
                    <audio
                      style={{ width: '15rem' }}
                      src={pokeInfo.cries.latest}
                      controls
                      controlsList=" noremoteplayback noplaybackrate foobar nodownload"
                    />
                  </h1>
                </div>

                <div
                  style={{
                    width: '20rem',
                    marginTop: '5rem',
                  }}
                >
                  <p>
                    Altura: {pokeInfo.height * 10}cm
                    <br />
                    Peso: {pokeInfo.weight / 10} kg
                    <br />
                    Habilidades:
                    {pokeInfo.abilities.map((props) => (
                      <li
                        style={{ textTransform: 'uppercase' }}
                        key={props.ability.name}
                      >
                        {props.ability.name}
                      </li>
                    ))}
                  </p>
                  <br />
                  <div
                    style={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      marginTop: '2rem',
                    }}
                  >
                    <h1>{pokeInfo.forms[0].name} é do tipo:</h1>
                    {pokeInfo.types.map((props) => (
                      <h3 key={props.type.name}>{props.type.name}</h3>
                    ))}
                  </div>
                  <div
                    style={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      marginTop: '2rem',
                    }}
                  >
                    <h1>{pokeInfo.forms[0].name} é forte contra:</h1>
                    {allType.damage_relations.double_damage_to.map((props) => (
                      <li key={props.name}>{props.name}</li>
                    ))}
                  </div>
                  <div
                    style={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      marginTop: '2rem',
                      paddingBottom: '5rem',
                    }}
                  >
                    <h1>{pokeInfo.forms[0].name} é fraco contra:</h1>
                    {allType.damage_relations.double_damage_from.map(
                      (props) => (
                        <li key={props.name}>{props.name}</li>
                      ),
                    )}
                  </div>
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
