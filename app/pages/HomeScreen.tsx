import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ChatFaceData, chatFaceDataType } from '../services/ChatFaceData'

export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState<chatFaceDataType[]>()
  const [selectedChatFace, setSelectedChatFace] = useState<chatFaceDataType | undefined>()

  useEffect(() => {
    setChatFaceData(ChatFaceData)
    setSelectedChatFace(ChatFaceData[0])
  }, [])

  return (
    <View>
      <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, }]}>
        Hello,
      </Text>
      <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, fontWeight: 'bold' }]}>
        I am {selectedChatFace?.name}
      </Text>
      <Text></Text>
    </View>
  )
}