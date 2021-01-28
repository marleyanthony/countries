import { ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
   const theme = useContext(ThemeContext);
   const [userInput, setUserInput] = useState('');
   const [currentCountry, setCurrentCountry] = useState<any[]>([]);

   useEffect(() => {
      axios
         .get(
            userInput
               ? `https://restcountries.eu/rest/v2/name/${userInput}`
               : 'https://restcountries.eu/rest/v2/all'
         )
         .then(res => {
            setCurrentCountry(res.data);
         })
   }, [userInput])

   const handleUserInput = (e: any) => {
      setUserInput(e.target.value);
      console.log(userInput)
   }

   return (
      <div className={theme.theme === 'light' ? 'main main--light' : 'main'}>
         <section className="search">
            <input
               type="text"
               className={theme.theme === 'light' ? 'search__input--light search__input' : 'search__input'}
               placeholder="Search for a country..."
               onChange={handleUserInput}
            />
         </section>
         <section className={
            theme.theme === 'light'
               ? "card-wrapper card-wrapper--light"
               : "card-wrapper"
         }
         >
            {
               currentCountry.map((country, index) => {
                  return (
                     <div className={
                        theme.theme === 'light'
                           ? "card-wrapper__card card-wrapper__card--light"
                           : "card-wrapper__card"
                     }
                        key={index}
                     >
                        <div className="card-wrapper__img">
                           <img src={country.flag} alt={`${country.name} + flag`} className="card-wrapper__flag" />
                        </div>
                        <div className="card-wrapper__content">
                           <h2 className="card-wrapper__country-name">
                              {country.name}
                           </h2>
                           <p className="card-wrapper__info">
                              <span className="card-wrapper__bold">Population:</span>
                              {country.population}
                           </p>
                           <p className="card-wrapper__info">
                              <span className="card-wrapper__bold">Region:</span>
                              {country.region}
                           </p>
                           <p className="card-wrapper__info">
                              <span className="card-wrapper__bold">Capital:</span>
                              {country.capital}
                           </p>
                        </div>
                     </div>
                  )
               })
            }
         </section>
      </div>
   )
}

export default Main
