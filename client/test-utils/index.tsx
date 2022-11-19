/* eslint-disable import/no-extraneous-dependencies */
import type { RenderOptions } from '@testing-library/react';
import { render as rtlRender, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { MainLayout } from '@/layouts/MainLayout';
import { createStore } from '@/redux/store';

function ComponentWrapper({ children }: { children: ReactNode }) {
  const store = createStore();
  return <MainLayout store={store}>{children}</MainLayout>;
}

function render(ui: React.ReactElement, renderOptions?: RenderOptions) {
  function StoreWrapper({ children }: { children: ReactNode }) {
    return <ComponentWrapper>{children}</ComponentWrapper>;
  }

  return rtlRender(ui, {
    wrapper: StoreWrapper,
    ...renderOptions,
  });
}

export * from '@testing-library/react';

export { render };

export type TestCaseMethod = 'get' | 'find' | 'query';

function methodByText(method: TestCaseMethod) {
  if (method === 'find') return 'findByText';
  if (method === 'query') return 'queryByText';
  return 'getByText';
}

function methodAllByText(method: TestCaseMethod) {
  if (method === 'find') return 'findAllByText';
  if (method === 'query') return 'queryAllByText';
  return 'getAllByText';
}

export const getElementByText = (text: string, method: TestCaseMethod = 'get') => {
  return screen[methodByText(method)](text);
};
export const getAllElementByText = (text: string, method: TestCaseMethod = 'get') => {
  return screen[methodAllByText(method)](text);
};
