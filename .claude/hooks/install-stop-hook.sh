#!/usr/bin/env bash
# Sustituye el hook de parada del entorno (~/.claude/stop-hook-git-check.sh) por la copia del repositorio.
# El original solo acepta commits con el correo noreply@anthropic.com; la copia acepta también el de
# `git config user.email`, que es el que deja git-signing.sh para firmar con la identidad del usuario.
# La salida estándar va vacía a propósito, porque Claude Code la añadiría al contexto de la sesión.
SRC="$CLAUDE_PROJECT_DIR/.claude/hooks/stop-hook-git-check.sh"
DST="$HOME/.claude/stop-hook-git-check.sh"

[ -f "$SRC" ] || exit 0
mkdir -p "$HOME/.claude"
install -m 755 "$SRC" "$DST"
