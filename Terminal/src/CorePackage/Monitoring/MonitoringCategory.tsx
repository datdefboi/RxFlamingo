import React from "react";
import ViewDashboardOutlineIcon from "mdi-react/ViewDashboardOutlineIcon";
import MachineCategory from "../../App/Models/MachineCategory";

export default new MachineCategory(
    "Мониторинг",
    () => <ViewDashboardOutlineIcon size={24}/>,
    "#4f3732"
);
