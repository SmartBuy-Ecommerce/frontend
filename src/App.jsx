import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes/AllRoutes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <AllRoutes />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
