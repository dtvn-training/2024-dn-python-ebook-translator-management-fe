import { Route, Routes } from 'react-router-dom';
import { adminPage, memberPage } from './customPage';
import ScrollTop from '../components/ScrollTop';
import LazyLoading from '../components/LazyLoading';
import Layout from '../components/Layout';
import NotFound from '~/pages/NotFound';

function Router() {
    return (
        <ScrollTop>
            {/* <ToastContainer /> */}
            <Routes>
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

                <Route path="*" element={<NotFound />} />
            </Routes>
        </ScrollTop>
    );
}

export default Router;
