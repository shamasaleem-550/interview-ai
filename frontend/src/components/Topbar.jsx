import { useState } from "react";

import {
  Bell,
  Search,
  Plus,
  X,
  User,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [showAccount, setShowAccount] =
    useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return;
    }

    if (
      query.includes("interview") ||
      query.includes("practice")
    ) {
      navigate("/interviews");
    } else if (
      query.includes("performance") ||
      query.includes("score")
    ) {
      navigate("/performance");
    } else if (
      query.includes("analytics") ||
      query.includes("analysis")
    ) {
      navigate("/analytics");
    } else if (
      query.includes("setting") ||
      query.includes("preference")
    ) {
      navigate("/settings");
    } else if (
      query.includes("create") ||
      query.includes("new")
    ) {
      navigate("/interviews/create");
    } else if (
      query.includes("dashboard") ||
      query.includes("home")
    ) {
      navigate("/");
    }

    setSearch("");
  };

  const closeMenus = () => {
    setShowNotifications(false);
    setShowAccount(false);
  };

  const toggleNotifications = () => {
    setShowAccount(false);

    setShowNotifications(
      (current) => !current
    );
  };

  const toggleAccount = () => {
    setShowNotifications(false);

    setShowAccount(
      (current) => !current
    );
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "access_token"
    );

    closeMenus();

    navigate("/");
  };

  return (
    <header className="topbar">

      {/* SEARCH */}
      <form
        className="topbar-search"
        onSubmit={handleSearch}
      >
        <Search
          size={18}
          strokeWidth={2}
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search interviews..."
          aria-label="Search"
        />

        {search && (
          <button
            type="button"
            className="search-clear"
            onClick={() =>
              setSearch("")
            }
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}

        <span className="search-shortcut">
          /
        </span>
      </form>

      {/* ACTIONS */}
      <div className="topbar-actions">

        {/* NEW INTERVIEW */}
        <button
          type="button"
          className="quick-create"
          onClick={() =>
            navigate(
              "/interviews/create"
            )
          }
        >
          <Plus
            size={17}
            strokeWidth={2.2}
          />

          <span>
            New interview
          </span>
        </button>

        {/* NOTIFICATIONS */}
        <div className="notification-wrapper">
          <button
            type="button"
            className="icon-button"
            onClick={
              toggleNotifications
            }
            aria-label="Notifications"
            aria-expanded={
              showNotifications
            }
          >
            <Bell
              size={19}
              strokeWidth={2}
            />

            <span
              className="notification-dot"
              aria-hidden="true"
            />
          </button>

          {showNotifications && (
            <div className="notification-panel">

              {/* HEADER */}
              <div className="notification-header">
                <div>
                  <strong>
                    Notifications
                  </strong>

                  <span>
                    Your latest updates
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(
                      false
                    )
                  }
                  aria-label="Close notifications"
                >
                  <X size={16} />
                </button>
              </div>

              {/* NOTIFICATION 1 */}
              <div className="notification-item">
                <div className="notification-icon">
                  <Bell size={15} />
                </div>

                <div>
                  <strong>
                    Keep practicing
                  </strong>

                  <span>
                    Your next interview
                    session is waiting
                    for you.
                  </span>
                </div>
              </div>

              {/* NOTIFICATION 2 */}
              <div className="notification-item">
                <div className="notification-icon">
                  <Plus size={15} />
                </div>

                <div>
                  <strong>
                    New interview ready
                  </strong>

                  <span>
                    Create a personalized
                    practice session.
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* ACCOUNT */}
        <div className="account-menu-wrapper">
          <button
            type="button"
            className="topbar-avatar"
            onClick={toggleAccount}
            aria-label="Account menu"
            aria-expanded={
              showAccount
            }
          >
            U
          </button>

          {showAccount && (
            <div className="account-menu">

              {/* ACCOUNT HEADER */}
              <div className="account-menu-header">
                <div className="account-menu-avatar">
                  U
                </div>

                <div>
                  <strong>
                    Candidate
                  </strong>

                  <span>
                    Free plan
                  </span>
                </div>
              </div>

              <div className="account-menu-divider" />

              {/* MY ACCOUNT */}
              <button
                type="button"
                onClick={() => {
                  closeMenus();
                  navigate("/settings");
                }}
              >
                <User size={17} />

                <span>
                  My account
                </span>

                <ChevronRight
                  size={15}
                />
              </button>

              {/* SETTINGS */}
              <button
                type="button"
                onClick={() => {
                  closeMenus();
                  navigate("/settings");
                }}
              >
                <Settings size={17} />

                <span>
                  Settings
                </span>

                <ChevronRight
                  size={15}
                />
              </button>

              <div className="account-menu-divider" />

              {/* LOGOUT */}
              <button
                type="button"
                className="logout-item"
                onClick={handleLogout}
              >
                <LogOut size={17} />

                <span>
                  Sign out
                </span>
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;