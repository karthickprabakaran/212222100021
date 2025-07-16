import axios from 'axios';

const LOG_URL = 'http://20.244.56.144/evaluation-service/logs';


let AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYXJ0aGlja3ByYWJha2FyYW4wNkBnbWFpbC5jb20iLCJleHAiOjE3NTI2NjAxMDYsImlhdCI6MTc1MjY1OTIwNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImRjNWZjNzdkLTVmODUtNDRiMC1hMDZkLTE1ZTZlYjk5Y2MzNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImthcnRoaWNrIHByYWJha2FyYW4iLCJzdWIiOiI0OTdlOGM0NC1kM2Q5LTQ2MmYtYTI5Ni02YTQzYTBhNzUxNjMifSwiZW1haWwiOiJrYXJ0aGlja3ByYWJha2FyYW4wNkBnbWFpbC5jb20iLCJuYW1lIjoia2FydGhpY2sgcHJhYmFrYXJhbiIsInJvbGxObyI6IjIxMjIyMjEwMDAyMSIsImFjY2Vzc0NvZGUiOiJxZ3VDZmYiLCJjbGllbnRJRCI6IjQ5N2U4YzQ0LWQzZDktNDYyZi1hMjk2LTZhNDNhMGE3NTE2MyIsImNsaWVudFNlY3JldCI6Im5aWEdEYnZuWlBHZFZjcmYifQ.i_D8UQ7vwjGKffd4SmBJB8UXGvfx3bqZGnZ4qMe0geU'; // <-- set this after login

export function setAuthToken(token) {
  AUTH_TOKEN = token;
}
export async function log(stack, level, pkg, message) {
  const validStacks = ['frontend', 'backend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const validPackages = ['config', 'middleware', 'utils', 'handler', 'auth', 'cache', 'controller'];

  if (
    !validStacks.includes(stack) ||
    !validLevels.includes(level) ||
    !validPackages.includes(pkg)
  ) {
    console.warn('Invalid log parameters:', { stack, level, pkg, message });
    return;
  }

  if (!AUTH_TOKEN) {
    console.warn('No auth token set for logging');
    return;
  }

  try {
    const response = await axios.post(
      LOG_URL,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      }
    );

    return response.data;
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
}
