import axios from "axios";

export const types = ['normal', 'fire','water','electric', 'grass', 'ice', 'fighting','poison','ground', 'flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy']

export const getColor = (type) => {
    switch(type){
        case 'normal':
            return 'bg-[#A8A77A]';
        case 'fire':
            return 'bg-[#EE8130]';
        case 'water':
            return 'bg-[#6390F0]';
        case 'electric':
            return 'bg-[#F7D02C]';
        case 'grass':
            return 'bg-[#7AC74C]';
        case 'ice':
            return 'bg-[#96D9D6]';
        case 'fighting':
            return 'bg-[#C22E28]';
        case 'poison':
            return 'bg-[#A33EA1]';
        case 'ground':
            return 'bg-[#E2BF65]';
        case 'flying':
            return 'bg-[#A98FF3]';
        case 'psychic':
            return 'bg-[#F95587]';
        case 'bug':
            return 'bg-[#A6B91A]';
        case 'rock':
            return 'bg-[#B6A136]';
        case 'ghost':
            return 'bg-[#735797]';
        case 'dragon':
            return 'bg-[#6F35FC]';
        case 'dark':
            return 'bg-[#705746]';
        case 'steel':
            return 'bg-[#B7B7CE]';
        case 'fairy':
            return 'bg-[#D685AD]';
        default :
            return ;
    }
}

export const getDescription = (species,types) =>{
        return axios.get(species.url).then(res => {
            res = res.data.flavor_text_entries[1].flavor_text;
            let result = '';
            if(types.length > 1){
                result = types[0].type.name + ' and ' + types[1].type.name;
            }
            else{
                result = types[0].type.name;
            }
            let description = `${species.name}, a ${result} type pokemon. ${res}`;
            return description;
        }).catch(err => 
            console.log(err)
        )
    }

export const getVoice = (description, isVisible, setVisible) =>{

    //if( description == undefined) return ;
    description = description.replace(/(\r\n|\n|\r)/gm, " ");
    const synth = window.speechSynthesis;
    let voices= synth.getVoices();
    let utterThis = new SpeechSynthesisUtterance(description);
    utterThis.voice = voices[6];
    utterThis.pitch = 0.8;
    utterThis.rate = 1;
    utterThis.onend =() => {
        setVisible(isVisible)
    }
    //synth.speak(utterThis);

}

export const stop = () =>{
    window.speechSynthesis.cancel();
}


