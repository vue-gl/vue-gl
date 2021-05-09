import { Selector } from 'testcafe';
import { readFile } from 'fs';
import { join } from 'path';

function* indexGenerator() {
  for (let i = 0; ; i += 1) yield i;
}

function screenshotPath(t, subDir, index) {
  return join(
    `${t.browser.name}_${t.browser.version}_${t.browser.os.name}_${t.browser.os.version}`,
    subDir,
    `${index}.png`,
  );
}

export function screenshotPathFactory(subDir) {
  const index = indexGenerator();
  return (t) => screenshotPath(t, subDir, index.next().value);
}

export async function getElementScreenshotBuffer(t, selector, ...options) {
  let path = t.fixtureCtx.screenshotPath ? t.fixtureCtx.screenshotPath(t) : null;
  let opts = options;
  if (options.length && typeof options[0] === 'string') [path, ...opts] = options;
  await t.takeElementScreenshot(selector, path, ...opts);
  return new Promise((resolve, reject) => {
    readFile(join('screenshots', path), (err, data) => {
      if (err) reject(err); else resolve(data);
    });
  });
}

export async function clear(t) {
  await t.navigateTo('about:blank');
}

export async function createMountPoint(t) {
  await t.eval(() => { document.body.appendChild(document.createElement('div')); });
  return Selector('body > div').nth(-1);
}
