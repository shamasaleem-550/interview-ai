import {
  LayoutDashboard,
  Video,
  Plus,
  BarChart3,
  Settings,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Brain,
  BookOpen,
  LineChart,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const mainItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "My Interviews",
      path: "/interviews",
      icon: Video,
      count: 3,
    },
    {
      label: "Create Interview",
      path: "/interviews/create",
      icon: Plus,
    },
    {
      label: "Performance",
      path: "/performance",
      icon: BarChart3,
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: LineChart,
    },
  ];

  const toolItems = [
    {
      label: "AI Coach",
      path: "/ai-coach",
      icon: Brain,
      pro: true,
    },
    {
      label: "Question Bank",
      path: "/question-bank",
      icon: BookOpen,
      pro: true,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path, pro = false) => {
    /*
      AI Coach and Question Bank do not currently have
      pages/routes in App.jsx.

      For now, send the user to Performance when they
      click these PRO features instead of sending them
      to a broken route.
    */

    if (pro) {
      navigate("/performance");
      return;
    }

    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">

        {/* BRAND */}
        <div className="brand">
          <div className="brand-logo">
            <Sparkles size={21} strokeWidth={2.2} />
          </div>

          <div className="brand-copy">
            <div className="brand-name">
              InterviewAI
            </div>

            <div className="brand-subtitle">
              Career copilot
            </div>
          </div>
        </div>

        {/* WORKSPACE SWITCHER */}
        <button
          type="button"
          className="workspace-switcher"
          onClick={() => navigate("/settings")}
        >
          <div className="workspace-avatar">
            AI
          </div>

          <div className="workspace-text">
            <strong>
              Personal workspace
            </strong>

            <span>
              Free plan
            </span>
          </div>

          <ChevronRight size={15} />
        </button>

        {/* WORKSPACE LABEL */}
        <div className="sidebar-label">
          WORKSPACE
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="sidebar-nav">
          {mainItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={
                  isActive(item.path)
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  handleNavigation(item.path)
                }
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                />

                <span>
                  {item.label}
                </span>

                {item.count && (
                  <span className="nav-count">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* TOOLS LABEL */}
        <div className="sidebar-label">
          TOOLS
        </div>

        {/* TOOLS */}
        <nav className="sidebar-nav">
          {toolItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={
                  isActive(item.path)
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  handleNavigation(
                    item.path,
                    item.pro
                  )
                }
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                />

                <span>
                  {item.label}
                </span>

                {item.pro && (
                  <span className="pro-badge">
                    PRO
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* MANAGE */}
        <div className="sidebar-label manage-label">
          MANAGE
        </div>

        <button
          type="button"
          className={
            isActive("/settings")
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            navigate("/settings")
          }
        >
          <Settings
            size={19}
            strokeWidth={2}
          />

          <span>
            Settings
          </span>
        </button>
      </div>

      {/* SIDEBAR BOTTOM */}
      <div className="sidebar-bottom">

        {/* UPGRADE CARD */}
        <div className="upgrade-card">
          <div className="upgrade-icon">
            <Sparkles
              size={18}
              strokeWidth={2.2}
            />
          </div>

          <h4>
            Unlock your potential
          </h4>

          <p>
            Get deeper AI feedback and
            advanced interview insights.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/performance")
            }
          >
            <span>
              Explore features
            </span>

            <ArrowUpRight
              size={15}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* ACCOUNT */}
        <button
          type="button"
          className="account-card"
          onClick={() =>
            navigate("/settings")
          }
        >
          <div className="account-avatar">
            U
          </div>

          <div className="account-copy">
            <strong>
              My Account
            </strong>

            <span>
              Candidate
            </span>
          </div>

          <ChevronRight
            size={16}
            strokeWidth={2}
          />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;