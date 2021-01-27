import {useState} from 'react'
import moonLight from '../assets/icons/moon-light.png';
import moonDark from '../assets/icons/moon-dark.png';

const Header = () => {
   const [darkMode, setDarkMode] = useState(true)

   const toggleDarkMode = () => {
      setDarkMode(!darkMode);
   }

   return (
      <div className="header">
         <h5 className="header__logo">
            Where in the World? 
         </h5>
         <button className="header__dark-mode-button" onClick={toggleDarkMode}>
            {
               darkMode 
               ? <img src={moonDark} alt="dark mode active icon" className="header__dark-mode-icon"/>
               : <img src={moonLight} alt="light mode active icon" className="header__dark-mode-icon"/>
            }
            <h5 className="header__dark-mode-text">
               Dark Mode
            </h5>
         </button>
      </div>
   )
}

export default Header
