// src/features/nutritionPlans/ui/components/MealCard.tsx
import { useState } from 'react'
import { Food } from '@/features/nutritionPlans/domain/interfaces/food'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface MacroBlockProps {
  title: string
  items: Food[]
  onAdd: (foodId: string) => void
}

function MacroBlock({ title, items, onAdd }: MacroBlockProps) {
  const [selectedId, setSelectedId] = useState('')

  return (
    <div className='space-y-2'>
      <Label className='text-sm text-gray-700'>{title}</Label>
      <div className='flex gap-2'>
        <Select value={selectedId} onValueChange={value => setSelectedId(value)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Selecciona alimento' />
          </SelectTrigger>
          <SelectContent>
            {items.map(food => (
              <SelectItem key={food.id} value={food.id}>
                {food.name} ({food.caloriesPer100g} kcal)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type='button'
          variant='secondary'
          onClick={() => {
            if (selectedId) {
              onAdd(selectedId)
              setSelectedId('')
            }
          }}
        >
          Añadir
        </Button>
      </div>
    </div>
  )
}

interface MealCardProps {
  title: string
  carbs: Food[]
  proteins: Food[]
  fats: Food[]
  fruits?: Food[]
  selected: { foodId: string; quantity: number }[]
  onChange: (items: { foodId: string; quantity: number }[]) => void
  onRename?: (newTitle: string) => void
  onRemove?: () => void
}

export default function MealCard({
                                   title,
                                   carbs,
                                   proteins,
                                   fats,
                                   fruits = [],
                                   selected,
                                   onChange,
                                   onRename,
                                   onRemove,
                                 }: MealCardProps) {
  const allFoods = [...carbs, ...proteins, ...fats, ...fruits]

  const handleAdd = (foodId: string) => {
    if (!selected.find(item => item.foodId === foodId)) {
      onChange([...selected, { foodId, quantity: 0 }])
    }
  }

  const handleUpdate = (index: number, quantity: number) => {
    const updated = [...selected]
    updated[index].quantity = quantity
    onChange(updated)
  }

  const handleRemove = (index: number) => {
    const updated = [...selected]
    updated.splice(index, 1)
    onChange(updated)
  }

  return (
    <div className='p-5 bg-white border border-gray-200 rounded-xl shadow-sm space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        {onRename ? (
          <Input
            value={title}
            onChange={e => onRename(e.target.value)}
            className='text-base font-semibold'
          />
        ) : (
          <h3 className='text-base font-semibold text-gray-900'>{title}</h3>
        )}
        {onRemove && (
          <Button type='button' variant='ghost' size='sm' className='text-red-600' onClick={onRemove}>
            ✕ Eliminar
          </Button>
        )}
      </div>

      {/* Macro categories */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <MacroBlock title='Hidratos' items={carbs} onAdd={handleAdd} />
        <MacroBlock title='Proteínas' items={proteins} onAdd={handleAdd} />
        <MacroBlock title='Grasas' items={fats} onAdd={handleAdd} />
        {fruits.length > 0 && (
          <MacroBlock title='Frutas / Verduras' items={fruits} onAdd={handleAdd} />
        )}
      </div>

      {/* Selected foods */}
      {selected.length > 0 && (
        <div className='space-y-3'>
          <Label className='text-sm text-gray-700'>🧾 Alimentos seleccionados</Label>
          <ul className='space-y-2'>
            {selected.map((item, index) => {
              const food = allFoods.find(f => f.id === item.foodId)
              return (
                <li key={item.foodId} className='flex items-center gap-2'>
                  <span className='text-sm text-gray-800 flex-1'>{food?.name || 'Desconocido'}</span>
                  <Input
                    type='number'
                    min={0}
                    value={item.quantity}
                    onChange={e => handleUpdate(index, Number(e.target.value))}
                    className='w-24'
                  />
                  <span className='text-sm text-gray-500'>g</span>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='text-red-600'
                    onClick={() => handleRemove(index)}
                  >
                    ✕
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
