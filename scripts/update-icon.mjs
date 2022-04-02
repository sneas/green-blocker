import 'zx/globals';
import { rootDir, packagesDir } from './helpers/dirs.mjs';

const pngIcon = 'icon.png';
const icoIcon = 'favicon.ico';

cd(rootDir);
await $`convert assets/${pngIcon} -resize 256x256 assets/${icoIcon}`;

for (let size of ['16', '32', '48', '128']) {
  const iconFileName = `icon-${size}x${size}.png`;
  await $`convert assets/${pngIcon} -resize ${size}x${size} packages/extension/assets/images/${iconFileName}`;
}

await $`cp assets/${icoIcon} ${packagesDir}/content-script/public/favicon.ico`;
await $`cp assets/${icoIcon} ${packagesDir}/popup/src/favicon.ico`;
