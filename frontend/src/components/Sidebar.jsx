import { useState } from "react";
import SidebarButton from "./SidebarButton";
import {
  LayoutDashboard,
  Upload,
  SquareCheckBig,
  Gift,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar({ activeButtonIndex = 0 }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{ transition: "width 300ms ease, padding 300ms ease" }}
      className="flex-col hidden overflow-hidden border-r lg:flex border-border bg-card"
    >
      <div
        style={{
          width: collapsed ? "64px" : "256px",
          padding: collapsed ? "12px" : "24px",
          transition: "width 300ms ease, padding 300ms ease",
        }}
        className="flex flex-col h-full"
      >
        <div className="flex items-center justify-between mb-10">
          <span
            style={{
              maxWidth: collapsed ? "0px" : "200px",
              opacity: collapsed ? 0 : 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "max-width 300ms ease, opacity 300ms ease",
            }}
            className="text-xl font-bold text-gradient"
          >
            Везилка
          </span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarButton
            isActive={activeButtonIndex == 0}
            Icon={LayoutDashboard}
            collapsed={collapsed}
            href={"/dashboard"}
          >
            Контролна табла
          </SidebarButton>
          <SidebarButton
            isActive={activeButtonIndex == 1}
            Icon={Upload}
            collapsed={collapsed}
            href={"/upload"}
          >
            Прикачи
          </SidebarButton>
          <SidebarButton
            isActive={activeButtonIndex == 2}
            Icon={SquareCheckBig}
            collapsed={collapsed}
          >
            Прегледај
          </SidebarButton>
          <SidebarButton
            isActive={activeButtonIndex == 3}
            Icon={Gift}
            collapsed={collapsed}
          >
            Награди
          </SidebarButton>
          <SidebarButton
            isActive={activeButtonIndex == 4}
            Icon={User}
            collapsed={collapsed}
          >
            Профил
          </SidebarButton>
        </nav>

        <button
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          title={collapsed ? "Одјави се" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span
            style={{
              maxWidth: collapsed ? "0px" : "200px",
              opacity: collapsed ? 0 : 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "max-width 300ms ease, opacity 300ms ease",
            }}
          >
            Одјави се
          </span>
        </button>
      </div>
    </aside>
  );
}
