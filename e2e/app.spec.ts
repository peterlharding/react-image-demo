import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { expect, test, type Download, type Page } from '@playwright/test';

const cleopatra = fileURLToPath(new URL('../src/assets/cleopatra.jpg', import.meta.url));
const cleopatraSize = { width: 602, height: 905 };

/** Width and height from a PNG's IHDR chunk. */
async function pngSize(download: Download) {
  const path = await download.path();
  const bytes = await readFile(path);
  expect(bytes.subarray(1, 4).toString('ascii')).toBe('PNG');
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

async function openNav(page: Page) {
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  if (await toggle.isVisible()) {
    await toggle.click();
  }
}

async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

/** The footer sits below the page content rather than covering it. */
async function expectFooterClear(page: Page) {
  // Measure both in one snapshot so a layout shift between the two reads cannot skew the comparison.
  const gap = await page.evaluate(() => {
    const main = document.querySelector('main')?.getBoundingClientRect();
    const footer = document.querySelector('footer')?.getBoundingClientRect();
    return main && footer ? footer.top - main.bottom : null;
  });
  expect(gap).not.toBeNull();
  expect(gap).toBeGreaterThanOrEqual(0);
}

const pages = [
  { link: 'Home', path: '/', heading: 'Simple Image Display' },
  { link: 'Spinning Image', path: '/image-spinning', heading: 'Image Spinning' },
  { link: 'Simple Crop Demo', path: '/image-crop', heading: 'Image Crop' },
  { link: 'Upload Image and Crop', path: '/upload-and-crop', heading: 'Upload and Crop an Image' },
];

for (const { link, path, heading } of pages) {
  test(`navigates to ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text());
    });

    await page.goto('/image-crop');
    await openNav(page);
    const navLink = page.getByRole('navigation').getByRole('link', { name: link, exact: true });
    await navLink.click();

    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await expectNoHorizontalScroll(page);
    await expectFooterClear(page);
    await openNav(page);
    await expect(navLink).toHaveClass(/\bactive\b/);
    expect(errors).toEqual([]);
  });
}

test('footer links navigate', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Cropping' }).click();
  await expect(page).toHaveURL('/image-crop');
});

test('unknown routes show a not-found page', async ({ page }) => {
  await page.goto('/no-such-page');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  await page.getByRole('link', { name: 'home page' }).click();
  await expect(page).toHaveURL('/');
});

test('crops the bundled image and downloads it at full resolution', async ({ page }) => {
  await page.goto('/image-crop');
  const image = page.getByRole('img', { name: 'Cleopatra, to crop' });
  await expect(image).toBeVisible();
  await expect(page.getByTestId('crop-preview')).toBeVisible();

  // The initial selection is 30% of the image wide at 16:9.
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download cropped image' }).click();
  const size = await pngSize(await download);
  expect(size.width).toBeCloseTo(cleopatraSize.width * 0.3, -1);
  expect(size.width / size.height).toBeCloseTo(16 / 9, 1);
  expect((await download).suggestedFilename()).toBe('cropPreview.png');
});

test('uploads an image, draws a new selection, and downloads it', async ({ page }) => {
  await page.goto('/upload-and-crop');
  await expect(page.getByText('Choose an image to start cropping.')).toBeVisible();

  await page.getByLabel('Image file').setInputFiles(cleopatra);
  const image = page.getByRole('img', { name: 'Uploaded image cleopatra.jpg' });
  await expect(image).toBeVisible();
  await expect(page.getByTestId('crop-preview')).toBeVisible();

  const box = await image.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;
  // Draw a selection over the top-left corner, clear of the initial centred one.
  await page.mouse.move(box.x + 10, box.y + 10);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.2, { steps: 8 });
  await page.mouse.up();

  const preview = page.getByTestId('crop-preview');
  const previewBox = await preview.boundingBox();
  expect(previewBox).not.toBeNull();

  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download cropped image' }).click();
  const size = await pngSize(await download);
  // The download holds the selection at the source's resolution, which is at least its on-screen size.
  const scale = cleopatraSize.width / box.width;
  if (previewBox) {
    expect(size.width).toBeCloseTo(previewBox.width * scale, -1);
  }
  expect(size.width / size.height).toBeCloseTo(16 / 9, 1);
  await expectNoHorizontalScroll(page);
});
