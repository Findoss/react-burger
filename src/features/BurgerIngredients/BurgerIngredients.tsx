import React, {
  useRef,
  useEffect,
  useCallback,
  SyntheticEvent,
  useMemo,
} from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'hooks/useRedux';

import { TabsIngredients } from './TabsIngredients';
import { ContainerIngredientList } from './ContainerIngredientList';
import { ModalIngredientDetails } from './ModalIngredientDetails';

import { selectActualType, selectTypesIngredient } from './service/selectors';
import { setActualType, resetActualType } from './service/slice';

import styles from './styles.module.css';

import type { Props } from './types';
import type { IngredientsType } from 'enums/Ingredients';

export const BurgerIngredients = ({ extraClass }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const $rootScroll = useRef<HTMLDivElement>(null);
  const $listIngredients = useRef<{ key: string; el: HTMLDivElement }[]>([]);

  const typesIngredient = useSelector(selectTypesIngredient).map((v) => ({
    key: v,
    title: t(`constructor.${v}`),
  }));

  const actualType = useSelector(selectActualType);

  const addToRefs = (key: string) => (el: HTMLDivElement) => {
    if (el && !$listIngredients.current.some((v) => v.el === el)) {
      $listIngredients.current.push({ key, el });
    }
  };

  // изменение actualType при прокрутке
  const handlerScroll = useCallback(() => {
    if ($rootScroll.current !== null) {
      const rootTop = $rootScroll.current.getBoundingClientRect().top;

      let key = '';
      let minDiff = Number.MAX_VALUE;

      $listIngredients.current.forEach((item) => {
        const itemTop = item.el.getBoundingClientRect().top;
        const diff = Math.abs(itemTop - rootTop);

        if (diff >= 0 && minDiff > diff) {
          minDiff = diff;
          key = item.key;
        }
      });

      if (key && key !== actualType) {
        dispatch(setActualType(key as IngredientsType));
      }
    }
  }, [dispatch, $listIngredients, actualType]);

  // нажатие на таб (автоматом скролл)
  const handlerClickTab = useCallback(
    (key: string) => {
      const item = $listIngredients.current.find((item) => item.key === key);

      if (item) {
        item.el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [$listIngredients],
  );

  useEffect(() => {
    $listIngredients.current = [];
    dispatch(resetActualType());
  }, []);

  return (
    <div className={extraClass}>
      <TabsIngredients
        title={t('constructor.constructor')}
        tabs={typesIngredient}
        onClick={handlerClickTab}
      />
      <div
        ref={$rootScroll}
        onScroll={handlerScroll}
        className={cn(styles.wrapper_lists, 'custom-scroll')}
      >
        {typesIngredient.map(({ key }) => (
          <ContainerIngredientList type={key} ref={addToRefs(key)} />
        ))}
      </div>
      <ModalIngredientDetails />
    </div>
  );
};
