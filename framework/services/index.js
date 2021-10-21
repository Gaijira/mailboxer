import Check from './check.service';

const api = () => ({
  Check: () => ({ ...Check }),
});

export default api;