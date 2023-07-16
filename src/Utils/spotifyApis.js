import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Creates array of selected anime to make a playlist items.
// Gets tracks of selected animes and creates an array.
export const CreateArrayOfSelectedAnime = async (selectAnime, token) => {
  try {
    const selectedAnimeArray = await Promise.all(
      selectAnime.map(async (selectAnime) => {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${
            selectAnime?.attributes?.titles?.en
              ? selectAnime?.attributes?.titles?.en
              : selectAnime?.attributes?.titles?.en_jp
          }&type=track`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.json();
      })
    );

    return selectedAnimeArray;
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
};

// Add that tracks to the playlist we created.
export const AddTracksToPlaylist = async (
  responseJson,
  arrayOfAnime,
  token
) => {
  try {
    const AddingTracksToPlaylist = await Promise.all(
      arrayOfAnime.map(async (addTracks) => {
        const TracksURI = addTracks.tracks.items.map((item) => {
          return item.uri;
        });

        const fetchTracksInPlaylist = await fetch(
          `https://api.spotify.com/v1/playlists/${responseJson.id}/tracks?uris=${TracksURI}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return fetchTracksInPlaylist.json();
      })
    );
    await AddingTracksToPlaylist;
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
};
