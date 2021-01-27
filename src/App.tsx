import './styles/main.css';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';

function App() {
   return (
      <ThemeProvider>
         <div className="app">
            <Header />
         </div>
      </ThemeProvider>
   );
}

export default App;
