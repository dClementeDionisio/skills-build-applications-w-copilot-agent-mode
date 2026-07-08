import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { label: 'Users', path: '/users' },
  { label: 'Activities', path: '/activities' },
  { label: 'Teams', path: '/teams' },
  { label: 'Workouts', path: '/workouts' },
  { label: 'Leaderboard', path: '/leaderboard' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h1 className="h3 mb-1">Octofit Tracker</h1>
            <p className="text-muted mb-0">
              Monitor users, activity, teams, workouts, and the leaderboard.
            </p>
          </div>
          <div className={`badge ${codespaceName ? 'bg-info text-dark' : 'bg-secondary'}`}>
            {codespaceName ? `Codespaces: ${codespaceName}` : 'Local fallback mode'}
          </div>
        </div>

        <nav className="nav nav-pills mt-3 flex-wrap">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <footer className="mt-5 text-muted small">
        <p className="mb-1">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs.
        </p>
        <p className="mb-0">
          When it is unset, the app falls back to <code>http://localhost:8000/api</code> so it does not generate an undefined host.
        </p>
      </footer>
    </div>
  );
}

export default App;
