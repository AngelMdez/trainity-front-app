import { useState } from 'react'
import { NutritionPlan } from '@/features/nutritionPlans/domain/interfaces/models'
import { Meal } from '@/features/nutritionPlans/domain/interfaces/meal'

export function useNutritionPlanForm(initialPlan?: NutritionPlan) {
  const [name, setName] = useState(initialPlan?.name || '')
  const [description, setDescription] = useState(initialPlan?.description || '')
  const [durationWeeks, setDurationWeeks] = useState(initialPlan?.durationWeeks || 12)
  const [dailyCalories, setDailyCalories] = useState(initialPlan?.dailyCalories || 0)
  const [dailyMacros, setDailyMacros] = useState<NutritionPlan['dailyMacros']>(initialPlan?.dailyMacros || {
    protein: 0,
    carbs: 0,
    fats: 0,
  })
  const [cheatMealAllowed, setCheatMealAllowed] = useState(initialPlan?.cheatMealAllowed || false)
  const [meals, setMeals] = useState<Meal[]>(initialPlan?.meals || [])

  // Funciones para añadir/quitar comidas y alimentos
  const addMeal = () => {
    setMeals([...meals, { name: '', calories: 0, macrosPercent: { protein: 0, carbs: 0, fats: 0 }, foodItems: [] }])
  }

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index))
  }

  const updateMeal = (index: number, updatedMeal: Meal) => {
    const newMeals = [...meals]
    newMeals[index] = updatedMeal
    setMeals(newMeals)
  }

  return {
    name,
    setName,
    description,
    setDescription,
    durationWeeks,
    setDurationWeeks,
    dailyCalories,
    setDailyCalories,
    dailyMacros,
    setDailyMacros,
    cheatMealAllowed,
    setCheatMealAllowed,
    meals,
    setMeals,
    addMeal,
    removeMeal,
    updateMeal,
  }
}
