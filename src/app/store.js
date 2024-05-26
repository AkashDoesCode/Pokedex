// //for react
// import { configureStore } from "@reduxjs/toolkit";
// import pokemonReducer from "../features/Pokemon/pokemonSlice";
// import singlePokemonReducer from "../features/Pokemon/singlePokemonSlice";
// import speciesReducer from "../features/Pokemon/speciesSlice";
// import evolutionReducer from "../features/Pokemon/evolutionSlice";
// import authReducer from "../features/Auth/authSlice";

// const store = configureStore({
//   reducer: {
//     pokemon: pokemonReducer,
//     singlepokemon: singlePokemonReducer,
//     species: speciesReducer,
//     evolution: evolutionReducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "../features/Auth/authSlice";
import pokemonReducer from "../features/Pokemon/pokemonSlice";
import singlePokemonReducer from "../features/Pokemon/singlePokemonSlice";
import speciesReducer from "../features/Pokemon/speciesSlice";
import evolutionReducer from "../features/Pokemon/evolutionSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist:["auth"],
};

const reducer = combineReducers({
    pokemon: pokemonReducer,
    singlepokemon: singlePokemonReducer,
    species: speciesReducer,
    evolution: evolutionReducer,
    auth: authReducer,
});
// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default store;
