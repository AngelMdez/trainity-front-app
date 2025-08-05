export interface Food {
  id: string
  name: string
  category: 'carbs' | 'protein' | 'fats' | 'fruit' | 'vegetables' | 'others'
  caloriesPer100g: number
  proteinPer100g: number
  carbsPer100g: number
  fatsPer100g: number
  notes?: string
}
