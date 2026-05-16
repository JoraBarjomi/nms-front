export type TerminalApi = {
  writeln: (text: string) => void;
  write: (text: string) => void;
  clear: () => void;
  getCommands: () => TerminalCommand[];
};

export type TerminalCommand = {
  name: string;
  description: string;
  execute: (args: string[], api: TerminalApi) => void | Promise<void>;
};
