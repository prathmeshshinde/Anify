export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirect_uri = "https://anify-anime.vercel.app/";
const client_id = "c8a6b0d143df4c30b7bea3c9eff9b5a0";

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
