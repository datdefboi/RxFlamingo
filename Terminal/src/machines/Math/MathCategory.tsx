import MachineCategory from "../../App/State/MachineCategory/MachineCategory";
import NumericIcon from "mdi-react/NumericIcon";
import React from "react";

export default new MachineCategory(
    "Математика",
    () => <NumericIcon size={30}/>,
    "#394f39"
);
