import { type FullConfig } from '@playwright/test';
import * as path from 'node:path';
import { rm } from 'node:fs/promises';

async function globalTeardown(config: FullConfig) {
  const authFile = path.resolve('playwright/.auth/user.json');

  // Удаляем файл с сохранённой сессией
  await rm(authFile, { force: true });

  console.log('Global teardown: файл авторизации удалён');
}

export default globalTeardown;
