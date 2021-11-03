import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, 
  Route,
  Redirect,
} from 'react-router-dom';

import GlobalStyle from 'components/GlobalStyle';
import {Bars} from 'components/bars';
import {ContentWrapper, NavBar, StatusBar} from 'components/layout';
import {SortingProvider} from 'context/sorting';

import {useSorting} from 'hooks';
import {sortingAlgorithms} from 'algorithms';

const App = () => {
  const {sortingAlgorithmIndex} = useSorting();

  return (
    <>
      <GlobalStyle/>
      <Router>
        <Route exact path='/'>
          <Redirect to='/bubble-sort'/>
        </Route>
        <ContentWrapper backgroundText={
          `${sortingAlgorithms[sortingAlgorithmIndex].name} sort`
        }>
          <NavBar/>
          <Bars/>
        </ContentWrapper>
        <StatusBar/>
      </Router>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <SortingProvider>
      <App/>
    </SortingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);