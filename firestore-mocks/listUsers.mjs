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

// Parámetro opcional para filtrar por rol
const [, , filterRole] = process.argv

async function listUsers(nextPageToken) {
  const result = await admin.auth().listUsers(1000, nextPageToken)
  result.users.forEach(userRecord => {
    const role = userRecord.customClaims?.role ?? 'no role'
    if (!filterRole || role === filterRole) {
      console.log(`UID: ${userRecord.uid} | Email: ${userRecord.email} | Role: ${role}`)
    }
  })

  if (result.pageToken) {
    await listUsers(result.pageToken)
  }
}

listUsers().catch(error => {
  console.error('Error listing users:', error)
  process.exit(1)
})
