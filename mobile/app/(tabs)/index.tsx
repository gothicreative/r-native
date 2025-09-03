import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SignOutButton from '@/component/signOutButton'

const HomeScreen = ()=>{
  
    return (
      <SafeAreaView className='flex-1'>
        <Text> HomeScreens </Text>
        <SignOutButton />
      </SafeAreaView>
    )
  
}
export default HomeScreen