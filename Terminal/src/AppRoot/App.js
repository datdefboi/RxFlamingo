import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../Hooks/useStores";
import makeInspectable from "mobx-devtools-mst";
import AppStore from "./stores/AppStore";

import "./global.css";
import ThemeStore from "./stores/ThemeStore";
import FactoryPresenter from "../App/Presenters/Factory/FactoryPresenter";
import RecordsExplorer from "../App/Components/BottomMenu/RecordsExplorer";
import FactoriesExplorer from "../App/Components/BottomMenu/FactoriesExplorer";
import MainMenu from "../App/Components/Menus/MainMenu";

export const stores = {
  themeStore: new ThemeStore(),
  appStore: new AppStore(),
};
for (const store in stores) {
  // @ts-ignore
  makeInspectable(stores[store]);
}
export const storesContext = React.createContext(stores);

export default function App() {
  const { themeStore, appStore } = useStores();
  appStore.initValues();
  appStore.initDefaultPackages();

  return useObserver(() => (
    <ThemeProvider theme={themeStore.currentTheme}>
      <AppContainer>
        <FactoryPresenter state={appStore.currentFactory} />
        <BottomPanel>
        {/*   <MenuContainer>
            <MainMenu />
          </MenuContainer> */}
          <PanelContainer>
            <RecordsExplorer />
          </PanelContainer>
         {/*  <PanelContainer>
            <FactoriesExplorer />
          </PanelContainer> */}
        </BottomPanel>
      </AppContainer>
    </ThemeProvider>
  ));
}

const PanelContainer = styled.div`
  min-height: 300px;
  flex-grow: 1;
  border: 1px solid #525252;
`;
const MenuContainer = styled.div`
  width: 40px;
  height: 100%;
`;

const BottomPanel = styled.div`
  display: flex;
  flex-direction: row;
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.theme.flow.background};
`;
