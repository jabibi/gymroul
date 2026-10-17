#!/usr/bin/env bash
# Parchea el hook de parada del entorno (~/.claude/stop-hook-git-check.sh) para que acepte también como
# correo válido el de `git config user.email`, que es el que deja git-signing.sh para firmar con la
# identidad del usuario. El original solo acepta noreply@anthropic.com y avisa de commits «sin verificar»
# aunque estén firmados.
# Se cambia solo esa línea en lugar de sustituir el fichero, para no pisar futuras actualizaciones del
# original. Es idempotente, y si la línea ya no existe (el original cambió) no toca nada.
# La salida estándar va vacía a propósito, porque Claude Code la añadiría al contexto de la sesión.
HOOK="$HOME/.claude/stop-hook-git-check.sh"
ANTES='if [[ "$ce" != "noreply@anthropic.com" ]] ||'
DESPUES='if [[ "$ce" != "noreply@anthropic.com" \&\& "$ce" != "$(git config user.email 2>/dev/null)" ]] ||'

[ -f "$HOOK" ] || exit 0
grep -qF 'git config user.email 2>/dev/null)" ]]' "$HOOK" && exit 0
grep -qF "$ANTES" "$HOOK" || exit 0
ANTES_RE=$(printf '%s' "$ANTES" | sed 's/[][\.*^$]/\\&/g')
sed -i "s#$ANTES_RE#$DESPUES#" "$HOOK"
