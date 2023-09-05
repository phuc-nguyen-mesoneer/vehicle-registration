import { Provider } from "react-redux";
import store from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import RegistrationForm from './pages/RegistrationForm';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Tasks from './pages/Tasks';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<RegistrationForm/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="signup" element={<SignUp />} />
                        <Route path="tasks" element={<Tasks />}/>
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
  );
}

export default App;
