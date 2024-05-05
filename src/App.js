import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes/index';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Layout>{<Page />}</Layout>}
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
