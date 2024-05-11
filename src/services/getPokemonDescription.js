export const getPokemonDescription = (species,types) =>{

    let description = species.flavor_text_entries.find(des =>  des.language.name ==="en");
    description = description.flavor_text;
    description = description.replace(/(\r\n|\n|\r)/gm, "  ");

    let type = '';
    if(types.length > 1){
        type =  types[0].type.name + ' and ' + types[1].type.name;
    }
    else{
        type = types[0].type.name;
    }
    description = `${species.name}, a ${type} type pokemon. ${description}`;
    return description;
}