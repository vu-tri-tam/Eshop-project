// import './App.css';
import Quanlyhome from './pages/home/quanlyhome';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import QuanLyShop from './pages/shop/quanlyshop';
import Cart from './pages/cart/cart';
import LoginToWeb from './component/login';
import AuthContextProvider from './contexts/AuthCtrolAll';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
// import ProductDetail from './component/shopPage/product-detail';
// import IndexProDetail from './pages/detailProduct';
// import ShopPage from './component/shopPage/shopPage';
// import CartList from './component/cart/shoppingCart/cartList';
// import ProductDetail from './component/shopPage/product-detail';
import ProDetailPage from './component/shopPage/indexPro-detail';
// import Example from './component/shopPage/modalProDetail';
import TestCorona from './testCorona';
import CheckOutPage from './pages/checkOut/checkOutPage';
// import IndexAdmin from './admin';
// import { useState } from 'react';
// import PrivateRoute from './priveRoute/priveRoute';


// import TestModal from './component/testModal';
// import TestModal from './component/testModal';
// import CreateNotification from './component/notification/notification';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import LoginPage from './component/login/loginComponent/login';
// import LoginPage from './component/login/login';
function App() {
  // const [decentralization, setAuth] = useState(false)
  return (
    <div className="App">
      <AuthContextProvider>
        <NotificationContainer />
        <Router>
          <div>
            <Switch>
              <Route path="/" component={Quanlyhome} exact>
              </Route>
              <Route path="/shop" component={QuanLyShop} exact />
              <Route path="/detail-product/:id" component={ProDetailPage} exact />
              <Route path="/test" component={TestCorona} exact />
              {/* <Route path="/admin" component={IndexAdmin} /> */}
              <Route path="/cart" component={Cart} exact />
              <Route path="/checkout" component={CheckOutPage} exact>
              </Route>
              <Route path="/login" component={LoginToWeb} exact>
              </Route>

              {/* <PrivateRoute path="/corona" component={TestCorona} /> */}

            </Switch>
          </div>
        </Router>
      </AuthContextProvider>


    </div>
  );


}

export default App;
