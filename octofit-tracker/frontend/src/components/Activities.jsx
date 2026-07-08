import { useEffect, useState } from 'react';
import { normalizeItems } from '../utils/api';

function buildApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities';
}

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl());
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setItems(normalizeItems(payload, 'activities'));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Activities</h2>
        <span className="text-muted">{items.length} item(s)</span>
      </div>

      {loading && <p className="text-muted">Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {items.map((activity) => (
            <article key={activity._id || activity.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3 className="h6 mb-1">{activity.title || 'Untitled activity'}</h3>
                  <p className="mb-1 text-muted">
                    {activity.type || 'activity'} · {activity.durationMinutes || 0} min
                  </p>
                  <p className="mb-0 small text-muted">
                    {activity.date ? new Date(activity.date).toLocaleDateString() : 'No date'}
                  </p>
                </div>
                <div className="text-end small">
                  <div>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</div>
                  <div>{activity.caloriesBurned ? `${activity.caloriesBurned} kcal` : '—'}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Activities;
