const getColor = (type) => {
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
    // normal: 'bg-[#A8A77A]',
    // fire: 'bg-[#EE8130]',
    // water: 'bg-[#EE8130]',
    // electric: 'bg-[#F7D02C]',
    // grass: 'bg-[#7AC74C]',
    // ice: 'bg-[#96D9D6]',
    // fighting: 'bg-[#C22E28]',
    // poison: 'bg-[#A33EA1]',
    // ground: 'bg-[#E2BF65]',
    // flying: 'bg-[#A98FF3]',
    // psychic: 'bg-[#F95587]',
    // bug: 'bg-[#A6B91A]',
    // rock: 'bg-[#B6A136]',
    // ghost: 'bg-[#735797]',
    // dragon: 'bg-[#6F35FC]',
    // dark: 'bg-[#705746]',
    // steel: 'bg-[#B7B7CE]',
    // fairy: 'bg-[#D685AD]'
}
export default getColor;