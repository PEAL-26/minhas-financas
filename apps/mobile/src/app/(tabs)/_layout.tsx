import { TabBar } from '@/components/ui/tab-bar';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <View className="relative flex-1" style={{ backgroundColor: '#000', flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ ...rest }) => <TabBar {...rest} />}
      />
    </View>
  );
}
