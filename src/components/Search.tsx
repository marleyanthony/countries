import searchIcon from '../assets/icons/search-icon.svg';

const Search = () => {
   return (
      <section className="search">
         <input type="text" className="search__input" placeholder="Search for a country..." />
         {/* <img src={searchIcon} alt="search" /> */}
      </section>
   )
}

export default Search
