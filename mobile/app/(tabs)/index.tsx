import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUserSync } from '@/hooks/useUserSync'
import SignOutButton from '@/component/signOutButton'




const HomeScreen = ()=>{

  useUserSync();

    return (

      <SafeAreaView className='flex-1'>
        <View>
        <Text>HomeScreens</Text>
        </View>
        <SignOutButton />
      </SafeAreaView>

    )
  
}
export default HomeScreen