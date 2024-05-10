export const getBackgroundImage = (type) =>{
    let img = require(`../assets/${type}.png`);
    return img;
}