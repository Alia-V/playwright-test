import { chromium, type FullConfig } from '@playwright/test';
import * as path from 'node:path';
import { mkdir } from 'node:fs/promises';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  const authFile = path.resolve('playwright/.auth/user.json');

  // Создаём папку для файла авторизации
  await mkdir(path.dirname(authFile), { recursive: true });

  const username = process.env.sauce_username!;
  const password = process.env.sauce_password!;

  if (!username) {
    throw new Error('Epic sadface: Username and password do not match any user in this service');
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL!);

  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL(/inventory\.html/);

  await page.context().storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
