import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokemon } from './utils/pokemon.js'
function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全ポケモン取得
      let res = await getAllPokemon(initialURL);
      //各ポケモン詳細取得
      loadPokemon(res.results)
      console.log(res.next);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData()
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all( //ポケモン20種類取得まで待つ
      data.map((pokemon) => {
        //console.log(pokemon)
        let pokemonRecord = getPokemon(pokemon.url);
        console.log(pokemonRecord)
        return pokemonRecord;

      }));
    setPokemonData(_pokemonData)
  }
  // console.log(pokemonData)


  const handleNextPage = async () => {
    setLoading(true);//次のページのロード
    let data = await getAllPokemon(nextURL)
    await loadPokemon(data.results)
    setPrevURL(data.previous)
    setNextURL(data.next)
    //console.log(data.results);
    setLoading(false);
  }
  const handlePrevPage = async () => {
    if (!prevURL) {
      return
    }
    setLoading(true);//次のページのロード
    let data = await getAllPokemon(prevURL)
    loadPokemon(data.results)
    setPrevURL(data.previous)
    setNextURL(data.next)
    //console.log(data.results);
    setLoading(false);
  }
  return (
    <div className="App">
      <Navbar />
      {loading ? (
        <h1>ロード中</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return (
                <Card key={i} pokemon={pokemon}></Card>
              )

            })}

          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
