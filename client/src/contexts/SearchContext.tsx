import {createContext, ReactNode, useState} from "react";

interface SearchContextProps{
  searchQuery: string;
  setSearchQuery: (search: string) => void;
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