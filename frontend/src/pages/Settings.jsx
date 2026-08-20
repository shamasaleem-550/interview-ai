import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [sound, setSound] =
    useState(true);

  const [autoStart, setAutoStart] =
    useState(false);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            SETTINGS
          </span>

          <h1>Settings</h1>

          <p>
            Manage your interview preferences and
            account settings.
          </p>
        </div>
      </div>

      <div className="settings-panel">
        <div className="setting-row">
          <div>
            <strong>
              Email Notifications
            </strong>

            <span>
              Receive updates about your interview
              progress.
            </span>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) =>
                setNotifications(
                  event.target.checked
                )
              }
            />

            <span></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Interview Sound
            </strong>

            <span>
              Enable sounds during AI interviews.
            </span>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={sound}
              onChange={(event) =>
                setSound(event.target.checked)
              }
            />

            <span></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Auto Start Interview
            </strong>

            <span>
              Automatically start the interview after
              setup.
            </span>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={autoStart}
              onChange={(event) =>
                setAutoStart(
                  event.target.checked
                )
              }
            />

            <span></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Interview Difficulty
            </strong>

            <span>
              Choose the difficulty of generated
              questions.
            </span>
          </div>

          <select defaultValue="Adaptive">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Adaptive</option>
          </select>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Profile
            </strong>

            <span>
              Update your candidate information.
            </span>
          </div>

          <button className="small-button">
            Edit Profile
          </button>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Account
            </strong>

            <span>
              Manage your InterviewAI account.
            </span>
          </div>

          <button className="small-button">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;