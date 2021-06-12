import React from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  // getting unique value
  const { id } = useParams();

  // setting states for single page
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  // fetch function
  React.useEffect(() => {
    // 1.) show loader
    setLoading(true);
    // 2.) create fetch function
    const getCocktail = async () => {
      try {
        // 2.1) get data
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        // if data isnt null
        if (data.drinks) {
          // get properties
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          // create array for ingrs
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          // create new object for the cocktail
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          // set cocktail
          setCocktail(newCocktail);
        }

        // if data is null(dont get return)
        else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        // 2.2) check error
        console.log(error);
        setLoading(false);
      }
    };
    // 3.) call fetch function
    getCocktail();
  }, [id]);

  // JSX
  // check for loading
  if (loading) {
    return <Loading />;
  }
  // check for any mishaps
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }
  // destrcuture properties
  const {
    name,
    image,
    category,
    info,
    glass,
    instructions,
    ingredients,
  } = cocktail;
  return (
    <section className="section cocktail-section">
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            <span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null;
              })}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
