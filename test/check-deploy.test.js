import { describe, it, expect } from 'vitest';
import { deployProblems } from '../scripts/check-deploy.mjs';

const ok = { branch: 'main', status: '', local: 'abc', remote: 'abc' };

describe('comprobación antes de desplegar', () => {
  it('deja desplegar desde main, limpia y al día con origin/main', () => {
    expect(deployProblems(ok)).toEqual([]);
  });

  it('no deja desplegar desde otra rama', () => {
    expect(deployProblems({ ...ok, branch: 'roadmap-18' })).toHaveLength(1);
    expect(deployProblems({ ...ok, branch: '' })).toHaveLength(1);
  });

  it('no deja desplegar con cambios sin commitear', () => {
    expect(deployProblems({ ...ok, status: ' M src/ui.js\n' })).toHaveLength(1);
  });

  it('no deja desplegar si main no coincide con origin/main', () => {
    expect(deployProblems({ ...ok, remote: 'def' })).toHaveLength(1);
  });

  it('avisa de todo lo que falla a la vez', () => {
    expect(deployProblems({ branch: 'x', status: '?? a', local: '1', remote: '2' })).toHaveLength(3);
  });
});
