import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeItems } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiBaseUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setItems(normalizeItems(payload, 'leaderboard'));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Leaderboard</h2>
        <span className="text-muted">{items.length} entry(ies)</span>
      </div>

      {loading && <p className="text-muted">Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {items.map((entry, index) => (
            <article key={entry._id || entry.id || index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h3 className="h6 mb-1">{entry.user?.name || entry.name || `Entry ${index + 1}`}</h3>
                <p className="mb-0 text-muted small">{entry.team?.name || entry.team || 'No team'}</p>
              </div>
              <span className="badge bg-primary rounded-pill">{entry.score ?? entry.points ?? '—'}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
