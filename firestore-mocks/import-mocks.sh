#!/bin/bash

echo "🚀 Iniciando importación de datos mock a Firestore..."

if [[ ! -f "./serviceAccount.json" ]]; then
  echo "❌ ERROR: Falta 'serviceAccount.json'"
  exit 1
fi

if [[ ! -f "./firestore_users_demo.json" ]]; then
  echo "❌ ERROR: Falta 'firestore_users_demo.json'"
  exit 1
fi

echo "📦 Importando usuarios desde firestore_users_demo.json"
node importUsersToFirestore.mjs
