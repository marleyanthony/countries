import './styles/main.css';
import Header from './components/Header';
import Main from './components/Main';
import { ThemeProvider } from './context/ThemeContext';

function App() {
   return (
      <ThemeProvider>
         <div className="app">
            <Header />
            <Main />
         </div>
      </ThemeProvider>
   );
}

export default App;
