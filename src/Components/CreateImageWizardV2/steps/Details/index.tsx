import React from 'react';

import {
  Form,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Text,
  Title,
} from '@patternfly/react-core';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  changeBlueprintDescription,
  changeBlueprintName,
  selectBlueprintDescription,
  selectBlueprintName,
} from '../../../../store/wizardSlice';
import { useDetailsValidation } from '../../utilities/useValidation';
import { HookValidatedInput } from '../../ValidatedTextInput';

const DetailsStep = () => {
  const dispatch = useAppDispatch();
  const blueprintName = useAppSelector(selectBlueprintName);
  const blueprintDescription = useAppSelector(selectBlueprintDescription);
  const handleNameChange = (
    _event: React.FormEvent<HTMLInputElement>,
    name: string
  ) => {
    dispatch(changeBlueprintName(name));
  };

  const handleDescriptionChange = (
    _event: React.FormEvent<HTMLInputElement>,
    description: string
  ) => {
    dispatch(changeBlueprintDescription(description));
  };

  const stepValidation = useDetailsValidation();

  return (
    <Form>
      <Title headingLevel="h1" size="xl">
        Details
      </Title>
      <Text>
        Enter a name to identify your blueprint. If no name is entered, the
        images created from this blueprint will use the name of the parent
        blueprint.
      </Text>
      <FormGroup isRequired label="Blueprint name" fieldId="blueprint-name">
        <HookValidatedInput
          ariaLabel="blueprint name"
          dataTestId="blueprint"
          value={blueprintName}
          onChange={handleNameChange}
          placeholder="Add blueprint name"
          stepValidation={stepValidation}
          fieldName="name"
        />
        <FormHelperText>
          <HelperText>
            <HelperTextItem>
              The name can be 2-100 characters with at least two letters or
              numbers
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup
        label="Blueprint description"
        fieldId="blueprint-description-name"
      >
        <HookValidatedInput
          ariaLabel="blueprint description"
          dataTestId="blueprint description"
          value={blueprintDescription || ''}
          onChange={handleDescriptionChange}
          placeholder="Add description"
          stepValidation={stepValidation}
          fieldName="description"
        />
      </FormGroup>
    </Form>
  );
};

export default DetailsStep;
