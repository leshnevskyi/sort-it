import {BrowserRouter as Router} from 'react-router-dom';

import GlobalStyle from 'components/GlobalStyle';
import {ContentWrapper} from './styled';
import {Bars} from 'components/bars';
import {NavBar, StatusBar} from 'components/layout';
import {SortingProvider} from 'context/sorting';

import {algoNames} from 'algorithms';

const App = () => {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <SortingProvider>
          <ContentWrapper algoName={algoNames[0]}>
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