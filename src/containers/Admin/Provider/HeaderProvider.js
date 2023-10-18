import React, { useState } from "react";

export const HeaderContext = React.createContext({
  searchString: "",
  setSearchString: () => {},
  updatedOrg: false,
  setUpdatedOrg: () => {},
});

export const HeaderProvider = (props) => {
  const [searchString, setSearchString] = useState("");
  const [updatedOrg, setUpdatedOrg] = useState(false);

  return (
    <HeaderContext.Provider
      value={{ searchString, setSearchString, updatedOrg, setUpdatedOrg }}
    >
      {props.children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => React.useContext(HeaderContext);
