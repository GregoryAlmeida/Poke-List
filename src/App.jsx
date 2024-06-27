import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  //Declaração de variaveis
  const [poke, setPoke] = useState('pikachu');
  const [pokeInfo, setPokeInfo] = useState(poke);
  const [pokeIn, setPokeIn] = useState('');
  const [loading, setLoading] = useState('Carregando...');
  const [shiny, setShiny] = useState(false);
  const [allType, setAllType] = useState();
  const [imgSide, setImgSide] = useState(true);
  const [imgCarro, setImgCarro] = useState(0);
  const [imgPoke, setImgPoke] = useState();
  const [backColor, setBackColor] = useState('yellow');
  const [type, setType] = useState();
  const [area, setArea] = useState();

  // Aqui está as requisições do axios
  const getPoke = async () => {
    try {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        .then((response) => setPokeInfo(response.data));

      await axios
        .get(pokeInfo.types[0].type.url)
        .then((response) => setAllType(response.data));

      await axios
        .get(pokeInfo.location_area_encounters)
        .then((response) => setArea(response.data));

      setType(pokeInfo.types);
      switch (type[0].type.name) {
        case 'fire':
          setBackColor(['#FD7D24', '#FD7D24']);
          break;

        case 'water':
          setBackColor(['#4592C4', '#4592C4']);
          break;
        case 'grass':
          setBackColor(['#9BCC50', '#9BCC50']);
          break;
        case 'bug':
          setBackColor(['#729F3F', '#729F3F']);
          break;
        case 'poison':
          setBackColor(['#B97FC8', '#B97FC8']);
          break;
        case 'normal':
          setBackColor(['#A4ACAF', '#A4ACAF']);
          break;
        case 'flying':
          setBackColor(['#3DC6EE', '#BDB9B8']);
          break;
        case 'electric':
          setBackColor(['#EED535', '#EED535']);
          break;
        case 'ground':
          setBackColor(['#F7DE3F', '#AB9842']);
          break;
        case 'fairy':
          setBackColor(['#FDB9E9', '#FDB9E9']);
          break;
        case 'fighting':
          setBackColor(['#D56723', '#D56723']);
          break;
        case 'psychic':
          setBackColor(['#F766B9', '#F766B9']);
          break;
        case 'rock':
          setBackColor(['#A38C21', '#A38C21']);
          break;
        case 'dragon':
          setBackColor(['#53A4CF', '#F16E57']);
          break;
        case 'dark':
          setBackColor(['#707070', '#707070']);
          break;
        case 'steel':
          setBackColor(['#9EB7B8', '#9EB7B8']);
          break;
        case 'ghost':
          setBackColor(['#7B62A3', '#7B62A3']);
          break;
      }

      setLoading(false);
    } catch {
      setLoading('Escreva um PokéNome ou PokéNúmero válido 😁');
    }
  };

  // Primeira chamada da API que observa algumas variaveis
  useEffect(() => {
    getPoke();

    imgCarrousseu();
  }, [poke, imgCarro, shiny, imgSide, backColor, type]);

  // Caixa de pesquisa de pokemons
  const handleClick = () => {
    if (pokeIn.trim() != '') {
      setPoke(pokeIn.toLowerCase());
    }
  };

  // Carreousel de imagens dos pokemons
  const imgCarrousseu = async () => {
    if (shiny) {
      if (imgSide) {
        // Esse é o pokemon shiny de frente
        switch (imgCarro) {
          case 0:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                setImgPoke(response.data.sprites.front_shiny),
              );
            break;
          case 1:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                response.data.sprites.other.showdown.front_shiny
                  ? setImgPoke(response.data.sprites.other.showdown.front_shiny)
                  : setImgCarro(imgCarro + 1),
              );
            break;
          case 2:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                response.data.sprites.other.home.front_shiny
                  ? setImgPoke(response.data.sprites.other.home.front_shiny)
                  : setImgCarro(imgCarro + 1),
              );
            break;

          default:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                setImgPoke(response.data.sprites.front_shiny),
              );
            setImgCarro(0);
        }
      } else {
        // pokemon shiny de costas
        switch (imgCarro) {
          case 0:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) => setImgPoke(response.data.sprites.back_shiny));
            break;
          case 1:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                response.data.sprites.other.showdown.back_shiny
                  ? setImgPoke(response.data.sprites.other.showdown.back_shiny)
                  : setImgCarro(imgCarro + 1),
              );
            break;
          default:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) => setImgPoke(response.data.sprites.back_shiny));
            setImgCarro(0);
        }
      }
    } else {
      if (imgSide) {
        // pokemon padrão de frente
        switch (imgCarro) {
          case 0:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                setImgPoke(response.data.sprites.front_default),
              );
            break;
          case 1:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                response.data.sprites.other.showdown.front_default
                  ? setImgPoke(
                      response.data.sprites.other.showdown.front_default,
                    )
                  : setImgCarro(imgCarro + 1),
              );

            break;
          case 2:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                setImgPoke(response.data.sprites.other.home.front_default),
              );
            break;
          case 3:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                response.data.sprites.other.dream_world.front_default
                  ? setImgPoke(
                      response.data.sprites.other.dream_world.front_default,
                    )
                  : setImgCarro(imgCarro + 1),
              );
            break;

          default:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                setImgPoke(response.data.sprites.front_default),
              );
            setImgCarro(0);
        }
      } else {
        // pokemon padrão de costas
        switch (imgCarro) {
          case 0:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                setImgPoke(response.data.sprites.back_default),
              );
            break;
          case 1:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) =>
                response.data.sprites.other.showdown.back_default
                  ? setImgPoke(
                      response.data.sprites.other.showdown.back_default,
                    )
                  : setImgCarro(imgCarro + 1),
              );
            break;
          default:
            await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
              .then((response) => setImgPoke(response.data.sprites.back_shiny));
            setImgCarro(0);
        }
      }
    }
  };
  // Aqui termina o carrousel

  return (
    <form
      style={{
        fontFamily: 'sans-serif',
        width: '100vw',
        height: '100vh',
        flexWrap: 'wrap',
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
              <section
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '80vw',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}
                >
                  <img
                    style={{
                      background: `linear-gradient(${backColor[0]} 50%, ${backColor[1]} 50%)`,
                      borderRadius: '5px',
                      width: '20rem',
                      height: '20rem',
                      margin: 'auto',
                      cursor: 'pointer',
                    }}
                    src={imgPoke ? imgPoke : './src/assets/notFound.jpg'}
                    onClick={() => setImgSide(!imgSide)}
                    alt=""
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      style={{
                        fontSize: '2rem',
                        borderRadius: '50%',
                        padding: '1rem',
                        cursor: 'pointer',
                        margin: 'auto',
                      }}
                      onClick={() => {
                        setImgCarro(imgCarro + 1);
                      }}
                    >
                      ➤
                    </button>
                  </div>
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
                    📏 <strong>Altura:</strong> {pokeInfo.height * 10}cm
                    <br />
                    ⚖️ <strong>Peso:</strong> {pokeInfo.weight / 10} kg
                    <br />
                    🧪 <strong>Experiência base:</strong>{' '}
                    {pokeInfo.base_experience}xp
                    <br />
                    🧶 <strong>Habilidades:</strong>
                    {pokeInfo.abilities.map((props) => (
                      <li
                        style={{
                          textTransform: 'uppercase',
                          listStyle: 'none',
                          marginLeft: '1.5rem',
                        }}
                        key={crypto.randomUUID()}
                      >
                        💥 {props.ability.name}
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
                      <h3
                        style={{
                          margin: '5px auto',
                          background: `linear-gradient(${backColor[0]} 50%, ${backColor[1]} 50%)`,
                          color: 'white',
                          width: '10rem',
                          borderRadius: '5px',
                        }}
                        key={props.type.name}
                      >
                        {props.type.name}
                      </h3>
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

                    {allType.damage_relations.double_damage_to[0] ? (
                      allType.damage_relations.double_damage_to.map((props) => (
                        <h3
                          style={{
                            margin: '5px auto',
                            background: `linear-gradient(${backColor[0]} 50%, ${backColor[1]} 50%)`,
                            color: 'white',
                            width: '10rem',
                            borderRadius: '5px',
                          }}
                          key={props.name}
                        >
                          {props.name}
                        </h3>
                      ))
                    ) : (
                      <h3
                        style={{
                          margin: '5px auto',
                          background: `linear-gradient(${backColor[0]} 50%, ${backColor[1]} 50%)`,
                          color: 'white',
                          width: '10rem',
                          borderRadius: '5px',
                        }}
                      >
                        <strong>Não possui</strong>
                      </h3>
                    )}
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
                    {allType.damage_relations.double_damage_from[0] ? (
                      allType.damage_relations.double_damage_from.map(
                        (props) => (
                          <h3
                            style={{
                              margin: '5px auto',
                              background: `linear-gradient(${backColor[0]} 50%, ${backColor[1]} 50%)`,
                              color: 'white',
                              width: '10rem',
                              borderRadius: '5px',
                            }}
                            key={props.name}
                          >
                            {props.name}
                          </h3>
                        ),
                      )
                    ) : (
                      <h3
                        style={{
                          margin: '5px auto',
                          background: `linear-gradient(${backColor[0]} 50%, ${backColor[1]} 50%)`,
                          color: 'white',
                          width: '10rem',
                          borderRadius: '5px',
                        }}
                      >
                        <strong>Não possui</strong>
                      </h3>
                    )}
                  </div>
                </div>
              </section>
              <section>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textTransform: 'uppercase',
                    flexWrap: 'wrap',
                    padding: '1rem',
                  }}
                >
                  <h1>
                    Locais onde {pokeInfo.forms[0].name} pode ser encontrado:
                  </h1>
                  <br />
                  {area[0] ? (
                    area.map((props) => (
                      <p
                        style={{ padding: '0.5rem' }}
                        key={props.location_area.name}
                      >
                        <strong>{props.version_details[0].version.name}</strong>{' '}
                        |{' '}
                        {props.location_area.name
                          .replace('-', ' ')
                          .replace('-', ' ')
                          .replace('-', ' ')}{' '}
                        |{' '}
                        <strong>
                          Chance Máxima:{' '}
                          {props.version_details[0].max_chance + '%'}
                        </strong>
                      </p>
                    ))
                  ) : (
                    <p style={{ padding: '1rem' }}>
                      <strong>
                        Não há locais onde possa ser encontrado 😢
                      </strong>
                    </p>
                  )}
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
