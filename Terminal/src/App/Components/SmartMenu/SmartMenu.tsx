import React, {useState} from "react";
import styled from "styled-components";
import {useStores} from "../../../Hooks/useStores";
import Point from "../../../shared/Point";
import MachineCategoryPresenter from "../../State/MachineCategory/MachineCategoryPresenter";
import MachineCategory from "../../State/MachineCategory/MachineCategory";

export default function SmartMenu({onHide}: { onHide: () => void }) {
  var {factoryStore} = useStores();
  const [category, setCategory] = useState<MachineCategory | null>(null);

  return (
      <>
        <Card>
          <CategoriesContainer>
            {factoryStore.machineCategories.map(cat => (
                <CategoryWrapper onClick={() => setCategory(cat)} key={cat.name}>
                  <MachineCategoryPresenter state={cat}/>
                  {/* {cat.machines.map(m => (
                <button
                  key={m.id.toString()}
                  onClick={() => factoryStore.createInstance(m.id, Point.Zero)}
                >
                  {m.name}
                </button>*/}
                </CategoryWrapper>
            ))}
          </CategoriesContainer>
          {category ? (
              <MachinesList>
                {category.machines.map(m => (
                    <MachinesListItem
                        key={m.id.toString()}
                        onClick={() => {
                          factoryStore.createInstance(m.id, Point.Zero);
                          onHide();
                        }}
                    >
                      {m.name}
                    </MachinesListItem>
                ))}
              </MachinesList>
          ) : null}
        </Card>
        {/* {Object.entries(groups).map(([cat, protos]: [any, any]) =>
        protos.map((proto: MachinePrototype) => (
          <MenuItem
            onClick={ev => {
              factoryStore.createInstance(proto.id, new Point(0, 0));
            }}
            data={{ foo: "bar" }}
            key={proto.id.toString()}
          >
            {proto.name}
          </MenuItem>
        ))
      )}*/}
      </>
  );
}

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
