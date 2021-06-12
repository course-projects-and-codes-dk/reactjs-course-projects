import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // setting up states
  const [loading, setLoading] = useState(true); // loader
  const [searchTerm, setSearchTerm] = useState('a'); // input value
  const [cocktails, setCocktails] = useState([]); // data

  // ************* fetch data function
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      // if data isnt null
      if (drinks) {
        const newCocktails = drinks.map((drink) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = drink;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      }
      // if data is null(input doesnt match)
      else {
        setCocktails([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [searchTerm]);
  // ************* end of fetch data function

  // useEffect
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  // JSX
  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
