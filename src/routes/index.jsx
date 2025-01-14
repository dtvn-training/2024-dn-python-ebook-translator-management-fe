import { Route, Routes } from 'react-router-dom';
import { adminPage, memberPage } from './customPage';
import ScrollTop from '../components/ScrollTop';
import LazyLoading from '../components/LazyLoading';
import Layout from '../components/Layout';
import HomePage from '../components/HomePage';

function Router() {
    const homePage = {
        pathname: '/',
        Element: () => <HomePage />,
        noLayout: true,
    };

    return (
        <ScrollTop>
            <Routes>
                {/* Route cho trang home */}
                <Route
                    path={homePage.pathname}
                    element={
                        <LazyLoading>
                            <homePage.Element />
                        </LazyLoading>
                    }
                />

                {/* Route cho các trang member */}
                {memberPage.map((item, index) => {
                    const Item = item.Element;
                    return item?.noLayout ? (
                        <Route
                            key={index}
                            path={item.pathname}
                            element={
                                <LazyLoading>
                                    <Item />
                                </LazyLoading>
                            }
                        ></Route>
                    ) : (
                        <Route
                            key={index}
                            path={item.pathname}
                            element={
                                <Layout>
                                    <LazyLoading>
                                        <Item />
                                    </LazyLoading>
                                </Layout>
                            }
                        ></Route>
                    );
                })}

                {/* Route cho các trang admin */}
                {adminPage.map((item, index) => {
                    const Item = item.Element;
                    return item?.noLayout ? (
                        <Route
                            key={index}
                            path={item.pathname}
                            element={
                                <LazyLoading>
                                    <Item />
                                </LazyLoading>
                            }
                        ></Route>
                    ) : (
                        <Route
                            key={index}
                            path={item.pathname}
                            element={
                                <Layout>
                                    <LazyLoading>
                                        <Item />
                                    </LazyLoading>
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </ScrollTop>
    );
}

export default Router;
