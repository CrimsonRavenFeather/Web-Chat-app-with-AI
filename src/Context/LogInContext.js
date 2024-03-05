import { createContext, useContext, useState } from 'react';

const LoginInfoContext = createContext();

export const LoginInfoProvider = ({ children }) => {
  const [Myid, setMyid] = useState("");
  const [UserName , setUserName] = useState("");

  return (
    <LoginInfoContext.Provider value={{ Myid , setMyid , UserName , setUserName }}>
      {children}
    </LoginInfoContext.Provider>
  );
};

export default LoginInfoContext 
