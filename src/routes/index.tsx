import { NavigationContainer } from '@react-navigation/native'
import Routes from '../routes/routes'

export default function index() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}