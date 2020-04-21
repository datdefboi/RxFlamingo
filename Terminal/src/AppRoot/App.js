import React from "react";
import styled, {ThemeProvider} from "styled-components";
import {useObserver} from "mobx-react-lite";
import {useStores} from "../Hooks/useStores";
import makeInspectable from "mobx-devtools-mst";
import FactoryStore from "./stores/FactoryStore";

import "./global.css";
import ThemeStore from "./stores/ThemeStore";
import FactoryPresenter from "../App/State/Factory/FactoryPresenter";

const stores = {
  themeStore: new ThemeStore(),
  factoryStore: new FactoryStore()
};
for (const store in stores) {
  // @ts-ignore
  makeInspectable(stores[store]);
}
export const storesContext = React.createContext(stores);

export default function App() {
  const {themeStore, factoryStore} = useStores();
  factoryStore.initValues();

  return useObserver(() => (
      <ThemeProvider theme={themeStore.currentTheme}>
        <AppContainer>
          <FactoryPresenter state={factoryStore.currentFactory}/>
        </AppContainer>
      </ThemeProvider>
  ));
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${p => p.theme.flow.background};
`;
