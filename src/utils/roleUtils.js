/**
 * Case-insensitive role checking utility functions.
 * Expected roles from backend: 'ADMIN', 'USER', 'MANAGER', 'HR'.
 */

export const hasRole = (user, allowedRoles) => {
  if (!user || !user.role) return false;
  if (!allowedRoles || allowedRoles.length === 0) return true;
  
  const userRole = user.role.toUpperCase();
  return allowedRoles.map(role => role.toUpperCase()).includes(userRole);
};

export const isAdmin = (user) => hasRole(user, ['ADMIN']);
export const isManager = (user) => hasRole(user, ['MANAGER']);
export const isHR = (user) => hasRole(user, ['HR']);
export const isUser = (user) => hasRole(user, ['USER']);
