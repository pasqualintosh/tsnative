import React from 'react'
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthenticatedStack from './AuthenticatedStack'

export const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
  gestureEnabled: false,
  presentation: 'modal',
}

const Stack = createStackNavigator()

const MainNavigation: React.FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
