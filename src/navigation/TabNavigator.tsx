import React from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { TabLabels, TabRoute, TabRoutes } from '../@typings/routes'
import { Pressable, View, StyleSheet, Text as NativeText } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Icon from 'react-native-vector-icons/AntDesign'

type TabButtonConfig = {
  label: string
  iconName: string
  focusName?: string
}

type Tab = {
  name: TabRoute
  component: React.FC
}

type TabBarProps = BottomTabBarProps & { tabs: Tab[] }

interface TabIconProps {
  isFocused: boolean
  iconName: string
}

const determineConfig = (tab: Tab): TabButtonConfig => {
  switch (tab.name) {
    case TabLabels.Home: {
      return {
        label: TabLabels.Home,
        iconName: 'home',
        focusName: 'home',
      }
    }

    case TabLabels.Settings: {
      return {
        label: TabLabels.Settings,
        iconName: 'setting',
        focusName: 'setting',
      }
    }

    default:
      return {
        label: TabLabels.Home,
        iconName: 'home',
        focusName: 'home',
      }
  }
}

const TabNavigator: React.FC = (): JSX.Element => {
  const homeTab = {
    name: TabRoutes.Home,
    component: Home,
  }

  const settingsTab = {
    name: TabRoutes.Settings,
    component: Settings,
  }
  const tabs = [homeTab, settingsTab]

  const TabNavigator = createBottomTabNavigator()
  return (
    <TabNavigator.Navigator
      tabBar={(props): React.ReactNode => <TabBar {...props} tabs={tabs} />}
    >
      {tabs.map(({ name, component }) => {
        return (
          <TabNavigator.Screen name={name} component={component} key={name} />
        )
      })}
    </TabNavigator.Navigator>
  )
}

const TabBar: React.FC<TabBarProps> = ({
  state,
  navigation: tabNavigation,
  tabs,
}): JSX.Element => {
  const stackNavigation =
    useNavigation<StackNavigationProp<{ undefined: undefined }>>()

  const toTabButton = (tab: Tab, index: number): React.ReactNode => {
    const focusedRouteName = state.routeNames[state.index]

    const isTabFocused = (tab: Tab): boolean => {
      return tab.name === focusedRouteName
    }

    const currentRoute = state.routes.find(
      (route) => route.name === focusedRouteName,
    )

    const indexInCurrentRoute = currentRoute?.state?.index

    const isOnRootOfCurrentRoute =
      indexInCurrentRoute === 0 || indexInCurrentRoute === undefined

    const isFocused = isTabFocused(tab)

    const handleOnPress = (): void => {
      if (!isFocused) {
        tabNavigation.navigate(tab.name)
      } else if (!isOnRootOfCurrentRoute) {
        stackNavigation.popToTop()
      }
    }

    const { label, iconName, focusName } = determineConfig(tab)

    return (
      <Pressable
        onPress={handleOnPress}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        key={index}
        testID={`${label}Tab`}
      >
        <TabIcon isFocused={isFocused} iconName={iconName} />
        <NativeText
          style={{
            color: isFocused ? '#a22' : '#222',
          }}
        >
          {label}
        </NativeText>
      </Pressable>
    )
  }

  return <View style={style.tabBarContainer}>{tabs.map(toTabButton)}</View>
}

const TabIcon: React.FC<TabIconProps> = ({
  isFocused,
  iconName,
}): JSX.Element => {
  const iconSize = 30

  return (
    <View style={style.tabIconContainer}>
      <Icon
        name={iconName}
        color={isFocused ? '#a22' : '#222'}
        size={iconSize}
      />
    </View>
  )
}

const style = StyleSheet.create({
  tabBarContainer: {
    minHeight: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabIconContainer: {
    alignSelf: 'center',
  },
})

export default TabNavigator
