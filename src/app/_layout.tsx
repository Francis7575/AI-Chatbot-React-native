import { SelectedChatFaceProvider } from '../context/ChatFaceContext';
import Routes from '../routes/routes'
import ToastManager from "toastify-react-native";
export default function _layout() {
  return (
    <SelectedChatFaceProvider>
      <ToastManager position='top' width={300} height={100} textStyle={{ fontSize: 14 }} />
      <Routes />
    </SelectedChatFaceProvider>
  )
}