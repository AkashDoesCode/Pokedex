import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getPokemonDescription } from '../../services/getPokemonDescription';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleStop, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

function Biography({props}) {
    const {pokemon} = useSelector((state) => state.singlepokemon);
    const {species} = useSelector((state) => state.species);
    console.log(species);

    const[isVisible, setVisible] = useState(true);
    const description = getPokemonDescription(species, pokemon.types);

    const speak = () =>{
        const synth = window.speechSynthesis;
        let voices= synth.getVoices();
        let utterThis = new SpeechSynthesisUtterance(description);
        utterThis.voice = voices[6];
        utterThis.pitch = 0.8;
        utterThis.rate = 1;
        utterThis.onstart = () =>{
            setVisible(false);
        }
        utterThis.onend = () => {

            setVisible(true);
        }
        synth.speak(utterThis);
    }


    const stopSpeak = () =>{
        setVisible(true);
        window.speechSynthesis.cancel();
    }

   
  return (
        <div className="grid gap-2 text-left">
            <div onClick={speak} className= {`${isVisible ? 'block':'hidden'} text-[#666666] text-lg left-3 top-2 cursor-pointer`}> <FontAwesomeIcon icon={faVolumeHigh} /></div>
            <div onClick={stopSpeak} className={`${isVisible ? 'hidden':'block'} text-[#666666] text-lg left-3 top-2 cursor-pointer`}> <FontAwesomeIcon icon={faCircleStop} /></div>
            <div className='mb-4'>{description}</div>
            <div>Height : {pokemon.height/10} m</div>
            <div>Weight : {pokemon.weight/10} kg</div>
            <div>Type 
            : {
                pokemon.id && pokemon.types.map((type) => <span key={type.type.name}>{type.type.name} </span>)
            }
            </div>
            <div>Ablilities
            : {
                pokemon.id && pokemon.abilities.map((ability,index) => <span key={index}>{index+1}. {ability.ability.name} </span>)
            }
            </div>
            <div>Base Exp : {pokemon.base_experience}</div>
            <div>Base Happiness : {species.base_happiness}</div>
            <div>Capture Rate : {species.capture_rate}%</div>
        </div>
    )
}

export default Biography