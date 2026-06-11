import "./Settings.css";

function Settings() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="settings-page">

      <div className="settings-header">
        <h1>Settings</h1>

        <p>
          Manage your account information
        </p>
      </div>

      <div className="settings-card">

        <h2>Profile Information</h2>

        <div className="profile-row">

          <div className="avatar">
            {user?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h3>{user?.name}</h3>

            <p>{user?.email}</p>

            <span className="role">
              Admin
            </span>
          </div>

        </div>

        <div className="form-group">

          <label>
            Full Name
          </label>

          <input
            type="text"
            value={user?.name || ""}
            readOnly
          />

        </div>

        <div className="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            value={user?.email || ""}
            readOnly
          />

        </div>

      </div>

    </div>
  );
}

export default Settings;