import type { CurrentUser } from '@/services/auth';

export default function access(initialState?: { currentUser?: CurrentUser }) {
  const { currentUser } = initialState ?? {};
  return {
    canAccessApp: Boolean(currentUser),
  };
}
