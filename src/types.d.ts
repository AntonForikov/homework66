export interface Meal {
  description: string
  calories: string
  category: string
  date: Date
}

export interface MealApi {
  [id: string]: Meal
}

export interface MealWithId extends Meal {
  id: string
}