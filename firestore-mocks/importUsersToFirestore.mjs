import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from "./serviceAccount.json" assert { type: "json" }
import data from "./firestore_users_demo.json" assert { type: "json" }

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

async function importUsers() {
  const users = data.users
  for (const id in users) {
    await db.collection("users").doc(id).set(users[id])
    console.log(`✅ Imported: ${id}`)
  }
  console.log("🎉 All users imported successfully.")
}

importUsers().catch(console.error)