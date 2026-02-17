import { StoreContext } from "@/context/store-context";
import { useContext } from "react";

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
