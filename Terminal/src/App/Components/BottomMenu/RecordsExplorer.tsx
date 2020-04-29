import React from "react";
import styled from "styled-components";
import PlusIcon from "mdi-react/PlusIcon";
import { useStores } from "../../../Hooks/useStores";
import RecordType, { RecordField } from "../../Models/RecordType";
import { useObserver } from "mobx-react-lite";
import CardPlusOutlineIcon from "mdi-react/CardPlusOutlineIcon";
import CardOutlineIcon from "mdi-react/CardOutlineIcon";
import ContentSaveIcon from "mdi-react/ContentSaveIcon";
import UUID from "../../../shared/UUID";
import RemoveIcon from "mdi-react/RemoveIcon";
import RecordTypePicker from "../Menus/RecordTypePicker";

export default function RecordsExplorer(props: any) {
  const { appStore } = useStores();
  const pkg = appStore.currentPackage;

  function CreateRecord() {
    pkg.records.push({
      buildinRepresentation: "none",
      fields: [],
      id: UUID.Generate(),

      defaultValue: null,
      isRenames: true,
      name: "new record",
      editable: true,
    });
  }

  function CreateField(record: RecordType) {
    record.fields.push({
      name: "newField",
      type: null,
      id: UUID.Generate(),
      isRenames: true,
    });
  }

  function RenderRecord(r: RecordType) {
    return (
      <Record key={r.id.toString()}>
        {!r.isRenames ? (
          <RecordTitle onClick={() => (r.isRenames = r.editable && true)}>
            {r.name}
          </RecordTitle>
        ) : (
          <>
            <RecordRenameField
              value={r.name}
              onChange={(ev) => (r.name = ev.target.value)}
            />
            <ContentSaveIcon
              style={{ paddingLeft: 4, cursor: "pointer" }}
              onClick={() => (r.isRenames = false)}
              size={18}
            />
          </>
        )}
        {r.editable ? (
          <CardPlusOutlineIcon
            onClick={() => CreateField(r)}
            size={14}
            style={{ color: "lightgreen", paddingLeft: 12, cursor: "pointer" }}
          />
        ) : null}
      </Record>
    );
  }

  function RenderField(r: RecordField) {
    return (
      <Field key={r.id.toString()}>
        <CardOutlineIcon
          style={{ color: "cornflowerblue", marginRight: 8 }}
          size={16}
        />
        {!r.isRenames ? (
          <>
            <RecordTitle onClick={() => (r.isRenames = true)}>
              {r.name}
            </RecordTitle>
            <div style={{ paddingLeft: 8, color: "cornflowerblue", paddingRight: 8 }}> типа </div>
            <RecordTypePicker
              recordType={r.type}
              recordTypeChanged={(type) => (r.type = type)}
            />
          </>
        ) : (
          <>
            <RecordRenameField
              value={r.name}
              autoFocus={true}
              onChange={(ev) => (r.name = ev.target.value)}
            />
            <ContentSaveIcon
              style={{ paddingLeft: 4, cursor: "pointer" }}
              onClick={() => (r.isRenames = false)}
              size={18}
            />
          </>
        )}
      </Field>
    );
  }

  return useObserver(() => (
    <>
      <Title>
        Обозреватель записей{" "}
        <PlusIcon
          onClick={CreateRecord}
          size={20}
          style={{ color: "lightgreen", paddingLeft: 12, cursor: "pointer" }}
        />
      </Title>
      <RecordsContainer>
        {pkg.records.map((r) => (
          <RecordGroup>
            {RenderRecord(r)}
            {r.fields.map((f) => RenderField(f))}
          </RecordGroup>
        ))}
        {appStore.loadedPackages.map((p) =>
          p.records.map((r) => (
            <RecordGroup  key={r.name+p.name}>
              {RenderRecord(r)}
              {r.fields.map((f) => RenderField(f))}
            </RecordGroup>
          ))
        )}
      </RecordsContainer>
    </>
  ));
}

const RecordsContainer = styled.div`
  overflow-y: scroll;
  max-height: 300px;
  height: calc(100% - 40px);
`;

const RecordGroup = styled.div`
  border-bottom: 1px solid gray;
`;

const Record = styled.div`
  margin: 0 8px;
  padding: 4px 0;
  color: #c9c9c9;
  align-items: center;
  display: flex;
`;

const Field = styled.div`
  margin: 0 8px 0 20px;
  padding: 4px 0;
  color: #c9c9c9;
  align-items: center;
  display: flex;
`;

const RecordTitle = styled.div`
  cursor: text;
`;
const RecordRenameField = styled.input`
  cursor: text;
`;

const Title = styled.div`
  color: gray;
  align-items: center;
  display: flex;
  font-family: Consolas;
  border-bottom: 1px solid #575757;
  padding: 8px;
`;
