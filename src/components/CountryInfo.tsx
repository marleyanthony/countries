import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import backArrow from '../assets/icons/back-arrow-dark.svg';
import backArrowLight from '../assets/icons/back-arrow.svg';

const CountryInfo = () => {
   const [currentCountry, setCurrentCountry] = useState<any[]>([]);
   const [covidData, setCovidData] = useState<any[]>([]);

   let country = useLocation().pathname.split('/').pop();

   // ! get covid data 
   useEffect(() => {
      axios
         .get('https://covid-193.p.rapidapi.com/statistics', {
            params: {
               country: `${country}`
            },
            headers: {
               'x-rapidapi-key': '3818ad22a4msh5ab33bee728bfc6p144e31jsn8f038c1a2731',
               'x-rapidapi-host': 'covid-193.p.rapidapi.com'
            }
         })
         .then(res => {
            // res.data.response < 1
            //    ? setCovidData([{ msg: 'This country has not reported any data...' }])
            //    : setCovidData(res.data.response)
            console.log(res.data.response)
            setCovidData(res.data.response);
         })
         .catch(error => {
            console.error(error);
         });
   }, [country])


   // ! get country specific data 
   useEffect(() => {
      axios
         .get(`https://restcountries.eu/rest/v2/name/${country}`)
         .then(res => {
            setCurrentCountry([res.data.length > 1 ? res.data[0] : res.data[0]])
         })
         .catch(error => {
            console.error(error);
         });
   }, [country])



   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);



   const theme = useContext(ThemeContext);

   return (
      currentCountry[0] === undefined
         ? (
            <section className="country__info-wrapper">
               <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
            </section>
         )
         : <section className="country__info-wrapper">{
            currentCountry.map((country, index) => {
               return (
                  <section className={theme.theme === 'light' ? 'country country--light' : 'country'} key={index}>
                     <a
                        href="/countries"
                        className={
                           theme.theme === 'light'
                              ? 'country__back-button country__back-button--light'
                              : 'country__back-button'
                        }
                     >
                        {
                           theme.theme === 'light'
                              ? <img src={backArrowLight} alt="back arrow" className="country__back-arrow" />
                              : <img src={backArrow} alt="back arrow" className="country__back-arrow" />
                        } Back
                  </a>
                     <div className="country__desktop-wrapper">
                        <div className="country__flag">
                           <img src={country.flag} alt="country flag" className="country__img" />
                        </div>
                        <div className={
                           theme.theme === 'light'
                              ? 'country__info country__info--light'
                              : 'country__info'
                        }>
                           <div className="country__tablet-wrapper">
                              <h1 className="country__name">
                                 {country.name}
                              </h1>
                              <div className="country__info-container">
                                 <div className="country__left-side">
                                    <p className="country__label">
                                       <span className="country__label-bold">Native Name:</span> {country.nativeName}
                                    </p>
                                    <p className="country__label">
                                       <span className="country__label-bold">Population:</span> {country.population != null ? country.population.toLocaleString('en') : 'No Reported Poulation'}
                                    </p>
                                    <p className="country__label">
                                       <span className="country__label-bold">Region:</span> {country.region}
                                    </p>
                                    <p className="country__label">
                                       <span className="country__label-bold">Sub Region:</span> {
                                          country.subregion
                                             ? country.subregion
                                             : 'None. Guess this place is too small.'
                                       }
                                    </p>
                                    <p className="country__label">
                                       <span className="country__label-bold">Capital:</span> {
                                          country.capital
                                             ? country.capital
                                             : 'None, for some reason...'
                                       }
                                    </p>
                                    <p className="country__label">
                                       <span className="country__label-bold">Currency:</span> {country.currencies[0].code}, {country.currencies[0].name}
                                    </p>
                                    <div className="country__label">
                                       <span className="country__label-bold">Languages:</span>
                                       {
                                          country.languages.length > 1
                                             ? country.languages.map((language: any, index: number) => {
                                                return (
                                                   <div className="country__languages-wrapper" key={index}>
                                                      <p>
                                                         {(index ? ', ' : '') + language.name}
                                                      </p>
                                                   </div>
                                                )
                                             })
                                             : 'No languages reported...'
                                       }
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {
                           covidData[0] === undefined
                              ? (
                                 <h1 style={{ display: 'none' }}>
                                    Loading
                                 </h1>
                              )
                              : (
                                 <div className="covid-data-wrapper">
                                    {
                                       covidData.map((covidData, index) => {
                                          return (
                                             <div className="country__covid-data-wrapper" key={index}>
                                                <h1 className="country__covid-header">
                                                   Covid Data
                                                         </h1>
                                                <p className="country__label">
                                                   <span className="country__label-bold">New Cases:</span>
                                                   {
                                                      covidData.cases.new
                                                         ? covidData.cases.new.toLocaleString()
                                                         : 'No Newly Reported Cases'
                                                   }
                                                </p>
                                                <p className="country__label">
                                                   <span className="country__label-bold">Active Cases:</span>
                                                   {covidData.cases.active.toLocaleString()}
                                                </p>
                                                <p className="country__label">
                                                   <span className="country__label-bold">Recovered:</span>
                                                   {covidData.cases.recovered.toLocaleString()}
                                                </p>
                                                <p className="country__label">
                                                   <span className="country__label-bold">Total Cases:</span>
                                                   {covidData.cases.total.toLocaleString()}
                                                </p>
                                                <p className="country__label">
                                                   <span className="country__label-bold">New Deaths:</span>
                                                   {
                                                      covidData.deaths.new != null
                                                         ? covidData.deaths.new.toLocaleString()
                                                         : 'No reported new deaths.'
                                                   }
                                                </p>
                                                <p className="country__label">
                                                   <span className="country__label-bold">Total Deaths:</span>
                                                   {
                                                      covidData.deaths.total != null
                                                         ? covidData.deaths.total.toLocaleString()
                                                         : 'No reported total deaths.'
                                                   }
                                                </p>
                                             </div>
                                          )
                                       })
                                    }
                                 </div>
                              )
                        }
                     </div>
                  </section >
               )
            })
         }
         </section >
   )
}

export default CountryInfo


// {
//    covidData[0] === undefined
//       ? <h1 className="covid-data__loading-text" style={{ color: '#fff' }}>
//          Loading Covid Data...
//          </h1>
//       : 
// }
