export interface User {
  username: string,
  avatarUrl: string,
  favoritesAmount?: number
}

export function getUserData() {
  const userData: unknown = JSON.parse(localStorage.getItem('user'));

  if(userData === null){
    throw new Error('Elements in `overrides` cannot be null or undefined')
  }
  if(userData === undefined){
    throw new Error('Elements in `overrides` cannot be null or undefined')
  }
  if(userData instanceof Object){
      return userData;
    }
  
  return userData.toString()
}

export function getFavoritesAmount(){
  const FavoritesAmount: unknown = JSON.parse(localStorage.getItem('favoritesAmount'))
  if(FavoritesAmount === null){
    throw new Error('Elements in `overrides` cannot be null or undefined')
  }
  if(FavoritesAmount === undefined){
    throw new Error('Elements in `overrides` cannot be null or undefined')
  }
  if(FavoritesAmount === Number){
      return FavoritesAmount
  }
  return FavoritesAmount.toString()
}
