// src/stores/theme-store.tsx
import {action, observable} from "mobx";
import dark from "../../themes/dark";
import ITheme from "../../themes/ITheme";

export default class ThemeStore {
  @observable
  currentTheme = dark;
  @observable
  themes = [dark];

  @action
  changeTheme(newTheme: ITheme) {
    this.currentTheme = newTheme;
  }
}
