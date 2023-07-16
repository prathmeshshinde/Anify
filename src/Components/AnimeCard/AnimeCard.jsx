import React from "react";

const AnimeCard = ({ item }) => {
  return (
    <div className="rounded-lg relative hover:cursor-pointer card-div">
      <div className="absolute top-3 right-3 bg-circle-bg rounded-full px-3 py-2  z-10">
        <p className="text-white text-center font-poppins font-medium text-xs">
          {item.attributes.ageRating}
        </p>
      </div>
      <div className="overflow-hidden rounded-lg">
        <img
          src={item.attributes.posterImage?.small}
          alt="Anime Poster"
          className="w-full rounded-lg duration-500 image-div"
        />
        <div className="absolute bottom-0 w-full h-1/4 bg-cardText-bg rounded-lg px-2">
          <div className="flex justify-between items-center my-2">
            <p className=" font-poppins text-white text-base font-medium truncate ">
              {item?.attributes.titles?.en
                ? item?.attributes.titles?.en
                : item?.attributes.titles?.en_jp}
            </p>
            <p className="font-poppins text-cardTextColor text-xs font-normal">
              86.98
            </p>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-poppins text-cardTextColor text-sm font-normal">
              Rank :{" "}
              <span className=" text-white">
                {item?.attributes.popularityRank}
              </span>
            </p>
            <p className=" font-poppins text-white text-base font-medium capitalize">
              {item?.attributes.showType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
