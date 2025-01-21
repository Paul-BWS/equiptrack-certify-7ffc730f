export const isRefreshTokenError = (error: any): boolean => {
  return (
    error?.message?.includes('refresh_token_not_found') ||
    error?.error_description?.includes('refresh_token_not_found')
  );
};

export const isConnectionError = (error: any): boolean => {
  return error?.message === 'Failed to fetch';
};

export const getAuthErrorMessage = (error: any): string => {
  if (isRefreshTokenError(error)) {
    return 'Session expired. Please sign in again.';
  }
  if (isConnectionError(error)) {
    return 'Connection error. Please check your internet connection and try refreshing the page.';
  }
  if (error?.code === 'PGRST301') {
    return 'Session expired. Please sign in again.';
  }
  return 'An error occurred. Please try again.';
};