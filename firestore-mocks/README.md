# 🔥 Firestore Mock Importer

Este módulo permite importar datos de ejemplo a Firestore para desarrollo de Trainity.

---

## 📁 Estructura

```
firestore-mocks/
├── firestore_users_demo.json
├── training_plans_demo.json
├── nutrition_plans_demo.json
├── importUsersToFirestore.mjs
├── import-mocks.sh
├── serviceAccount.json (NO subir)
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Cómo usar

1. Añade `serviceAccount.json` en esta carpeta (descargado desde Firebase Console)
2. Asegúrate de tener Node.js (v18–20 recomendado)
3. Instala dependencias:

```bash
npm install
```

4. Ejecuta:

```bash
npm run import:mocks
```

---

## ⚠️ Seguridad

- `serviceAccount.json` no debe subirse
- Está en `.gitignore` por defecto

---

## ℹ️ Qué hace

Importa documentos en la colección `users` usando los datos del JSON.

---

## 🚀 Importar TODO

Para importar usuarios, planes de entrenamiento y planes de nutrición:

```bash
npm run import:all
```
