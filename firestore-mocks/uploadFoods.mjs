import admin from 'firebase-admin'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serviceAccountPath = path.resolve(__dirname, './serviceAccount.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// Carga el JSON externo
const foodsPath = path.resolve(__dirname, './data/foods.json')
const foods = JSON.parse(readFileSync(foodsPath, 'utf-8'))

async function uploadFoods() {
  for (const food of foods) {
    const { id, ...data } = food
    try {
      await db.collection('foods').doc(id).set(data)
      console.log(`Subido: ${food.name}`)
    } catch (err) {
      console.error(`Error subiendo ${food.name}:`, err)
    }
  }
}

uploadFoods()
  .then(() => {
    console.log('Todos los alimentos subidos.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error en la subida:', err)
    process.exit(1)
  })
