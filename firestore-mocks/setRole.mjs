import admin from 'firebase-admin'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar serviceAccount.json sin usar 'assert'
const serviceAccountPath = path.resolve(__dirname, './serviceAccount.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// Leer parámetros de línea de comandos: uid y role
const [, , uid, role] = process.argv

if (!uid || !role) {
  console.error('Usage: node setRole.mjs <uid> <role>')
  process.exit(1)
}

async function setRole(uid, role) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role })
    console.log(`Role '${role}' assigned to UID: ${uid}`)
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

setRole(uid, role)
