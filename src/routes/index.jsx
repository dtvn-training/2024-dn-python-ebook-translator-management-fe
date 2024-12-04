import { Route, Routes } from 'react-router-dom';
import { memberPage } from './customPage';
import ScrollTop from '../components/ScrollTop';
import LazyLoading from '../components/LazyLoading';
import Layout from '../components/Layout';

function Router() {
    return (
        <ScrollTop>
            {/* <ToastContainer /> */}
            <Routes>
                {memberPage.map((item, index) => {
                    const Item = item.Element;
                    console.log(item);

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
