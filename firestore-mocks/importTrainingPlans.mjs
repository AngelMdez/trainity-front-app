import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from "./serviceAccount.json" assert { type: "json" }
import data from "./training_plans_demo.json" assert { type: "json" }

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

async function importTrainingPlans() {
  const plans = data.plans_training
  for (const id in plans) {
    await db.collection("plans_training").doc(id).set(plans[id])
    console.log(`✅ Training plan imported: ${id}`)
  }
  console.log("🎉 All training plans imported successfully.")
}

importTrainingPlans().catch(console.error)