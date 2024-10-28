import { useState } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { TabView, SceneMap, TabBar, TabBarProps } from 'react-native-tab-view'

import AddFriendButton from '@/src/components/AddFriendButton'

import { styles } from './styles'
import { theme } from '@/src/theme'
import { verticalScale } from '@/src/utils/responsiveUtils'

type Route = {
  key: string
  title: string
}

const SentRequestSection = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Enviados</Text>
  </View>
)

const PendingRequestSection = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Pendentes</Text>
  </View>
)

const renderScene = SceneMap({
  enviados: SentRequestSection,
  pendentes: PendingRequestSection,
})

const RenderTabBar = (props: TabBarProps<Route>) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: theme.colors.primaryColor }}
    style={{ backgroundColor: theme.colors.white }}
    renderLabel={({ route, focused }: { route: Route; focused: boolean }) => (
      <Text style={[styles.text, focused && styles.tabLabelActive]}>
        {route.title}
      </Text>
    )}
  />
)

export default function Invitations() {
  const { initialIndex } = useLocalSearchParams()
  const [index, setIndex] = useState<number>(Number(initialIndex) || 0)

  const [routes] = useState<Route[]>([
    { key: 'enviados', title: 'Enviados' },
    { key: 'pendentes', title: 'Pendentes' },
  ])

  const layout = useWindowDimensions()

  return (
    <View style={styles.container}>
      <AddFriendButton />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={RenderTabBar}
        style={{ marginTop: verticalScale(24) }}
      />
    </View>
  )
}
