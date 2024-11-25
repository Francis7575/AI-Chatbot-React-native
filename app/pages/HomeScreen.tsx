import { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { ChatFaceData, chatFaceDataType } from '../services/ChatFaceData'

export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState<chatFaceDataType[]>()
  const [selectedChatFace, setSelectedChatFace] = useState<chatFaceDataType | undefined>()

  useEffect(() => {
    setChatFaceData(ChatFaceData)
    setSelectedChatFace(ChatFaceData[0])
  }, [])

  const handleChatFacePress = (id: number) => {
    setSelectedChatFace(ChatFaceData[id - 1]) // added id - 1 to show the exact item selected since the item selected is not being display it needs -1 to work properly
  }

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
          renderItem={({ item }: { item: chatFaceDataType }) => (
            <TouchableOpacity style={{ margin: 15 }} onPress={() => handleChatFacePress(item.id)}>
              <Image source={{ uri: item.image }} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          )}
        />
        <Text style={{ marginTop: 5, fontSize: 17, color: '#B0B0B0' }}>Choose Your Fav ChatBuddy</Text>
      </View>

      <TouchableOpacity style={[{ backgroundColor: selectedChatFace?.primary }, {
        marginTop: 40, padding: 17, width: Dimensions.get('screen').width * 0.6,
        borderRadius: 100, alignItems: 'center'
      }]}
      >
        <Text style={{ fontSize: 16, color: '#fff' }}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  )
}