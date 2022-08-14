import { useAppSelector } from './hook'

export function useAuth() {
   const { email, token, id } = useAppSelector(state => state.user.user)
   console.log(email, token, id)
   return {
      isAuth: !!email,
      email,
      token,
      id,
   }
}