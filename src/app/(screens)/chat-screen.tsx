import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationProp } from './home-screen';
import { useCallback, useEffect, useState } from 'react';
import { RootStackParamList } from './home-screen'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { useSelectedChatFaceContext } from '@/src/context/ChatFaceContext';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'chat-screen'>;

export default function ChatScreen() {
  const {selectedChatFace, setSelectedChatFace} = useSelectedChatFaceContext()
  const [messages, setMessages] = useState<IMessage[]>([])
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChatScreenRouteProp>()
  const { selectedFace } = route.params || {};

  useEffect(() => {
    if (selectedFace) {
      setSelectedChatFace(selectedFace)
      setMessages([
        {
          _id: 1,
          text: `Hello ${selectedFace?.name}`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: selectedFace.image
          },
        },
      ]);
    }
  }, [selectedFace]);

  useEffect(() => {
    console.log('Route Params:', JSON.stringify(route.params, null, 2)); // Pretty-print the object
  }, [route.params]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  if (!selectedFace) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading chat...</Text>
      </View>
    );
  }

  return (
    <>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back to Home</Text>
      </TouchableOpacity> */}
      <View style={{ width: '100%', flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          key={selectedChatFace?.id}  // Ensure it re-renders when selectedFace changes
          messages={messages}
          onSend={onSend}
          user={{ _id: 1 }}
        />
      </View>
    </>
  )
}