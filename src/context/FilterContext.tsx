"use client";
import React, { createContext, useReducer, ReactNode } from "react";


interface Filters {
  search: string;
  category: string;
}

type FilterAction = { type: "SETSEARCH"; payload: string } | { type: "SETCATEGORY"; payload: string };


function filterReducer(state: Filters, action: FilterAction): Filters {
  switch (action.type) {
    case "SETSEARCH":
      return { ...state, search: action.payload };
    case "SETCATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
}


interface FilterContextType {
  filters: Filters;
  dispatch: React.Dispatch<FilterAction>;
}

const defaultValue = {
  filters: { search: "", category: "" },
  dispatch: () => {}, 
};

export const FilterContext = createContext<FilterContextType>(defaultValue);

export function FilterProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [filters, dispatch] = useReducer(filterReducer, defaultValue.filters);

  return (
    <FilterContext.Provider value={{ filters, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}
