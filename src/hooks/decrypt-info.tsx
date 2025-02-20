import React, { createContext, useState, ReactNode } from "react";

export const DecryptInfoContext = createContext<any>(undefined);

export const DecryptInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [DecryptInfo, setDecryptInfo] = useState<{
	cid: string,
	encKey: string,
	iv: string,
	privateKey: string
  } | null>(null);

  return (
	<DecryptInfoContext.Provider value={[ DecryptInfo, setDecryptInfo ]}>
	  {children}
	</DecryptInfoContext.Provider>
  );
};