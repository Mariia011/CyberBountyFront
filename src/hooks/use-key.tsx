import React, { createContext, useState, ReactNode } from "react";

// Определяем тип контекста
// interface SessionContextType {
//   pKey: number | null;
//   setpKey: (id: number | null) => void;
// }

// Создаем контекст
export const SessionContext = createContext<any>(undefined);

// Провайдер контекста
export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pKey, setpKey] = useState<number | null>(null);

  return (
    <SessionContext.Provider value={[ pKey, setpKey ]}>
      {children}
    </SessionContext.Provider>
  );
};
