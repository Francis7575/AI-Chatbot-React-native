import { createContext, ReactNode, useContext, useState } from "react";
import { chatFaceDataType } from '../types/types'

type selectedChatFaceContextType = {
  selectedChatFace: chatFaceDataType | null
  setSelectedChatFace: React.Dispatch<React.SetStateAction<chatFaceDataType | null>>;
}

const selectedChatFaceContext = createContext<selectedChatFaceContextType | null>(null);

export const SelectedChatFaceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChatFace, setSelectedChatFace] = useState<chatFaceDataType | null>(null);

  const value = {
    selectedChatFace,
    setSelectedChatFace
  };
  return <selectedChatFaceContext.Provider value={value}>{children}</selectedChatFaceContext.Provider>;
};

export const useSelectedChatFaceContext = () => {
  const context = useContext(selectedChatFaceContext);
  if (!context) {
    throw new Error("useSelectedChatFaceContext must be within a context provider,");
  }
  return context;
};
