import React from 'react';

import { Main as MainLayout } from 'features/layout-main';

export const NotFound = () => {
  return <>404</>;
};

export const PageNotFound = () => {
  return (
    <MainLayout>
      <NotFound />
    </MainLayout>
  );
};
