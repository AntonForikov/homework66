export interface Meal {
  description: string
  calories: string
  category: string
  date: string
}

export interface MealApi {
  [id: string]: Meal
}

export interface MealWithId extends Meal {
  id: string
}