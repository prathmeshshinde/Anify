import React from "react";

const Modal = ({
  namePlaylist,
  setOpenModal,
  handlePlaylistName,
  createPlaylist,
}) => {
  return (
    <div className="">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-header-red text-center font-poppins">
                Make a Playlist
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black   float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenModal(false)}
              >
                <span className="bg-transparent text-black   h-6 w-6 text-3xl block outline-none focus:outline-none font-poppins">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex justify-center">
                <input
                  type="text"
                  className="playlist-input"
                  placeholder="Enter Playlist Name"
                  onChange={(e) => handlePlaylistName(e)}
                  required
                />
              </div>

              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Make a playlist of your favorite Animes.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-header-red background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 font-poppins"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
              {namePlaylist === "" ? (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-50 font-poppins"
                  disabled
                >
                  Make a Playlist
                </button>
              ) : (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  onClick={() => createPlaylist(namePlaylist)}
                >
                  Make a Playlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Modal;
