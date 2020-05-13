import React from "react";
import {storesContext} from "../AppRoot/App";

export const useStores = (() => React.useContext(storesContext));
