import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

interface SearchContextProps{
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export const SearchProvider = ({children} : {children: ReactNode}) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  return(
    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      {children}
    </SearchContext.Provider>
  )
}