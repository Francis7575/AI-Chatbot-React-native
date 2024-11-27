import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationProp } from './home-screen';
import { useCallback, useEffect, useState } from 'react';
import { RootStackParamList } from './home-screen'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'chat-screen'>;

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChatScreenRouteProp>()
  const { selectedFace } = route.params || {};

  useEffect(() => {
    if (selectedFace) {
      setMessages([
        {
          _id: 1,
          text: `Hello ${selectedFace?.name}`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ]);
    }
  }, [selectedFace]); 

  useEffect(() => {
    if (!selectedFace) {
      console.log("selectedFace is not yet set", selectedFace);
    }
  }, [selectedFace]);

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
      <Text>Hello world</Text>
      <View style={{ width: '100%', flex: 1, backgroundColor: '#fff' }}>

        <GiftedChat
          key={selectedFace?.id}  // Ensure it re-renders when selectedFace changes
          messages={messages}
          onSend={onSend}
          user={{ _id: 1 }}
        />
      </View>
    </>
  )
}