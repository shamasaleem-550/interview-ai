import { NavLink } from "react-router-dom";

function AppLayout({ children }) {
  const navigation = [
    {
      label: "Dashboard",
      path: "/",
      icon: "⌂",
    },
    {
      label: "Interviews",
      path: "/interviews",
      icon: "▣",
    },
    {
      label: "Performance",
      path: "/performance",
      icon: "↗",
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: "◒",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        {/* Brand */}
        <div className="brand">
          <div className="brand-mark">✦</div>

          <div>
            <strong>InterviewAI</strong>
            <span>AI INTERVIEW COACH</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile */}
        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="profile-avatar">JD</div>

            <div>
              <strong>John Doe</strong>
              <span>Candidate</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;