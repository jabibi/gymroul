// Se ejecuta solo antes de «npm run deploy» (script predeploy de package.json): si algo no está en orden, el despliegue no sigue.
// Solo se despliega lo que ya está en GitHub, desde main y sin cambios sin commitear.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Lo que impide desplegar, en frases para el usuario (vacío si todo está en orden).
 * @param {{ branch: string, status: string, local: string, remote: string }} state
 *   rama actual, salida de «git status --porcelain», y el commit de HEAD y el de origin/main
 * @returns {string[]}
 */
export function deployProblems({ branch, status, local, remote }) {
  const problems = [];
  if (branch !== 'main') problems.push(`Estás en «${branch || 'HEAD suelto'}», no en main. Fusiona la PR y cámbiate a main.`);
  if (status.trim()) problems.push('Hay cambios sin commitear o ficheros sin seguimiento.');
  if (local !== remote) problems.push('Tu HEAD no coincide con origin/main (haz git pull o sube tus commits).');
  return problems;
}

const git = (/** @type {string[]} */ ...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    git('fetch', '--quiet', 'origin', 'main'); // compara con el main de GitHub de ahora, no con una copia vieja
    const problems = deployProblems({
      branch: git('branch', '--show-current'),
      status: git('status', '--porcelain'),
      local: git('rev-parse', 'HEAD'),
      remote: git('rev-parse', 'origin/main'),
    });
    if (problems.length) {
      console.error(`No se despliega:\n${problems.map(p => `  - ${p}`).join('\n')}`);
      process.exit(1);
    }
    console.log('✓ main limpia y al día con origin/main: se puede desplegar.');
  } catch (e) {
    console.error(`No se pudo comprobar el estado de git antes de desplegar: ${/** @type {Error} */ (e).message}`);
    process.exit(1);
  }
}
