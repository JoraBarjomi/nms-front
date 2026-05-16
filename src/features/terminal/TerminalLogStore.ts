type LogEntry = {
  type: "log" | "error" | "warn";
  message: string;
  timestamp: number;
};

const listeners = new Set<(entry: LogEntry) => void>();
const history: LogEntry[] = [];
let isPatched = false;

export function addTerminalLogListener(cb: (entry: LogEntry) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getTerminalLogHistory(): readonly LogEntry[] {
  return history;
}

export function writeTerminalLog(type: LogEntry["type"], message: string) {
  const entry: LogEntry = { type, message, timestamp: Date.now() };
  history.push(entry);
  if (history.length > 2000) history.shift();
  listeners.forEach((cb) => cb(entry));
}

function formatConsoleArgs(args: any[]): string {
  if (args.length === 0) return "";

  const first = args[0];
  if (typeof first !== "string") {
    return args.map(String).join(" ");
  }

  let result = first;
  let argIndex = 1;

  result = result.replace(/%([sdifjoOc%])/g, (match, spec) => {
    if (spec === "%") return "%";
    if (argIndex >= args.length) return match;
    const arg = args[argIndex++];
    switch (spec) {
      case "s":
        return String(arg);
      case "d":
      case "i":
        return Number.isNaN(parseInt(arg, 10))
          ? "NaN"
          : parseInt(arg, 10).toString();
      case "f":
        return Number.isNaN(parseFloat(arg))
          ? "NaN"
          : parseFloat(arg).toString();
      case "o":
      case "O":
        try {
          return JSON.stringify(arg);
        } catch {
          return "[Object]";
        }
      case "c":
        return "";
      default:
        return match;
    }
  });

  if (argIndex < args.length) {
    result += " " + args.slice(argIndex).map(String).join(" ");
  }

  return result;
}

export function initTerminalConsolePatch() {
  if (isPatched || typeof window === "undefined") return;
  isPatched = true;

  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args: any[]) => {
    originalLog(...args);
    writeTerminalLog("log", formatConsoleArgs(args));
  };

  console.error = (...args: any[]) => {
    originalError(...args);
    writeTerminalLog("error", formatConsoleArgs(args));
  };

  console.warn = (...args: any[]) => {
    originalWarn(...args);
    writeTerminalLog("warn", formatConsoleArgs(args));
  };
}
