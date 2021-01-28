const CountryInfo = (props: any) => {
   const { flag, name, nativeName, population, region, subregion, capital, currencies, languages } = props.location.state;
   console.log(languages)

   return (
      <section className="country-info">
         <div className="country__flag">
            <img src={flag} alt="country flag" />
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
                     <span className="country__label-bold">Languages:</span> {languages.map((language: any, index: number) => <p key={index}>{language.name}</p>)}
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CountryInfo
