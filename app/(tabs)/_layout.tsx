import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {HomeIcon, Telescope, Clock, CircleUser} from 'lucide-react-native'
export default function TabLayout() {
  return (
<Tabs>
    <Tabs.Screen name ="Home" options={{tabBarIcon: ({color,size}) => <HomeIcon size={size} color={color} />}}/>
     <Tabs.Screen name="Explore" options={{tabBarIcon: ({color,size}) => <Telescope size={size} color={color} />}}/>
      <Tabs.Screen name="History" options={{tabBarIcon: ({color,size}) => <Clock size={size} color={color} />}}/>
       <Tabs.Screen name="Profile" options={{tabBarIcon: ({color,size}) => <CircleUser size={size} color={color} />}}/>
</Tabs>
  )
}