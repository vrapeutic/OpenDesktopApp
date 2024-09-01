import { createContext } from 'react';

type myCenter = {
  id?: string;
  attributes?: {
    name?: string;
  };
};

export const dataContext = createContext<any>({});
