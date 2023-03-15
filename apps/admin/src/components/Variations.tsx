import { Field, Form, Formik } from 'formik';
import FormField from './FormField';
import CardBox from './CardBox';
import React, { useState } from 'react';
import Variation, {
  VariationOption,
  VariationOptionRequest,
} from '../interfaces/Variation';
import {
  useCreateVariationOptionMutation,
  useDeleteVariationOptionMutation,
  useGetVariationOptionsQuery,
} from '../services/variations';
import BaseButton from './BaseButton';
import BaseButtons from './BaseButtons';
import { mdiBrushVariant, mdiPlus, mdiTrashCan } from '@mdi/js';
import SectionTitleLineWithButton from './SectionTitleLineWithButton';
import SectionMain from './SectionMain';

type Props = {
  variation?: Variation;
  onSelect?: (option: VariationOption) => void;
};

const Variations = ({ variation, onSelect }: Props) => {
  if (!variation) {
    return <></>;
  }

  const { data } = useGetVariationOptionsQuery(variation);
  const options: VariationOption[] = data?._embedded?.options ?? [];
  const [addOption, setAddOption] = useState(false);
  const [createOption] = useCreateVariationOptionMutation();
  const [deleteOption] = useDeleteVariationOptionMutation();

  const handleCreate = (option: VariationOptionRequest) => {
    createOption({
      variation: variation,
      option: option,
    })
      .unwrap()
      .then(() => {
        setAddOption(false);
      });
  };

  const handleDelete = (option: VariationOption) => {
    deleteOption(option);
  };

  return (
    <SectionMain>
      <SectionTitleLineWithButton icon={mdiBrushVariant} title="Опції" main />
      <CardBox>
        {options?.map((option) => (
          <div
            key={option.value}
            className={`flex my-5 px-5 py-2 rounded bg-gray-50 dark:bg-slate-800 dark:text-slate-100
              ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={onSelect ? () => onSelect(option) : undefined}
          >
            <p className="flex-1">{option.value}</p>
            <BaseButton
              type="button"
              color="danger"
              icon={mdiTrashCan}
              onClick={() => handleDelete(option)}
            />
          </div>
        ))}
        {addOption && (
          <Formik initialValues={{ value: '' }} onSubmit={handleCreate}>
            <Form className="mb-10">
              <FormField label="Опції">
                <Field name="value" placeholder="Значення" />
              </FormField>
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Додати" />
                <BaseButton
                  type="reset"
                  color="info"
                  outline
                  label="Очистити"
                />
              </BaseButtons>
            </Form>
          </Formik>
        )}
        <BaseButtons>
          <BaseButton
            color="info"
            label="Додати"
            icon={mdiPlus}
            onClick={() => setAddOption(true)}
          />
        </BaseButtons>
      </CardBox>
    </SectionMain>
  );
};

export default Variations;
