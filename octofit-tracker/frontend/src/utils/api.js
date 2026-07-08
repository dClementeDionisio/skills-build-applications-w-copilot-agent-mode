function getApiBaseUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : '/api';

  return `${baseUrl}/${resource}/`;
}

function normalizeItems(payload, resource) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload[resource])) {
    return payload[resource];
  }

  const fallbackKeys = ['activities', 'leaderboard', 'teams', 'users', 'workouts'];
  for (const key of fallbackKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  return [];
}

export { getApiBaseUrl, normalizeItems };
