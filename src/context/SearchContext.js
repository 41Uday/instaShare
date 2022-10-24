import React from 'react'

const SearchContext = React.createContext({
  isSearchValue: false,
  toggleSearch: () => {},
  toggleEnter: () => {},
  searchVal: '',
  searchValMethod: () => {},
})

export default SearchContext
