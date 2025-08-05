import { db } from '@/lib/firebase'
import { collection, addDoc, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { NutritionPlan } from '../domain/interfaces/models'

const nutritionPlansRef = collection(db, 'nutritionPlans')

export async function fetchNutritionPlanById(id: string) {
  const docRef = doc(db, 'nutritionPlans', id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as NutritionPlan
}

export async function createNutritionPlan(data: Omit<NutritionPlan, 'id'>) {
  const docRef = await addDoc(nutritionPlansRef, data)
  return docRef.id
}

export async function updateNutritionPlan(id: string, data: Omit<NutritionPlan, 'id'>) {
  await setDoc(doc(db, 'nutritionPlans', id), data)
}

export async function deleteNutritionPlan(id: string) {
  await deleteDoc(doc(db, 'nutritionPlans', id))
}
