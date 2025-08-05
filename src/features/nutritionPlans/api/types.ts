export interface NutritionPlanDTO {
  name: string
  description?: string
  durationWeeks: number
  dailyCalories: number
  dailyMacros: {
    protein: number
    carbs: number
    fats: number
  }
  cheatMealAllowed: boolean
  meals: MealDTO[]
}

export interface MealDTO {
  name: string
  calories: number
  macrosPercent: {
    protein: number
    carbs: number
    fats: number
  }
  foodItems: FoodItemDTO[]
}

export interface FoodItemDTO {
  foodId: string
  quantityGrams: number
  notes?: string
}
