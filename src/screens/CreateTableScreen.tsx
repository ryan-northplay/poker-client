import React, { useReducer, useCallback } from "react";
import styled from "styled-components";

import ConnectionStatus from "../components/ConnectionStatus";

import type { Reducer, FormEventHandler, ChangeEventHandler } from "react";
import type { FCWithoutChildren } from "../types/component";
import type { CreateTableOptions } from "../state/store";

const updateOptionsAction = (payload: Partial<CreateTableOptions>) => ({
  payload,
  type: "updateOptions",
});

const reducer: Reducer<
  CreateTableOptions,
  ReturnType<typeof updateOptionsAction>
> = (state, action) => {
  switch (action.type) {
    case "updateOptions":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const CreateTableScreen: FCWithoutChildren<{
  onCreateTable: (options: CreateTableOptions) => void;
}> = ({ onCreateTable }) => {
  const [state, dispatch] = useReducer(reducer, {
    tableName: "",
    numberOfSeats: 5,
    smallBlind: 1,
    startingChipCount: 100,
    highlightRelevantCards: false,
  });

  const handleSubmit = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      if (state.tableName) onCreateTable(state);
    },
    [onCreateTable, state]
  );

  const handleTableNameChange = useCallback<InputChangeHandler>(
    (event) => dispatch(updateOptionsAction({ tableName: event.target.value })),
    []
  );

  const handleNumSeatsChange = useCallback<InputChangeHandler>(
    (event) =>
      dispatch(
        updateOptionsAction({ numberOfSeats: Number(event.target.value) })
      ),
    []
  );

  const handleSmallBlindChange = useCallback<InputChangeHandler>(
    (event) =>
      dispatch(updateOptionsAction({ smallBlind: Number(event.target.value) })),
    []
  );

  const handleChipCountChange = useCallback<InputChangeHandler>(
    (event) =>
      dispatch(
        updateOptionsAction({ startingChipCount: Number(event.target.value) })
      ),
    []
  );

  const handleHighlightRelevantCardsChange = useCallback<InputChangeHandler>(
    (event) =>
      dispatch(
        updateOptionsAction({
          highlightRelevantCards: event.target.checked,
        })
      ),
    []
  );

  return (
    <Container>
      <ConnectionStatus />
      <Title>Create Table</Title>
      <CreateTableForm onSubmit={handleSubmit}>
        <FormItem>
          Table Name:
          <FormInput value={state.tableName} onChange={handleTableNameChange} />
        </FormItem>
        <FormItem>
          Number of players:
          <FormInput
            value={state.numberOfSeats}
            onChange={handleNumSeatsChange}
          />
        </FormItem>
        <FormItem>
          Small Blind:
          <FormInput
            value={state.smallBlind}
            onChange={handleSmallBlindChange}
          />
        </FormItem>
        <FormItem>
          Starting Chip Count:
          <FormInput
            value={state.startingChipCount}
            onChange={handleChipCountChange}
          />
        </FormItem>
        <FormItem>
          Highlight Relevant Cards:
          <FormCheckBox
            type="checkbox"
            name="highlightRelevantCards"
            value="Highlight Relevant Cards:"
            checked={state.highlightRelevantCards}
            onChange={handleHighlightRelevantCardsChange}
          />
        </FormItem>
        <SubmitButton disabled={!state.tableName}>Submit</SubmitButton>
      </CreateTableForm>
    </Container>
  );
};

export default CreateTableScreen;

const Container = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1``;

const CreateTableForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.label`
  display: flex;
  justify-content: space-between;
`;

const FormInput = styled.input.attrs(() => ({ type: "text" }))`
  margin-left: 1em;
`;

const FormCheckBox = styled.input.attrs(() => ({ type: "checkbox" }))`
  margin-left: 1em;
`;

const SubmitButton = styled.button`
  align-self: center;
  margin-top: 20px;
`;

type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;
