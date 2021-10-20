type Routes<T extends string> = Record<T, T>

export type NavigatorRoute = 'TabNavigator'

export const NavigatorRoutes: Routes<NavigatorRoute> = {
  TabNavigator: 'TabNavigator',
}

export type TabRoute = 'Home' | 'Settings'

export const TabLabels: Record<TabRoute, string> = {
  Home: 'Home',
  Settings: 'Settings',
}

export const TabRoutes: Routes<TabRoute> = {
  Home: 'Home',
  Settings: 'Settings',
}
