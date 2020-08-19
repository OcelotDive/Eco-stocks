import React, {useRef, useState, useEffect} from "react";
import PropTypes from "prop-types";
import Key from "../../keys"

import searchStyles from "./searchBar.module.css";

const SearchBar = ({placeholder, elementClicked}) => {
  
  const stocksListUrl = 'https://financialmodelingprep.com/api/v3/company/stock/list';


  const searchRef = useRef("");
  const [displaySearches, setDisplaySearches] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);



  useEffect(() => {
    fetch(`${stocksListUrl}${Key.fmpk}`)
    .then((response) => response.json())
    .then((data) => {

      setDataList(data.symbolsList);
   
      
    });
  }, []);


  const getSearchInput = () => {
    
    searchRef.current.value.length >= 2 ? setDisplaySearches(true) : setDisplaySearches(false);

    
    setFilteredList(dataList.filter(company =>  {
     
     if(company.name !== undefined) {
       return company.name.toLowerCase().indexOf(searchRef.current.value.toLowerCase()) !== -1
       || company.symbol.toLowerCase().indexOf(searchRef.current.value.toLowerCase()) !== - 1
     } 
    })
    
    )

  }
  const resetSearchOnFocusLoss = (e) => {
    
   console.warn(elementClicked)
    if(elementClicked.includes("searchBar")) {
      e.target.focus();
      setDisplaySearches(true);
      
    }
    else {
      setDisplaySearches(false);
      searchRef.current.value = "";
    }
    
  }




  return (
<>
   
  <input className={searchStyles.input}type="text" placeholder={placeholder} ref={searchRef} onChange={getSearchInput} onBlur={resetSearchOnFocusLoss}/>
  <div className={searchStyles.searchBar}></div>

  {displaySearches &&  <ul className={searchStyles.searchResultList} >
      {
       filteredList.map(companyObj => <li key={companyObj.symbol}>{companyObj.symbol} {companyObj.name}</li>)
      }
    </ul>
    }
  
</>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired
  }
  
  SearchBar.defaultProps = {
    
  }

export default SearchBar;