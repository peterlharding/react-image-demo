/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_PORT = 3000;

const parsePort = (value: string | undefined) => {
  if (!value) return DEFAULT_PORT;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`APP_PORT must be a port number between 1 and 65535, got "${value}"`);
  }
  return port;
};

export default defineConfig(({ mode }) => {
  // HOST and APP_PORT come from .env (see setup/env.template) or the shell environment.
  // They have no VITE_ prefix, so they configure the dev server without reaching client code.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: env.HOST || undefined,
      port: parsePort(env.APP_PORT),
      strictPort: true,
    },
    preview: {
      host: env.HOST || undefined,
      port: 4173,
      strictPort: true,
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      css: true,
    },
  };
});
