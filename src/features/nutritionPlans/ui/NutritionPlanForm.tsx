// src/features/nutritionPlans/ui/NutritionPlanForm.tsx
import { useFoodsByCategory } from '@/features/nutritionPlans/domain/useFoodsByCategory'
import MealCard from '@/features/nutritionPlans/ui/components/MealCard'
import { useState, useEffect } from 'react'
import { createNutritionPlan, updateNutritionPlan } from '@/features/nutritionPlans/api/nutritionPlansApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useNutritionPlanById } from '@/features/nutritionPlans/domain/useNutritionPlanById'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function NutritionPlanForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { plan, loading: loadingPlan } = useNutritionPlanById(id)
  const { carbs, proteins, fats, fruits, vegetables, loading } = useFoodsByCategory()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [durationWeeks, setDurationWeeks] = useState(12)
  const [dailyCalories, setDailyCalories] = useState('')
  const [dailyMacros, setDailyMacros] = useState({ protein: '', carbs: '', fats: '' })
  const [cheatMealAllowed, setCheatMealAllowed] = useState(false)

  const [meals, setMeals] = useState<{ id: string; name: string; foods: { foodId: string; quantity: string }[] }[]>([])

  useEffect(() => {
    if (!plan) return
    setName(plan.name || '')
    setDescription(plan.description || '')
    setDurationWeeks(plan.durationWeeks || 12)
    setDailyCalories(plan.dailyCalories?.toString() || '')
    setDailyMacros({
      protein: plan.dailyMacros.protein.toString(),
      carbs: plan.dailyMacros.carbs.toString(),
      fats: plan.dailyMacros.fats.toString(),
    })
    setCheatMealAllowed(plan.cheatMealAllowed || false)
    const mappedMeals = plan.meals.map(meal => ({
      id: crypto.randomUUID(),
      name: meal.name,
      foods: meal.foodItems.map(item => ({
        foodId: item.foodId,
        quantity: item.quantityGrams.toString(),
      })),
    }))
    setMeals(mappedMeals)
  }, [plan])

  const updateMeal = (id: string, updated: { foodId: string; quantity: string }[]) => {
    setMeals(prev => prev.map(m => (m.id === id ? { ...m, foods: updated } : m)))
  }

  const renameMeal = (id: string, name: string) => {
    setMeals(prev => prev.map(m => (m.id === id ? { ...m, name } : m)))
  }

  const removeMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id))
  }

  const addMeal = () => {
    setMeals(prev => [...prev, { id: crypto.randomUUID(), name: 'Nueva comida', foods: [] }])
  }

  const calculateMealCalories = (foods: { foodId: string; quantity: string }[]) => {
    return foods.reduce((total, item) => {
      const all = [...carbs, ...proteins, ...fats, ...fruits, ...vegetables]
      const food = all.find(f => f.id === item.foodId)
      const qty = Number(item.quantity)
      return food ? total + (food.caloriesPer100g * qty) / 100 : total
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formattedMeals = meals.map(meal => ({
      name: meal.name,
      foodItems: meal.foods.map(f => ({ foodId: f.foodId, quantityGrams: Number(f.quantity) || 0 })),
      calories: calculateMealCalories(meal.foods),
      macrosPercent: { protein: 0, carbs: 0, fats: 0 },
    }))
    const planData = {
      name,
      description,
      durationWeeks,
      dailyCalories: Number(dailyCalories),
      dailyMacros: {
        protein: Number(dailyMacros.protein),
        carbs: Number(dailyMacros.carbs),
        fats: Number(dailyMacros.fats),
      },
      cheatMealAllowed,
      meals: formattedMeals,
    }
    if (id) {
      await updateNutritionPlan(id, planData)
    } else {
      await createNutritionPlan(planData)
    }
    navigate('/admin/nutrition-plans')
  }

  if (loading || (id && loadingPlan)) {
    return <div className='text-gray-500 p-6 text-center'>Cargando plan...</div>
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-10'>
      {/* Info básica */}
      <section className='space-y-6'>
        <h2 className='text-lg font-semibold text-gray-900'>📝 Información básica</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label>Nombre del plan</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder='Ej. Plan Ángel - Agosto'
                   required />
          </div>

          <div className='space-y-2'>
            <Label>Duración (semanas)</Label>
            <Input type='number' value={durationWeeks} onChange={e => setDurationWeeks(Number(e.target.value))}
                   required />
          </div>
        </div>

        <div className='space-y-2'>
          <Label>Descripción</Label>
          <Textarea value={description} onChange={e => setDescription(e.target.value)}
                    placeholder='Descripción breve del plan...' />
        </div>

        <div className='flex items-center gap-2 pt-2'>
          <Checkbox checked={cheatMealAllowed} onCheckedChange={value => setCheatMealAllowed(Boolean(value))} />
          <Label>Permitir cheat meal</Label>
        </div>
      </section>

      {/* Macros */}
      <section className='space-y-6'>
        <h2 className='text-lg font-semibold text-gray-900'>📊 Calorías y macros diarios</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='space-y-2'>
            <Label>Calorías</Label>
            <Input type='number' value={dailyCalories} onChange={e => setDailyCalories(e.target.value)} required />
          </div>
          {(['protein', 'carbs', 'fats'] as const).map(macro => (
            <div key={macro} className='space-y-2'>
              <Label>{macro}</Label>
              <Input
                type='number'
                value={dailyMacros[macro]}
                onChange={e => setDailyMacros(prev => ({ ...prev, [macro]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Comidas */}
      <section className='space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-gray-900'>🍽 Comidas del día</h2>
          <Button type='button' variant='default' onClick={addMeal}>
            + Añadir comida
          </Button>
        </div>

        {meals.map(meal => (
          <div key={meal.id} className='space-y-2'>
            <MealCard
              title={meal.name}
              carbs={carbs}
              proteins={proteins}
              fats={fats}
              fruits={meal.name.toLowerCase().includes('comida') || meal.name.toLowerCase().includes('cena') ? vegetables : fruits}
              selected={meal.foods}
              onChange={updated => updateMeal(meal.id, updated)}
              onRename={newName => renameMeal(meal.id, newName)}
              onRemove={() => removeMeal(meal.id)}
            />
            <p className='text-sm text-right text-gray-500'>
              Total estimado: {Math.round(calculateMealCalories(meal.foods))} kcal
            </p>
          </div>
        ))}
      </section>

      {/* Guardar */}
      <div className='flex justify-end'>
        <Button type='submit'>Guardar plan</Button>
      </div>
    </form>
  )
}
