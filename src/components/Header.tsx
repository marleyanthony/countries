import moonLight from '../assets/icons/moon-light.png';
import moonDark from '../assets/icons/moon-dark.png';
import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react';

const Header = () => {
   const theme = useContext(ThemeContext);
   return (
      <div className="header">
         <h5 className="header__logo">
            Where in the World?
         </h5>
         {
            theme.theme === 'dark'
               ? <button
                  className="header__dark-mode-button"
                  onClick={() => theme.toggleDarkMode('light')}>
                  <img src={moonDark} alt="dark mode active icon" className="header__dark-mode-icon" /> Dark Mode
               </button>
               : <button
                  className="header__dark-mode-button"
                  onClick={() => theme.toggleDarkMode('dark')}>
                  <img src={moonLight} alt="light mode active icon" className="header__dark-mode-icon" /> Light Mode
               </button>
         }
      </div>
   )
}

export default Header
