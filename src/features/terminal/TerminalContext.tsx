import React, { createContext, useContext, useRef, useCallback } from "react";
import type { TerminalCommand } from "./types";

type TerminalContext = {
  registerCommand: (cmd: TerminalCommand) => void;
  unregisterCommand: (name: string) => void;
  getCommands: () => TerminalCommand[];
};

const TerminalContext = createContext<TerminalContext | null>(null);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const commandsRef = useRef<Map<string, TerminalCommand>>(new Map());

  const registerCommand = useCallback((cmd: TerminalCommand) => {
    commandsRef.current.set(cmd.name, cmd);
  }, []);

  const unregisterCommand = useCallback((name: string) => {
    commandsRef.current.delete(name);
  }, []);

  const getCommands = useCallback(() => {
    return Array.from(commandsRef.current.values());
  }, []);

  return (
    <TerminalContext.Provider
      value={{ registerCommand, unregisterCommand, getCommands }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminalContext() {
  const ctx = useContext(TerminalContext);
  if (!ctx)
    throw new Error("useTerminalContext must be used within TerminalProvider");
  return ctx;
}
