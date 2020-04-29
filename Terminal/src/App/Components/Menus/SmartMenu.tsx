import React, { useState } from "react";
import styled from "styled-components";
import { useStores } from "../../../Hooks/useStores";
import MachineCategory from "../../Models/MachineCategory";
import ContextMenuContentProps from "../ContextMenu/ContextMenuContentProps";
import Package from "../../Models/Package";
import NumericIcon from "mdi-react/NumericIcon";
import ArrowDecisionOutlineIcon from "mdi-react/ArrowDecisionOutlineIcon";
import PackageVariantClosedIcon from "mdi-react/PackageVariantClosedIcon";
import ViewDashboardOutlineIcon from "mdi-react/ViewDashboardOutlineIcon";

export default function SmartMenu({
  menuPos,
  setVisible,
}: ContextMenuContentProps) {
  var { appStore } = useStores();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  function RenderIcon(name: string) {
    switch (name) {
      case "Математика":
        return <NumericIcon size={24} />;
      case "Управление":
        return <ArrowDecisionOutlineIcon size={24} />;
      case "Виджеты":
        return <ViewDashboardOutlineIcon size={24} />;
      default:
    return <div>{name}</div>;
    }
  }

  return (
    <>
      <Card>
        <CategoriesContainer>
          {appStore.loadedPackages.map((pkg) => (
            <CategoryWrapper
              key={pkg.name}
              style={{
                filter: selectedPackage === pkg ? "brightness(120%)" : "",
              }}
              onClick={() => setSelectedPackage(pkg)}
            >
              <CategoryItem style={{ backgroundColor: pkg.color }}>
                {RenderIcon(pkg.name)}
              </CategoryItem>
            </CategoryWrapper>
          ))}
        </CategoriesContainer>
        {selectedPackage ? (
          <MachinesList>
            {selectedPackage.machinePrototypes.map((proto) => (
              <MachinesListItem
                key={proto.id.toString()}
                onClick={(ev) => {
                  appStore.createInstance(
                    proto,
                    selectedPackage.color,
                    menuPos
                  );
                  setVisible(false);
                }}
              >
                {proto.name}
              </MachinesListItem>
            ))}
          </MachinesList>
        ) : null}
      </Card>
    </>
  );
}

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MachinesList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const MachinesListItem = styled.div`
  font-size: 14px;
  padding: 2px;
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
  :hover {
    background-color: gray;
  }
`;

const CategoryWrapper = styled.div`
  flex-grow: 1;
`;

const Card = styled.div`
  min-width: 200px;
  min-height: 200px;
  background-color: #14151b;
  border-radius: 4px;

  color: white;
  font-family: Arial;
`;
