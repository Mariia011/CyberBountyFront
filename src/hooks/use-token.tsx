import React, { createContext, useState, ReactNode } from "react";

export const TokenContext = createContext<any>(undefined);

// Провайдер контекста
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pKey, setpKey] = useState<number | null>(null);

  return (
	<TokenContext.Provider value={[ pKey, setpKey ]}>
	  {children}
	</TokenContext.Provider>
  );
};
