import React from "react";
import { ReactComponent as Cross } from "../../assets/cross.svg";

const SelectedAnimeCard = ({ SelectedAnimeArr, setSelectAnime }) => {
  const RemoveAnime = () => {
    setSelectAnime((prevState) => {
      return prevState.filter(
        (prevState) => prevState.id !== SelectedAnimeArr.id
      );
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-selected-anime-card-bg rounded-lg py-5 hover:scale-105 duration-500">
        <div className="flex">
          <img
            src={SelectedAnimeArr?.attributes?.posterImage?.tiny}
            alt="CardImage"
            className="rounded-full mx-4 w-14 h-14"
          />
          <div className="my-auto w-40 sm:w-60 md:w-68 lg:w-44 xl:w-52">
            <p className=" text-selected-anime-text text-sm font-medium font-poppins truncate">
              {SelectedAnimeArr?.attributes?.titles?.en
                ? SelectedAnimeArr?.attributes?.titles?.en
                : SelectedAnimeArr?.attributes?.titles?.en_jp}
            </p>
            <p className="text-base font-medium font-poppins">
              {SelectedAnimeArr?.attributes?.showType}
            </p>
          </div>
        </div>

        <div
          onClick={RemoveAnime}
          className="p-2 bg-white rounded-full mr-6 shadow-lg shadow-gray-400 cursor-pointer hover:scale-110 duration-500"
        >
          <Cross />
        </div>
      </div>
    </div>
  );
};

export default SelectedAnimeCard;
