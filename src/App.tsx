import './styles/main.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Main from './components/Main';
import CountryInfo from './components/CountryInfo';
import { ThemeProvider } from './context/ThemeContext';

function App() {
   return (
      <Router>
         <ThemeProvider>
            <div className="app">
               <Header />
               <Route exact path="/" component={Main} />
               <Route exact path="/country-info" component={CountryInfo} />
               {/* <Main /> */}
            </div>
         </ThemeProvider>
      </Router>
   );
}

export default App;
