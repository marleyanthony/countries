import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react';

const Header = () => {
   const theme = useContext(ThemeContext);
   return (
      <div className={
         theme.theme === 'light'
            ? 'header header--light'
            : 'header'
      }>
         <h5 className="header__logo">
            Where in the World?
         </h5>
         {/* {
            theme.theme === 'dark'
               ? <button
                  className="header__dark-mode-button"
                  onClick={() => theme.toggleDarkMode('light')}>
                  <img src={darkMode} alt="dark mode active icon" className="header__dark-mode-icon" /> Dark Mode
               </button>
               : <button
                  className="header__dark-mode-button header__dark-mode-button--light"
                  onClick={() => theme.toggleDarkMode('dark')}>
                  <img src={lightMode} alt="light mode active icon" className="header__dark-mode-icon" /> Light Mode
               </button>
         } */}
      </div>
   )
}

export default Header
