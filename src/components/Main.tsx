import Search from './Search';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const Main = () => {
   const theme = useContext(ThemeContext);

   return (
      <div className={theme.theme === 'light' ? 'main main--light' : 'main'}>
         <Search />
      </div>
   )
}

export default Main
