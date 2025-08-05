import type { FoodItem } from './foodItem'

export interface Meal {
  name: string
  calories: number
  macrosPercent: {
    protein: number
    carbs: number
    fats: number
  }
  foodItems: FoodItem[]
}
