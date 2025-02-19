import React, { createContext, useContext, useState, ReactNode } from "react";

// Определяем тип контекста
interface SessionContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
}

// Создаем контекст
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Провайдер контекста
export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <SessionContext.Provider value={{ userId, setUserId }}>
      {children}
    </SessionContext.Provider>
  );
};

// Хук для использования контекста
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
