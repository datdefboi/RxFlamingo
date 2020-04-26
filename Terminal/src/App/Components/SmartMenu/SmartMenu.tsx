import React, {useState} from "react";
import styled from "styled-components";
import {useStores} from "../../../Hooks/useStores";
import MachineCategory from "../../Models/MachineCategory";
import ContextMenuContentProps from "../ContextMenu/ContextMenuContentProps";

export default function SmartMenu({
                                    menuPos,
                                    setVisible
                                  }: ContextMenuContentProps) {
  var {factoryStore} = useStores();
  const [category, setCategory] = useState<MachineCategory | null>(null);

  return (
      <>
        <Card>
          <CategoriesContainer>
            {factoryStore.machineCategories.map(cat => (
                <CategoryWrapper
                    key={cat.name}
                    onClick={() => setCategory(cat)}
                >
                  <CategoryItem style={{backgroundColor: cat.color}}>
                    {cat.icon()}
                  </CategoryItem>
                </CategoryWrapper>
            ))}
          </CategoriesContainer>
          {category ? (
              <MachinesList>
                {category.machines.map(m => (
                    <MachinesListItem
                        key={m.id.toString()}
                        onClick={ev => {
                          factoryStore.createInstance(m.id, menuPos);
                          setVisible(false);
                        }}
                    >
                      {m.name}
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
  height: 20px;
  font-size: 14px;
  padding: 4px;
  padding-left: 12px;
  cursor: pointer;
  :hover {
    background-color: gray;
  }
`;

const CategoryWrapper = styled.div`
  flex-grow: 1;
`;

const Card = styled.div`
  min-width: 140px;
  min-height: 200px;
  background-color: #14151b;
  border-radius: 4px;

  color: white;
  font-family: Arial;
`;
