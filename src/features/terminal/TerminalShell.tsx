import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import "xterm/css/xterm.css";
import { useTerminalContext } from "./TerminalContext";
import {
  addTerminalLogListener,
  getTerminalLogHistory,
} from "./TerminalLogStore";

import { useAppTheme } from "../../app/AppThemeContext";
import { type PaletteMode } from "@mui/material";

const getTerminalTheme = (mode: PaletteMode) => {
  const isDark = mode === "dark";
  return {
    background: isDark ? "#282C34" : "#F8FAFC",
    foreground: isDark ? "#ABB2BF" : "#1E293B",
    cursor: "#26A269",
    cursorAccent: "#FFFFFF",
    selectionBackground: isDark ? "#3E4451" : "#CBD5E1",
    selectionForeground: isDark ? "#ABB2BF" : "#1E293B",
    black: "#3F4451",
    red: "#E05561",
    green: "#26A269",
    yellow: "#D18F52",
    blue: "#4AA5F0",
    magenta: "#A48CF2",
    cyan: "#42B3C2",
    white: "#D7DAE0",
    brightBlack: "#4F5666",
    brightRed: "#FF616E",
    brightGreen: "#4DBD74",
    brightYellow: "#EBC06D",
    brightBlue: "#6CB8F9",
    brightMagenta: "#C5A3FF",
    brightCyan: "#5FC0CC",
    brightWhite: "#FFFFFF",
  };
};

type TerminalShellProps = {
  height?: string | number;
};

export function TerminalShell({ height = 400 }: TerminalShellProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const { getCommands } = useTerminalContext();
  const { mode } = useAppTheme();

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      theme: getTerminalTheme(mode),
      cursorBlink: true,
      fontFamily: '"Ubuntu Mono", monospace',
      fontSize: 16,
      scrollback: 5000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    termInstance.current = term;

    const prompt = () =>
      term.write("\x1b[1;38;2;38;162;105mnms@admin\x1b[0m:~$ ");

    term.writeln('Type "help" to see available commands.');
    prompt();

    let commandBuffer = "";
    let cursorPos = 0;

    const writeLog = (entry: {
      type: "log" | "error" | "warn";
      message: string;
    }) => {
      if (!termInstance.current?.element?.isConnected) return;

      const prefix =
        entry.type === "error"
          ? "\x1b[31m[SYS-ERR]\x1b[0m "
          : entry.type === "warn"
            ? "\x1b[33m[SYS-WRN]\x1b[0m "
            : "\x1b[34m[SYS-LOG]\x1b[0m ";

      if (commandBuffer.length > 0) {
        term.write("\r\n");
      }

      term.writeln(prefix + entry.message);
      prompt();
      term.write(commandBuffer);
    };

    getTerminalLogHistory().forEach(writeLog);
    const unsubscribe = addTerminalLogListener(writeLog);

    const processCommand = (cmd: string) => {
      const args = cmd.trim().split(" ").filter(Boolean);
      const mainCmd = args[0]?.toLowerCase() ?? "";

      if (mainCmd === "") return;
      if (mainCmd === "clear") {
        term.clear();
        return;
      }

      const commands = getCommands();
      const found = commands.find((c) => c.name === mainCmd);

      if (found) {
        const api = {
          writeln: (text: string) => term.writeln(text),
          write: (text: string) => term.write(text),
          clear: () => term.clear(),
          getCommands: () => getCommands(),
        };
        try {
          const result = found.execute(args, api);
          if (result instanceof Promise) {
            result.catch((err) => {
              term.writeln(`\x1b[31mError:\x1b[0m ${err?.message ?? err}`);
            });
          }
        } catch (err: any) {
          term.writeln(`\x1b[31mError:\x1b[0m ${err?.message ?? err}`);
        }
      } else {
        term.writeln(`\x1b[31mCommand not found:\x1b[0m ${mainCmd}`);
      }
    };

    const disposable = term.onData((data) => {
      if (data === "\r" || data === "\n") {
        term.write("\r\n");
        processCommand(commandBuffer);
        commandBuffer = "";
        cursorPos = 0;
        prompt();
        return;
      }

      if (data === "\x7f") {
        if (cursorPos > 0) {
          if (cursorPos === commandBuffer.length) {
            term.write("\b \b");
          } else {
            const after = commandBuffer.slice(cursorPos);
            term.write("\b \b" + after + " ");
            term.write(`\x1b[${after.length + 1}D`);
          }
          commandBuffer =
            commandBuffer.slice(0, cursorPos - 1) +
            commandBuffer.slice(cursorPos);
          cursorPos--;
        }
        return;
      }

      if (data === "\x1b[3~") {
        if (cursorPos < commandBuffer.length) {
          const before = commandBuffer.slice(0, cursorPos);
          const after = commandBuffer.slice(cursorPos + 1);
          term.write(after + " ");
          term.write(`\x1b[${after.length + 1}D`);
          commandBuffer = before + after;
        }
        return;
      }

      if (data === "\x1b[B" || data === "\x1b[A") return;

      if (data === "\x1b[D") {
        if (cursorPos > 0) {
          cursorPos--;
          term.write(data);
        }
        return;
      }

      if (data === "\x1b[C") {
        if (cursorPos < commandBuffer.length) {
          cursorPos++;
          term.write(data);
        }
        return;
      }

      if (data === "\t") {
        if (cursorPos !== commandBuffer.length) {
          term.write("\x07");
          return;
        }

        const matches = getCommands()
          .map((c) => c.name)
          .filter((name) => name.startsWith(commandBuffer));

        if (matches.length === 0) {
          term.write("\x07");
          return;
        }

        if (matches.length === 1) {
          const completion = matches[0].slice(commandBuffer.length);
          term.write(completion + " ");
          commandBuffer += completion + " ";
          cursorPos = commandBuffer.length;
          return;
        }

        term.write("\r\n");
        term.writeln(matches.join("  "));
        prompt();
        term.write(commandBuffer);
        return;
      }

      if (data === "\x03") {
        term.write("^C");
        commandBuffer = "";
        cursorPos = 0;
        term.write("\r\n");
        prompt();
        return;
      }

      const code = data.charCodeAt(0);
      if (code >= 32 || data.length > 1) {
        if (cursorPos === commandBuffer.length) {
          term.write(data);
          commandBuffer += data;
          cursorPos += data.length;
        } else {
          const before = commandBuffer.slice(0, cursorPos);
          const after = commandBuffer.slice(cursorPos);
          commandBuffer = before + data + after;
          term.write(data + after);
          term.write(`\x1b[${after.length}D`);
          cursorPos += data.length;
        }
        return;
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      try {
        if (
          terminalRef.current?.clientWidth &&
          terminalRef.current?.clientHeight
        ) {
          fitAddon.fit();
        }
      } catch (err) {}
    });

    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      disposable.dispose();
      unsubscribe();
      term.dispose();
    };
  }, [getCommands]);

  useEffect(() => {
    if (termInstance.current) {
      termInstance.current.options.theme = getTerminalTheme(mode);
    }
  }, [mode]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: typeof height === "number" ? `${height}px` : height,
        paddingTop: "10px",
        paddingBottom: "10px",
        overflow: "hidden",
      }}
    />
  );
}
