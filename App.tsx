import React from 'react';
import AppContainer from "./navigation/index";
import navigationService from "./service/navigationService";

const App = () => {
  return (
    <AppContainer ref={navigatorRef => {
      navigationService.setTopLevelNavigator(navigatorRef);
    }} />
  )
}

export default App;