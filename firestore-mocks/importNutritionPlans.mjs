import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from "./serviceAccount.json" assert { type: "json" }
import data from "./nutrition_plans_demo.json" assert { type: "json" }

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

async function importNutritionPlans() {
  const plans = data.plans_nutrition
  for (const id in plans) {
    await db.collection("plans_nutrition").doc(id).set(plans[id])
    console.log(`✅ Nutrition plan imported: ${id}`)
  }
  console.log("🎉 All nutrition plans imported successfully.")
}

importNutritionPlans().catch(console.error)