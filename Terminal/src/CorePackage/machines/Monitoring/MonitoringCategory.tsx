import React from "react";
import MachineCategory from "../../../App/Models/MachineCategory";
import ViewDashboardOutlineIcon from "mdi-react/ViewDashboardOutlineIcon";

export default new MachineCategory(
    "Мониторинг",
    () => <ViewDashboardOutlineIcon size={24}/>,
    "#4f3732"
);
