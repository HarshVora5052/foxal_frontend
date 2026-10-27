import axios, { AxiosError, AxiosResponse } from 'axios';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production' ? 'http://foxal.gamer.free' : 'http://localhost:8000');

/** Shared axios instance — every request is sent with cookies */
const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true, // SPA cookie auth requires this
  timeout: 10000, // 10s timeout to prevent hanging connections
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

/**
 * Call /sanctum/csrf-cookie to seed the XSRF-TOKEN cookie before
 * any mutation that requires CSRF protection (login, register, etc.).
 */
export async function initCsrf(): Promise<void> {
  await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
}

/** ----------------------------------------------------------------
 *  Response types
 * ---------------------------------------------------------------- */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

/** Shape we surface to React Hook Form for field-level errors */
export type FormErrors = Record<string, string>;

/**
 * Map a Laravel 422 validation error response to a flat object of
 * { fieldName: 'First error message' } so RHF's `setError` can consume it.
 */
export function mapValidationErrors(error: unknown): FormErrors {
  if (!axios.isAxiosError(error)) return {};

  const response = (error as AxiosError<ApiResponse>).response;
  if (response?.status !== 422 || !response.data?.errors) return {};

  const raw = response.data.errors;
  return Object.fromEntries(
    Object.entries(raw).map(([field, messages]) => [field, messages[0]])
  );
}

/** ----------------------------------------------------------------
 *  Response interceptors
 * ---------------------------------------------------------------- */
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<ApiResponse>) => {
    // Pass through — callers decide how to handle
    return Promise.reject(error);
  }
);

export default api;
