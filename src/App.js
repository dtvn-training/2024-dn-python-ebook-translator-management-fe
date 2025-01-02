import { useNavigate } from 'react-router-dom';
import Router from './routes';
import { axiosInterceptor } from './utils/refreshToken';

function App() {
    const navigate = useNavigate();
    axiosInterceptor(navigate);
    return <Router />;
}

export default App;
