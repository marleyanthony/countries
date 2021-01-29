import { ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect } from 'react';
import backArrow from '../assets/icons/back-arrow-dark.svg';
import backArrowLight from '../assets/icons/back-arrow.svg'

const CountryInfo = (props: any) => {
   console.log(props.location.state)
   const { flag, name, nativeName, population, region, subregion, capital, currencies, languages, borders } = props.location.state.country;
   const { cases, deaths } = props.location.state.covidData.response[0];
   console.log(props.location.state.covidData.response[0]);

   console.log(props)

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const theme = useContext(ThemeContext);

   const numberWithCommas = (numberToConvert: number) => {
      return numberToConvert.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

   return (
      <section className={theme.theme === 'light' ? 'country country--light' : 'country'}>
         <a href="/" className={
            theme.theme === 'light'
               ? 'country__back-button country__back-button--light'
               : 'country__back-button'
         }>
            {
               theme.theme === 'light'
                  ? <img src={backArrowLight} alt="back arrow" className="country__back-arrow" />
                  : <img src={backArrow} alt="back arrow" className="country__back-arrow" />
            } Back
            </a>
         <div className="country__desktop-wrapper">
            <div className="country__flag">
               <img src={flag} alt="country flag" className="country__img" />
            </div>
            <div className={
               theme.theme === 'light'
                  ? 'country__info country__info--light'
                  : 'country__info'
            }>
               <div className="country__tablet-wrapper">
                  <h1 className="country__name">
                     {name}
                  </h1>
                  <div className="country__info-container">
                     <div className="country__left-side">
                        <p className="country__label">
                           <span className="country__label-bold">Native Name:</span> {nativeName}
                        </p>
                        <p className="country__label">
                           <span className="country__label-bold">Population:</span> {numberWithCommas(population)}
                        </p>
                        <p className="country__label">
                           <span className="country__label-bold">Region:</span> {region}
                        </p>
                        <p className="country__label">
                           <span className="country__label-bold">Sub Region:</span> {
                              subregion
                                 ? subregion
                                 : 'None. Guess this place is too small.'
                           }
                        </p>
                        <p className="country__label">
                           <span className="country__label-bold">Capital:</span> {
                              capital
                                 ? capital
                                 : 'None, for some reason...'
                           }
                        </p>
                        <p className="country__label">
                           <span className="country__label-bold">Currency:</span> {currencies[0].code}, {currencies[0].name}
                        </p>
                        <div className="country__label">
                           <span className="country__label-bold">Languages:</span>
                           {
                              languages.length > 1
                                 ? languages.map((language: any, index: number) => {
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
                  <div className="country__border-wrapper">
                     <h1 className="country__border-heading">
                        Border Countries:
               </h1>
                     <div className="country__border-country-wrapper">
                        {
                           borders.length >= 1
                              ? borders.map((border: any, index: number) => {
                                 return (
                                    <p className="country__border" key={index}>
                                       {(index ? ', ' : '') + border}
                                    </p>
                                 )
                              })
                              : <p className="country__border">None, it's an island. Duh. 🏝</p>
                        }
                     </div>
                  </div>
               </div>
               <div className="country__covid-data-wrapper">
                  <h1 className="country__covid-header">
                     Covid Data
               </h1>
                  <p className="country__label">
                     <span className="country__label-bold">New Cases:</span>
                     {numberWithCommas(cases.new)}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Active Cases:</span>
                     {numberWithCommas(cases.active)}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Recovered:</span>
                     {numberWithCommas(cases.recovered)}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Total Cases:</span>
                     {numberWithCommas(cases.total)}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">New Deaths:</span>
                     {numberWithCommas(deaths.new)}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Total Deaths:</span>
                     {numberWithCommas(deaths.total)}
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CountryInfo
