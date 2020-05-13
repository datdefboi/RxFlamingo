import {useStores} from "./useStores";

export default function useGlobalTheme() {
  var {themeStore} = useStores();
  return themeStore.currentTheme;
}
