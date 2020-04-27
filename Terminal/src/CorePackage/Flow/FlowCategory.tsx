
import NumericIcon from "mdi-react/NumericIcon";
import React from "react";
import ArrowDecisionOutlineIcon from "mdi-react/ArrowDecisionOutlineIcon";
import MachineCategory from "../../App/Models/MachineCategory";

export default new MachineCategory(
    "Поток",
    () => <ArrowDecisionOutlineIcon size={24}/>,
    "#4c3342"
);
