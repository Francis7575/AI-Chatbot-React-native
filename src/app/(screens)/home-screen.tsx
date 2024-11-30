import { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import ChatFaceData from '../../services/ChatFaceData'
import { chatFaceDataType } from '@/src/types/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useSelectedChatFaceContext } from '@/src/context/ChatFaceContext'


export type RootStackParamList = {
  'chat-screen': { selectedFace: chatFaceDataType | null }
  'home-screen': undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home-screen'>;

export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState<chatFaceDataType[]>()
  const {selectedChatFace, setSelectedChatFace} = useSelectedChatFaceContext()
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    if (ChatFaceData.length > 0) {
      setSelectedChatFace(ChatFaceData[0]);  // Ensure selectedChatFace is set properly
    }
  }, []);
  
  const handleChatFacePress = (id: number) => {
    setSelectedChatFace(ChatFaceData[id - 1]) // added id - 1 to show the exact item selected since the item selected is not being display it needs -1 to work properly
  }

  useEffect(() => {
    console.log('Available Routes:', navigation.getState());
  }, []);

  return (
    <View style={{ alignItems: 'center', paddingTop: 90 }}>
      <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, }]}>
        Hello,
      </Text>
      <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, fontWeight: 'bold' }]}>
        I am {selectedChatFace?.name}
      </Text>
      <Image source={{ uri: selectedChatFace?.image }} style={{ height: 150, width: 150, marginTop: 20 }} />
      <Text style={{ marginTop: 30, fontSize: 25 }}>How Can I help you?</Text>

      <View style={{
        marginTop: 20, backgroundColor: '#F5F5F5', alignItems: 'center',
        height: 110, padding: 10, borderRadius: 10
      }}
      >
        <FlatList
          data={chatFaceData?.filter((item) => selectedChatFace?.id !== item.id)}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: chatFaceDataType }) => (
            <TouchableOpacity style={{ margin: 15 }} onPress={() => handleChatFacePress(item.id)}>
              <Image source={{ uri: item.image }} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          )}
        />
        <Text style={{ marginTop: 5, fontSize: 17, color: '#B0B0B0' }}>Choose Your Fav ChatBuddy</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('chat-screen', {selectedFace: selectedChatFace})}
        style={[{ backgroundColor: selectedChatFace?.primary }, {
          marginTop: 40, padding: 17, width: '60%',
          borderRadius: 100, justifyContent: 'center', display: 'flex'
        }]}
      >
        <Text style={{ fontSize: 16, color: '#fff', textAlign: 'center' }}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  )
}