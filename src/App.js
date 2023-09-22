import styled from "styled-components";
import MovieComponent from "./component/MovieComponent";
import { useState } from "react";
import axios from "axios";
import MovieInfoComponent from "./component/MovieInfoComponent";
export const API_KEY="89073dd2"

 const Container = styled.div`
 display: flex;
 flex-direction: column;
 `;

 const Header = styled.div`
 display:flex;
 flex-direction: row;
 background-color: black;
 color: white;
 justify-content: space-between;
 align-items: center;
 padding: 10px;
 font-size: 25px;
 font-weight: bold;
 box-shadow:0 3px 6px 0 #555

 `;
 const AppName = styled.div`
 display:flex;
 flex-direction: row;
 align-items: center;
 `;

 const MovieImage = styled.img`
 width: 48px;
 height: 48px;
 margin:15px;
 `;



 const SearchBox = styled.div`
 display:flex;
 flex-direction: row;
 padding: 10px 10px;
 background-color: white;
 border-radius: 6px;
 margin-left: 20px;
 width: 50%;
 align-items: center;
 `;
 const SearchIcon = styled.img`
 width: 32px;
 heiight: 32px;
 `;

 const SearchInput= styled.input`
 color: black;
 font-size: 16px;
 font-weight: bold;
 border: none;
 outline: none;
 margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
   



function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeOutId,updateTimeOutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [favorites, setFavorites] = useState([]);
  
  

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const showFavorites = () => {
    return favorites.map((movie, index) => (
      <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />
    ));
  };

  const fetchData=async(searchString)=>{
    const response=await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    updateMovieList(response.data.Search);
  }

  const onTextChange=(event)=>{
    clearTimeout(timeOutId);
    updateSearchQuery(event.target.value)
    const timeOut=setTimeout(()=>fetchData(event.target.value),500);
    updateTimeOutId(timeOut)

  };

  
  
  return <Container>
    <Header>
      <AppName>
        <MovieImage src="/movie-icon.svg" />
      React Movie App</AppName>

      <SearchBox>
        <SearchIcon src="/search-icon.svg"/>
        <SearchInput placeholder="Search Movie" 
        value={searchQuery}
        onChange={onTextChange}
        />
      </SearchBox>
    </Header>
    {selectedMovie && (
  <MovieInfoComponent
    selectedMovie={selectedMovie}
    onMovieSelect={onMovieSelect}
    addToFavorites={addToFavorites}
  />
)}    
 <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <placeholder src="/react-movie-app/movie-icon.svg" />
        )}
     </MovieListContainer>

     {favorites.length > 0 && (
        <div>
          <h2>Your Favorites</h2>
          {showFavorites()}
        </div>
      )}

    </Container>;

};
export default App;



