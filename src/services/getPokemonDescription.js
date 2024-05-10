export const getPokemonDescription = (species,types) =>{

    let description = species.flavor_text_entries.find(des =>  des.language.name=="en");
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
    //return description;
    //return axios.get(species.url).then(res => {
    //     res = res.data.flavor_text_entries[0].flavor_text;
    //     let result = '';
    //     if(types.length > 1){
    //         result = types[0].type.name + ' and ' + types[1].type.name;
    //     }
    //     else{
    //         result = types[0].type.name;
    //     }
    //     let description = `${species.name}, a ${result} type pokemon. ${res}`;
    //     return description;
    // }).catch(err => 
    //     console.log(err)
    // )
}