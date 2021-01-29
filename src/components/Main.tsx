import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
   const theme = useContext(ThemeContext);
   const [userInput, setUserInput] = useState('');
   const [userSelect, setUserSelect] = useState('');
   const [currentCountry, setCurrentCountry] = useState<any[]>([]);
   const [covidData, setCovidData] = useState<any[]>([]);
   const [userSelectedCountry, setUserSelectedCountry] = useState('');

   useEffect(() => {
      axios
         .get(
            userInput
               ? `https://restcountries.eu/rest/v2/name/${userInput}`
               : 'https://restcountries.eu/rest/v2/all'
         )
         .then(res => {
            setCurrentCountry(res.data);
            setUserSelectedCountry(currentCountry[0].name)
         })
         .catch(error => {
            console.error(error);
         });
   }, [userInput, currentCountry])

   useEffect(() => {
      axios
         .get(
            userSelect
               ? `https://restcountries.eu/rest/v2/region/${userSelect}`
               : 'https://restcountries.eu/rest/v2/all'
         )
         .then(res => {
            setCurrentCountry(res.data);
         })
         .catch(error => {
            console.error(error);
         });
   }, [userSelect])

   useEffect(() => {
      axios
         .get('https://covid-193.p.rapidapi.com/statistics', {
            params: {
               country: `${userSelectedCountry}`
            },
            headers: {
               'x-rapidapi-key': '3818ad22a4msh5ab33bee728bfc6p144e31jsn8f038c1a2731',
               'x-rapidapi-host': 'covid-193.p.rapidapi.com'
            }
         })
         .then(res => {
            setCovidData(res.data)
         })
         .catch(error => {
            console.error(error);
         });
   }, [userInput, userSelectedCountry])

   const handleUserInput = (e: any) => {
      setUserInput(e.target.value);
   }

   const handleUserSelect = (e: any) => {
      setUserSelect(e.target.value);
   }

   return (
      <div className={theme.theme === 'light' ? 'main main--light' : 'main'}>
         <div className="main__search-select-wrapper">
            <section className="search">
               <input
                  type="text"
                  className={theme.theme === 'light' ? 'search__input--light search__input' : 'search__input'}
                  placeholder="Search for a country..."
                  onChange={handleUserInput}
               />
            </section>
            <section className="drop-down">
               <select name="select" id="select-country"
                  className={
                     theme.theme === 'light'
                        ? 'drop-down__select drop-down__select--light'
                        : 'drop-down__select'
                  }
                  onChange={handleUserSelect}>
                  <option value="default">Filter By Region</option>
                  <option value="Africa">Africa</option>
                  <option value="Americas">Americas</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
               </select>
            </section>
         </div>
         <section className={
            theme.theme === 'light'
               ? "card-wrapper card-wrapper--light"
               : "card-wrapper"
         }
         >
            {
               currentCountry.map((country, index) => {
                  let numberWithCommas = (x: number) => {
                     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }

                  return (
                     <Link to={{ pathname: "/country-info", state: { country, covidData } }} key={index}>
                        <div className={
                           theme.theme === 'light'
                              ? "card-wrapper__card card-wrapper__card--light"
                              : "card-wrapper__card"
                        }
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
                                 {numberWithCommas(country.population)}
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
                     </Link>
                  )
               })
            }
         </section>
      </div>
   )
}

export default Main
