import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { NavigationProp } from './home-screen';
import { useCallback, useEffect, useState } from 'react';
import { RootStackParamList } from './home-screen'
import { Bubble, BubbleProps, Composer, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, Send, SendProps } from 'react-native-gifted-chat'
import { useSelectedChatFaceContext } from '@/src/context/ChatFaceContext';
import getGeminiApi from '@/src/services/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';
const LeftArrow = require('../../assets/left-arrow.png');
const MenuIcon = require('../../assets/menu-icon.png');
import DeleteModal from '@/src/components/DeleteModal';
import { Toast } from "toastify-react-native";

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'chat-screen'>;

const CHAT_BOT_FACE = 'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png'
export default function ChatScreen() {
  const { selectedChatFace, setSelectedChatFace } = useSelectedChatFaceContext()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChatScreenRouteProp>()
  const { selectedFace } = route.params || {};

  useEffect(() => {
    if (selectedFace) {
      setSelectedChatFace(selectedFace)
      const savedMessages = localStorage.getItem(`chatMessages-${selectedFace.id}`)
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([
          {
            _id: 1,
            text: `Hello I'm ${selectedFace?.name}, how can i help you?`,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Chatbot',
              avatar: selectedFace.image
            },
          },
        ]);
      }
    }
  }, [selectedFace]);

  useEffect(() => {
    if (selectedFace && messages.length > 0) {
      localStorage.setItem(`chatMessages-${selectedFace.id}`, JSON.stringify(messages));
    }
  }, [messages, selectedFace]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    setLoading(true)
    if (messages[0].text) {
      handleGeminiResponse(messages[0].text)
    }
  }, [])

  const handleGeminiResponse = async (msg: string) => {
    try {
      const resp = await getGeminiApi(msg);

      let model = resp.data.resp?.[1]?.model || "I'm sorry, I couldn't understand that.";
      // If the model is an object, stringify it
      if (typeof model === 'object') {
        model = JSON.stringify(model, null, 2); // Convert object to string for rendering
      }

      const chatApiResp: IMessage[] = [
        {
          _id: Date.now(),
          text: model,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chatbot',
            avatar: selectedFace?.image || CHAT_BOT_FACE,
          },
        },
      ];

      setMessages(previousMessages => GiftedChat.append(previousMessages, chatApiResp));
    } catch (error) {
      console.error('Error fetching Gemini API response:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#671ddf',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            padding: 2,
            margin: 3,
            lineHeight: 20
          },
          left: {
            color: '#671ddf',
            padding: 2,
            margin: 3,
            lineHeight: 20
          }
        }}
        containerStyle={{
          right: {
            maxWidth: '70%', // Adjust as per your requirements
          },
          left: {
            maxWidth: '70%', // Adjust as per your requirements
          },
        }}
      />
    )
  }

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 20, marginBottom: 10 }}>
          <FontAwesome name="paper-plane" size={24} color="white" resizeMode={'center'} />
        </View>
      </Send>
    );
  }

  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          padding: 2,
          backgroundColor: '#671ddf', // Toolbar background color
        }}
        renderComposer={(composerProps: ComposerProps) => {
          return (
            <Composer
              {...composerProps}
              textInputStyle={{
                color: '#fff', // Text color for the input field
                fontSize: 16,   // Font size of the input field
              }}
            />
          );
        }}
      />
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const clearMessages = () => {
    try {
      if (selectedFace) {
        setMessages([]);
        localStorage.removeItem(`chatMessages-${selectedFace.id}`);
      }
      Toast.success('Succesfully deleted all messages.')
    } catch (error) {
      Toast.error('Something went wrong')
    }
  };

  if (!selectedFace) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading chat...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'white', padding: 20 }}>
          <Image source={LeftArrow} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenModal} style={{ backgroundColor: 'white' }}>
          <Image source={MenuIcon} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          key={selectedChatFace?.id}  // Ensure it re-renders when selectedFace changes
          messages={messages}
          isTyping={loading}
          onSend={onSend}
          user={{ _id: 1 }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
        />
      </View>
      {isModalOpen && (
        <DeleteModal
          onDelete={clearMessages}
          onCancel={handleCloseModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  )
}