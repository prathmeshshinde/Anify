import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import AnimeCard from "./Components/AnimeCard/AnimeCard";
import Pagination from "./Components/Pagination/Pagination";
import SelectedAnimeCard from "./Components/SelectedAnimeCard/SelectedAnimeCard";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import {
  CreateArrayOfSelectedAnime,
  AddTracksToPlaylist,
} from "./Utils/spotifyApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Components/Modal/Modal";
import NoResults from "./assets/noResults.gif";
import SpotifyLogo from "./assets/spotify.png";

const spotify = new SpotifyWebApi();

function App() {
  const [anime, setAnime] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectAnime, setSelectAnime] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [spotifyToken, setSpotifyToken] = useState("");
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState("");
  const [handleLogin, setHandleLogin] = useState("");
  const [loading, setLoading] = useState(true);

  const API = `https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=${pageCount}`;

  const SearchApi = `https://kitsu.io/api/edge/anime?filter[text]=${searchText}`;

  const PushedSelectedAnime = (item) => {
    if (!selectAnime.includes(item)) {
      setSelectAnime((prevState) => [...prevState, item]);
    } else {
      alert("Already Added to playlist!!");
    }
  };

  const checkSpace = (string) => {
    return string.match(/^\s*$/) !== null;
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePlaylistName = (e) => {
    setNamePlaylist(e.target.value);
  };

  const token = getTokenFromUrl().access_token;

  const createPlaylist = async (namePlaylist) => {
    let checkForSpace = checkSpace(namePlaylist);

    if (checkForSpace) {
      toast.warn("Please enter a Playlist Name!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/users/${user.id}/playlists`,
          {
            method: "POST",
            body: JSON.stringify({
              name: namePlaylist,
              description: "New playlist description",
              public: true,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseJson = await response.json();
        let arrayOfAnime = await CreateArrayOfSelectedAnime(selectAnime, token);
        AddTracksToPlaylist(responseJson, arrayOfAnime, token);
        toast.success("Playlist created Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSelectAnime([]);
        setOpenModal(false);
        setNamePlaylist("");
      } catch (error) {
        toast.error("Something went wrong please try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  useEffect(() => {
    const AnimeAPI = () => {
      let checkSearchText = checkSpace(searchText);
      checkSearchText
        ? fetch(API)
            .then((response) => response.json())
            .then((res) => setAnime(res.data))
            .finally(() => {
              setLoading(false);
            })
        : fetch(SearchApi)
            .then((response) => response.json())
            .then((res) => setAnime(res.data))
            .finally(() => {
              setLoading(false);
            });
    };
    AnimeAPI();

    const _spotifyToken = getTokenFromUrl().access_token;
    if (_spotifyToken) {
      setSpotifyToken(_spotifyToken);
      spotify.setAccessToken(_spotifyToken);
      spotify
        .getMe()
        .then((user) => {
          if (user) {
            setUser(user);
          }
        })
        .catch((error) => {
          setHandleLogin("Your session expired. Please Login again", error);
        });
    }
  }, [searchText, pageCount, namePlaylist]);

  return (
    <>
      <div className="App">
        <div className="flex justify-center bg-header-bg">
          <Header user={user} handleLogin={handleLogin} />
        </div>
        {handleLogin === "" ? (
          ""
        ) : (
          <h1 className="text-center mt-6 mb-6 font-poppins font-semibold text-xl text-selected-anime-text">
            {handleLogin}
          </h1>
        )}
        <div className="flex">
          <input
            type="text"
            className="search-field"
            placeholder="Search Anime"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        {anime.length === 0 ? (
          " "
        ) : selectAnime.length === 0 ? (
          <p className="text-center mt-6 mb-16 font-poppins font-semibold text-xl text-selected-anime-text">
            Select Anime to make Playlist
          </p>
        ) : (
          <div className="mb-10">
            <div className="max-w-[1320px] mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-10 px-8 my-10">
              {selectAnime.map((SelectedAnimeArr, index) => (
                <div key={SelectedAnimeArr.id}>
                  <SelectedAnimeCard
                    SelectedAnimeArr={SelectedAnimeArr}
                    selectAnime={selectAnime}
                    setSelectAnime={setSelectAnime}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              {spotifyToken ? (
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className="py-4 px-16 bg-header-bg rounded-lg text-header-red font-bold text-base font-poppins shadow-lg   hover:bg-hover-button-bg duration-500"
                >
                  Make a Playlist
                </button>
              ) : (
                <p className="login-text">Login to make a playlist</p>
              )}
            </div>
          </div>
        )}
        {openModal ? (
          <Modal
            setOpenModal={setOpenModal}
            handlePlaylistName={handlePlaylistName}
            namePlaylist={namePlaylist}
            createPlaylist={createPlaylist}
          />
        ) : (
          ""
        )}

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {anime.length === 0 ? (
              <div className="flex justify-center m-10">
                <div className="">
                  <h1 className=" text-xl text-circle-bg font-semibold text-center mb-3 font-poppins">
                    No Results Found
                  </h1>
                  <img src={NoResults} alt="noResult" className=" rounded-lg" />
                </div>
              </div>
            ) : (
              <div className="max-w-[1320px] mx-auto grid lg:grid-cols-5 md:grid-cols-2 gap-10 px-8">
                {anime.map((item, index) => (
                  <div key={item.id} onClick={() => PushedSelectedAnime(item)}>
                    <AnimeCard key={index} item={item} index={index} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {searchText === "" ? (
          <Pagination pageCount={pageCount} setPageCount={setPageCount} />
        ) : (
          ""
        )}
        <ToastContainer />
      </div>
      {/* <div className="flex justify-center items-center px-10 my-10">
        <img src={SpotifyLogo} alt="spotifyLogo" className="w-16" />
        <p className=" font-semibold text-xl ml-3 font-poppins">
          Spotify ©. All Right Reserved.
        </p>
      </div> */}
    </>
  );
}

export default App;
