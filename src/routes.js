import React from 'react';
import { browserHistory, Router, Route } from 'react-router';

import AppPage from './views/app/app';
import DeleteItemPage from './views/app/delete-item';
import LoginPage from './views/login/login';

import SiteUsersPage from './views/site-users/site-users';
import AddSiteUserPage from './views/site-users/add-site-user';
import EditSiteUserPage from './views/site-users/edit-site-user';

import LanguagesPage from './views/languages/languages';
import AddLanguagePage from './views/languages/add-language';
import EditLanguagePage from './views/languages/edit-language';

import CountriesPage from './views/countries/countries';
import AddCountryPage from './views/countries/add-country';
import EditCountryPage from './views/countries/edit-country';

import ProductsPage from './views/products/products';
import AddProductPage from './views/products/add-product';
import EditProductPage from './views/products/edit-product';
import EditProductLocalizePage from './views/products/product-localize';

import SlideImagesPage from './views/slides/slides';
import AddSlideImagePage from './views/slides/add-slide';
import ChangeSlideSequencePage from './views/slides/change-seq';

import AppWordsPage from './views/localization/app-words';
import AddAppWordPage from './views/localization/add-word';
import EditAppWordPage from './views/localization/edit-word';

import AppLocalizePage from './views/localization/app-localize';
import AddAppLocalizePage from './views/localization/add-localize';
import EditAppLocalizePage from './views/localization/edit-localize';

import ProductPricesPage from './views/products/product-prices';
import AddProductPricePage from './views/products/add-product-price';
import EditProductPricePage from './views/products/edit-product-price';

import SettingPage from './views/settings/settings';
import AddConfigPage from './views/settings/add-config';
import EditConfigPage from './views/settings/edit-config';

import MobileUsersPage from './views/mobile-users/mobile-users';
import NotificationSubscribePage from './views/notifications/notifications';

import auth from './helpers/auth';

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Routes = (props) => (
  <Router {...props} history={browserHistory}>
    <Route path="/" component={AppPage} onEnter={requireAuth} />
    <Route path="/login" component={LoginPage} />

    <Route path="/siteusers" component={SiteUsersPage} onEnter={requireAuth}/>
    <Route path="/addsiteuser" component={AddSiteUserPage} onEnter={requireAuth} />
    <Route path="/editsiteuser" component={EditSiteUserPage} onEnter={requireAuth} />

    <Route path="/languages" component={LanguagesPage} onEnter={requireAuth}/>
    <Route path="/addlanguage" component={AddLanguagePage} onEnter={requireAuth} />
    <Route path="/editlanguage" component={EditLanguagePage} onEnter={requireAuth} />

    <Route path="/countries" component={CountriesPage} onEnter={requireAuth}/>
    <Route path="/addcountry" component={AddCountryPage} onEnter={requireAuth} />
    <Route path="/editcountry" component={EditCountryPage} onEnter={requireAuth} />

    <Route path="/products" component={ProductsPage} onEnter={requireAuth}/>
    <Route path="/addproduct" component={AddProductPage} onEnter={requireAuth} />
    <Route path="/editproduct" component={EditProductPage} onEnter={requireAuth} />
    <Route path="/editproductlocalize" component={EditProductLocalizePage} onEnter={requireAuth} />

    <Route path="/slideimages" component={SlideImagesPage} onEnter={requireAuth}/>
    <Route path="/addslideimage" component={AddSlideImagePage} onEnter={requireAuth} />
    <Route path="/changeslideseq" component={ChangeSlideSequencePage} onEnter={requireAuth} />

    <Route path="/appwords" component={AppWordsPage} onEnter={requireAuth}/>
    <Route path="/addappword" component={AddAppWordPage} onEnter={requireAuth} />
    <Route path="/editappword" component={EditAppWordPage} onEnter={requireAuth} />

    <Route path="/applocalize" component={AppLocalizePage} onEnter={requireAuth}/>
    <Route path="/addapplocalize" component={AddAppLocalizePage} onEnter={requireAuth}/>
    <Route path="/editapplocalize" component={EditAppLocalizePage} onEnter={requireAuth}/>

    <Route path="/addproductprice" component={AddProductPricePage} onEnter={requireAuth}/>
    <Route path="/editproductprice" component={EditProductPricePage} onEnter={requireAuth}/>
    <Route path="/productprices" component={ProductPricesPage} onEnter={requireAuth}/>

    <Route path="/mobileusers" component={MobileUsersPage} onEnter={requireAuth}/>
    <Route path="/config" component={SettingPage} onEnter={requireAuth}/>
    <Route path="/addconfig" component={AddConfigPage} onEnter={requireAuth}/>
    <Route path="/editconfig" component={EditConfigPage} onEnter={requireAuth}/>

    <Route path="/notificationsubscribe" component={NotificationSubscribePage} onEnter={requireAuth}/>

    <Route path="/deleteitem" component={DeleteItemPage} onEnter={requireAuth} />
  </Router>
);

export default Routes;