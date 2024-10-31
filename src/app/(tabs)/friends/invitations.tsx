import { useState } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { TabView, SceneMap, TabBar, TabBarProps } from 'react-native-tab-view'

import AddFriendButton from '@/src/components/AddFriendButton'
import SentInvitationComponent from '@/src/components/SentRequestComponent'
import PedingRequestComponent from '@/src/components/PendingRequestComponent'

import { styles } from './styles'
import { theme } from '@/src/theme'
import { verticalScale } from '@/src/utils/responsiveUtils'

import { friends } from '@/src/mock/friends'
// const friends = []

type Route = {
  key: string
  title: string
}

const renderScene = SceneMap({
  enviados: () => <SentInvitationComponent list={friends} />,
  pendentes: () => <PedingRequestComponent list={friends} />,
})

export default function Invitations() {
  const { initialIndex } = useLocalSearchParams()
  const [index, setIndex] = useState<number>(Number(initialIndex) || 0)

  const [routes] = useState<Route[]>([
    { key: 'enviados', title: 'Enviados' },
    { key: 'pendentes', title: 'Pendentes' },
  ])

  const layout = useWindowDimensions()

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
