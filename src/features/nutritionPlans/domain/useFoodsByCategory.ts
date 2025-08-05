import { useFoods } from './useFoods'
import { Food } from '@/features/nutritionPlans/domain/interfaces/food'

export function useFoodsByCategory() {
  const { foods, loading, error } = useFoods()

  const filterBy = (category: Food['category']) =>
    foods.filter(food => food.category === category)

  return {
    carbs: filterBy('carbs'),
    proteins: filterBy('protein'),
    fats: filterBy('fats'),
    fruits: filterBy('fruit'),
    vegetables: filterBy('vegetables'),
    others: filterBy('others'),
    loading,
    error,
  }
}
