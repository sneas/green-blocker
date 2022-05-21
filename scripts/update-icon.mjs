import 'zx/globals';
import { rootDir, packagesDir } from './helpers/dirs.mjs';

cd(rootDir);
await $`svgexport assets/icon.svg assets/icon.png`;

for (let size of ['16', '32', '48', '128']) {
  const iconFileName = `icon-${size}x${size}.png`;
  await $`svgexport assets/icon.svg packages/extension/assets/images/${iconFileName} ${size}:${size}`;
}

await $`svgexport assets/icon.svg ${packagesDir}/content-script/public/favicon.ico 128:128`;
await $`svgexport assets/icon.svg ${packagesDir}/popup/src/favicon.ico 128:128`;
await $`cp assets/icon.svg ${packagesDir}/popup/src/assets/icon.svg`;
