import { ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect } from 'react';
import backArrow from '../assets/icons/back-arrow-dark.svg';
import backArrowLight from '../assets/icons/back-arrow.svg'

const CountryInfo = (props: any) => {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const { flag, name, nativeName, population, region, subregion, capital, currencies, languages, borders } = props.location.state;

   const theme = useContext(ThemeContext);

   return (
      <section className={theme.theme === 'light' ? 'country country--light' : 'country'}>
         {/* <Link to="/" className="country__link"> */}
         <a href="/" className="country__back-button">
            {
               theme.theme === 'light'
                  ? <img src={backArrowLight} alt="back arrow" className="country__back-arrow" />
                  : <img src={backArrow} alt="back arrow" className="country__back-arrow" />
            } Back
            </a>
         {/* </Link> */}
         <div className="country__flag">
            <img src={flag} alt="country flag" className="country__img" />
         </div>
         <div className="country__info">
            <h1 className="country__name">
               {name}
            </h1>
            <div className="country__info-container">
               <div className="country__left-side">
                  <p className="country__label">
                     <span className="country__label-bold">Native Name:</span> {nativeName}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Population:</span> {population}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Region:</span> {region}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Sub Region:</span> {subregion}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Capital:</span> {capital}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Currency:</span> {currencies[0].code}
                  </p>
                  <p className="country__label">
                     <span className="country__label-bold">Languages:</span> {
                        languages.map((language: any, index: number) => {
                           return (
                              <div className="country__languages-wrapper" key={index}>
                                 <p>
                                    {(index ? ', ' : '') + language.name}
                                 </p>
                              </div>
                           )
                        })
                     }
                  </p>
               </div>
            </div>
            <div className="country__border-wrapper">
               <h1 className="country__border-heading">
                  Border Countries:
               </h1>
               <div className="country__border-country-wrapper">
                  {
                     borders.map((border: any, index: number) => {
                        return (
                           <p className="country__border" key={index}>{border}</p>
                        )
                     })
                  }
               </div>
            </div>
         </div>
      </section>
   )
}

export default CountryInfo
