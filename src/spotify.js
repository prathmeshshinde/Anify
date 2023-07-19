export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirect_uri = "https://anify-anime.vercel.app/";
const client_id = process.env.REACT_APP_CLIENT_ID;

const scopes = ["playlist-modify-public"];

export const loginURL = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
