import React from "react";
import styled from "styled-components";
import PlusIcon from "mdi-react/PlusIcon";
import { useStores } from "../../../Hooks/useStores";
import RecordScheme, { RecordField } from "../../Models/RecordScheme";
import { useObserver } from "mobx-react-lite";
import CardPlusOutlineIcon from "mdi-react/CardPlusOutlineIcon";
import CardOutlineIcon from "mdi-react/CardOutlineIcon";
import ContentSaveIcon from "mdi-react/ContentSaveIcon";
import UUID from "../../../shared/UUID";
import RemoveIcon from "mdi-react/RemoveIcon";

export default function RecordsExplorer(props: any) {
  const { appStore } = useStores();

  function CreateRecord() {
    appStore.recordsRepo.push({
      buildinRepresentation: "none",
      fields: [],
      id: UUID.Generate(),
      isRenames: true,
      name: "new record"
    });
  }

  function CreateField(record: RecordScheme) {
    record.fields.push({
      name: "newField",
      scheme: null,
      id: UUID.Generate(),
      isRenames: true
    });
  }

  function RenderRecord(r: RecordScheme) {
    return (
      <Record key={r.id.toString()}>
        {!r.isRenames ? (
          <RecordTitle onClick={() => (r.isRenames = true)}>
            {r.name}
          </RecordTitle>
        ) : (
          <>
            <RecordRenameField
              value={r.name}
              onChange={ev => (r.name = ev.target.value)}
            />
            <ContentSaveIcon
              style={{ paddingLeft: 4, cursor: "pointer" }}
              onClick={() => (r.isRenames = false)}
              size={18}
            />
          </>
        )}
        <CardPlusOutlineIcon
          onClick={() => CreateField(r)}
          size={14}
          style={{ color: "lightgreen", paddingLeft: 12, cursor: "pointer" }}
        />
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
          <RecordTitle onClick={() => (r.isRenames = true)}>
            {r.name}
          </RecordTitle>
        ) : (
          <>
            <RecordRenameField
              value={r.name}
              autoFocus={true}
              onChange={ev => (r.name = ev.target.value)}
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
    <Container>
      <Title>
        Обозреватель записей{" "}
        <PlusIcon
          onClick={CreateRecord}
          size={20}
          style={{ color: "lightgreen", paddingLeft: 12, cursor: "pointer" }}
        />
      </Title>
      {appStore.recordsRepo.map(r => (
        <RecordGroup>
          {RenderRecord(r)}
          {r.fields.map(f => RenderField(f))}
        </RecordGroup>
      ))}
    </Container>
  ));
}

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

const Container = styled.div`
  min-height: 300px;
  border: 1px solid gray;
`;
const Title = styled.div`
  color: gray;
  align-items: center;
  display: flex;
  font-family: Consolas;
  border-bottom: 1px dotted #575757;
  padding: 8px;
`;
