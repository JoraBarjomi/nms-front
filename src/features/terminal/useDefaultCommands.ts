import { useEffect } from "react";
import { useTerminalContext } from "./TerminalContext";
import { useAppTheme } from "../../app/AppThemeContext";
import { getUser } from "../../shared/utils/authHelpers";
import { logout } from "../../shared/utils/authHelpers";

export function useDefaultCommands() {
  const { registerCommand, unregisterCommand } = useTerminalContext();
  const { toggleTheme } = useAppTheme();

  useEffect(() => {
    registerCommand({
      name: "help",
      description: "Show available commands",
      execute: (_args, api) => {
        const commands = api.getCommands();
        api.writeln("Available commands:");
        commands.forEach((cmd) => {
          const padded = cmd.name.padEnd(8);
          api.writeln(`  \x1b[33m${padded}\x1b[0m - ${cmd.description}`);
        });
      },
    });

    registerCommand({
      name: "theme",
      description: "Toggle light/dark application theme",
      execute: (_args, api) => {
        toggleTheme();
        api.writeln("\x1b[32m[SUCCESS]\x1b[0mTheme toggled!");
      },
    });

    /*
    registerCommand({
      name: "status",
      description: "Show system status",
      execute: async (_args, api) => {
        try {
          await getSystemHealth();
          api.writeln(`Status: \x1b[32m[ONLINE]\x1b[0m`);
        } catch {
          api.writeln(`Status: \x1b[31m[OFFLINE]\x1b[0m`);
        }
      },
    });
    */

    registerCommand({
      name: "throw",
      description: "Simulate fatal error",
      execute: (_args, api) => {
        console.error("Simulation of fatal core failure!");
        api.writeln(
          "\x1b[31m[SYS-ERR]\x1b[0m Simulation of fatal core failure!",
        );
      },
    });

    registerCommand({
      name: "user",
      description: "Cout all info about user",
      execute: (_args, api) => {
        const user = getUser();
        api.writeln(
          `User ${user?.username}\r\nID:${user?.id}\r\nSession start: ${user?.sessionStart}\r\nSession end: ${user?.sessionEnd}\r`,
        );
      },
    });

    registerCommand({
      name: "whoami",
      description: "Cout user name",
      execute: (_args, api) => {
        const user = getUser();
        api.writeln(`${user?.username}\r`);
      },
    });

    registerCommand({
      name: "logout",
      description: "Logout from system",
      execute: (_args, api) => {
        api.writeln(`See you late. Bye.`);
        logout();
      },
    });

    return () => {
      unregisterCommand("help");
      unregisterCommand("theme");
      unregisterCommand("status");
      unregisterCommand("throw");
    };
  }, [registerCommand, unregisterCommand, toggleTheme]);
}
