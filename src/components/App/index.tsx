import {
  BrowserRouter as Router, 
  Route,
  Redirect,
} from 'react-router-dom';

import GlobalStyle from 'components/GlobalStyle';
import {Bars} from 'components/bars';
import {ContentWrapper, NavBar, StatusBar} from 'components/layout';
import {SortingProvider} from 'context/sorting';

const App = () => {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Route exact path='/'>
          <Redirect to='/bubble-sort'/>
        </Route>
        <SortingProvider>
          <ContentWrapper>
            <NavBar/>
            <Bars/>
          </ContentWrapper>
          <StatusBar/>
        </SortingProvider>
      </Router>
    </>
  );
}

export default App;