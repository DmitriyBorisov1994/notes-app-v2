import { useAppSelector } from './hook'

export function useAuth() {
   const { email, token, userId } = useAppSelector(state => state.user.user)
   return {
      isAuth: !!email,
      email,
      token,
      userId,
   }
}