import nextJest from 'next/jest.js';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(process.cwd(), '.env.local') });

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: resolve( './'),
});

/** @type {import('ts-jest')} */
const config = {
    modulePaths: ['<rootDir>/src'],
    collectCoverage : true,
    collectCoverageFrom : [
        '**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/*.types.ts',
        '!<rootDir>/.next/**',
        '!<rootDir>/coverage/**',
        '!<rootDir>/*.config.ts',
        '!<rootDir>/src/**',
        '!<rootDir>/pages/_app.tsx',
    ],
    testEnvironment: 'jest-environment-jsdom',
  globals: {
    'process.env.NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}    



export default createJestConfig(config);
