import React, { forwardRef } from 'react';
import cn from 'classnames';
import { useSelector } from 'hooks/useRedux';
import { useTranslation } from 'react-i18next';
import { useGetIngredientQuery } from 'store/Ingredient/hooks';

import { ContainerIngredient } from '../container-ingredient';
import { IngredientList } from 'components/ingredient-list';
import { Loader } from 'components/loader';
import { Error } from 'components/error';

import { selectIngredientsByType } from 'store/Ingredient/selectors';

import type { Props } from './types';

export const ContainerIngredientList = forwardRef<HTMLDivElement, Props>(
  ({ type }, ref) => {
    const { t } = useTranslation();

    const { data, isError, isLoading } = useGetIngredientQuery();
    const dataIdIngredients = useSelector(selectIngredientsByType(type));

    if (isError) {
      return <Error error={t('global.error')} />;
    }

    if (isLoading) {
      return <Loader />;
    }

    if (data) {
      return (
        <IngredientList ref={ref} title={t(`constructor.${type}`)}>
          {dataIdIngredients.map((id) => (
            <ContainerIngredient key={id} id={id} />
          ))}
        </IngredientList>
      );
    }

    return <Loader />;
  },
);
