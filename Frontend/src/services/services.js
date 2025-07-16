import axios from 'axios';

const LOGGING_URL = 'http://20.244.56.144/evaluation-service/logs';


export async function log(stack, level, pkg, message) {
  const validStacks = ['frontend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const validPackages = ['config', 'middleware', 'utils', 'handler', 'db'];

  if (
    !validStacks.includes(stack) ||
    !validLevels.includes(level) ||
    !validPackages.includes(pkg)
  ) {
    console.warn('Invalid log parameters', { stack, level, pkg, message });
    return;
  }

  try {
    const response = await axios.post(LOGGING_URL, {
      stack,
      level,
      package: pkg,
      message
    });

    return response.data;
  } 
}
