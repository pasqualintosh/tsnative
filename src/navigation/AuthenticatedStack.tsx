import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { defaultScreenOptions } from './MainNavigation'
import { NavigatorRoutes } from '../@typings/routes'
import TabNavigator from './TabNavigator'

const Stack = createStackNavigator()

const AuthenticatedStack: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={NavigatorRoutes.TabNavigator}
        component={TabNavigator}
      />
    </Stack.Navigator>
  )
}

export default AuthenticatedStack
