#!/usr/bin/env bash
# Firma de commits en las sesiones en la nube.
# Lee GIT_SIGNING_KEY (clave privada ed25519 en base64), GIT_USER_NAME y GIT_USER_EMAIL de las variables
# del entorno de Claude Code (el script de preparación del entorno no las recibe). Nunca imprime secretos:
# el informe de /tmp/signing-diag.txt solo lleva longitudes y estados. La salida estándar va vacía a propósito,
# porque Claude Code la añadiría al contexto de la sesión.
DIAG=/tmp/signing-diag.txt
KEY="$HOME/.ssh/gymroulette_signing"

{
  echo "hook de firma: $(date -u +%FT%TZ) usuario=$(id -un) HOME=$HOME"
  echo "GIT_SIGNING_KEY: ${#GIT_SIGNING_KEY} caracteres"
  echo "GIT_USER_NAME definida: $([ -n "$GIT_USER_NAME" ] && echo si || echo no)"
  echo "GIT_USER_EMAIL definida: $([ -n "$GIT_USER_EMAIL" ] && echo si || echo no)"
} > "$DIAG"
chmod 644 "$DIAG"

if [ -z "$GIT_SIGNING_KEY" ] || [ -z "$GIT_USER_NAME" ] || [ -z "$GIT_USER_EMAIL" ]; then
  echo "faltan variables: los commits saldrán sin firmar" >> "$DIAG"
  exit 0
fi

if ! command -v ssh-keygen >/dev/null 2>&1; then
  { apt-get update -qq && apt-get install -y -qq openssh-client; } >/dev/null 2>&1 || echo "no se pudo instalar openssh-client" >> "$DIAG"
fi

umask 077
mkdir -p "$HOME/.ssh"
printf '%s' "$GIT_SIGNING_KEY" | base64 -d 2>/dev/null | tr -d '\r' > "$KEY"
[ -n "$(tail -c1 "$KEY")" ] && echo >> "$KEY"
chmod 600 "$KEY"
echo "clave decodificada: $(wc -c < "$KEY") bytes; primera linea: $(head -1 "$KEY")" >> "$DIAG"

if ssh-keygen -y -f "$KEY" > "$KEY.pub" 2>> "$DIAG"; then
  git config --global user.name "$GIT_USER_NAME"
  git config --global user.email "$GIT_USER_EMAIL"
  git config --global gpg.format ssh
  git config --global gpg.ssh.program ssh-keygen
  git config --global user.signingkey "$KEY.pub"
  git config --global commit.gpgsign true
  echo "firma activada con $(cut -d' ' -f1,2 "$KEY.pub" | cut -c1-40)..." >> "$DIAG"
else
  echo "clave NO valida: los commits saldrán sin firmar" >> "$DIAG"
fi
exit 0
