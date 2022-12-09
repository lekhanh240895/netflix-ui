import type { RootState } from './store';

export const appSelector = (state: RootState) => state.app;
export const authSelector = (state: RootState) => state.auth;
