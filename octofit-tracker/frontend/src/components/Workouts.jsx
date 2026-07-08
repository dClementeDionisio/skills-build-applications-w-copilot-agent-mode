import { useEffect, useState } from 'react';
import { normalizeItems } from '../utils/api';

function buildApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return `${baseUrl}/workouts/`;
}

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl());
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setItems(normalizeItems(payload, 'workouts'));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Workouts</h2>
        <span className="text-muted">{items.length} workout(s)</span>
      </div>

      {loading && <p className="text-muted">Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {items.map((workout) => (
            <article key={workout._id || workout.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3 className="h6 mb-1">{workout.name || 'Untitled workout'}</h3>
                  <p className="mb-0 text-muted small">{workout.description || 'No description available.'}</p>
                </div>
                <span className="badge bg-success">{workout.durationMinutes || 0} min</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
