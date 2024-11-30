import Routes from '../routes/routes'
import { SelectedChatFaceProvider } from '../context/ChatFaceContext';

export default function Index() {
  return (
    <SelectedChatFaceProvider>
      <Routes />
    </SelectedChatFaceProvider>
  );
}
