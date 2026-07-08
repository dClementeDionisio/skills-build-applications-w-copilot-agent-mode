import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeItems } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(getApiBaseUrl('users'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setItems(normalizeItems(payload, 'users'));
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Users</h2>
        <span className="text-muted">{items.length} user(s)</span>
      </div>

      {loading && <p className="text-muted">Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {items.map((user) => (
            <article key={user._id || user.id} className="list-group-item d-flex justify-content-between align-items-start gap-3">
              <div>
                <h3 className="h6 mb-1">{user.name || 'Unnamed user'}</h3>
                <p className="mb-0 text-muted small">{user.email || 'No email provided'}</p>
              </div>
              <span className="badge bg-info text-dark">{user.role || 'member'}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
