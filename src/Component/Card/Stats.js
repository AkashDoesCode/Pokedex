import React from "react";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";

function Stats({props}) {
 
    const {pokemon} = useSelector((state) => state.singlepokemon);

  return (
    <div className="grid gap-2 text-left">
      {
        pokemon.stats.map((stat, index) => (
          <div key={index}>
            <div>{stat.stat.name}</div>
            <ProgressBar bar={stat.base_stat} />
            <div>{stat.base_stat}</div>
          </div>
        ))
        }
    </div>
  );
}

export default Stats;
