import React from 'react'

const SearchContext = React.createContext({
  isSearchValue: false,
  toggleSearch: () => {},
  toggleEnter: () => {},
  searchVal: '',
  searchValMethod: () => {},
  isDarkTheme: false,
  toggleTheme: () => {},
})

export default SearchContext
