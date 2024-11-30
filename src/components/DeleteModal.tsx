import { Text, View, Pressable, GestureResponderEvent, TouchableOpacity } from 'react-native';

type DeleteModalProps = {
  onDelete: () => void
  onCancel: () => void
  setIsModalOpen: (param: boolean) => void
}

const DeleteModal = ({ onDelete, onCancel, setIsModalOpen }: DeleteModalProps) => {

  const handleOverlayClick = () => {
    setIsModalOpen!(false)
  };

  const handleModalClick = (e: GestureResponderEvent) => {
    e.stopPropagation();
  };

  const handleDeleteModal = () => {
    setIsModalOpen!(false)
    onDelete?.();
  }

  return (
    <Pressable onPress={handleOverlayClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        paddingHorizontal: 40, // Converts `px: 2.5` to padding shorthand in CSS
      }}>
      <Pressable onPress={handleModalClick}
        style={{
          backgroundColor: 'white',
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 4.65,
          elevation: 3,
          maxWidth: 300,
        }}>
        <Text style={{ color: "black" }}>
          Are you sure you want to delete all chat messages?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 40, marginTop: 20, flex: 1 }}>
          <TouchableOpacity style={{ backgroundColor: '#671ddf' }}
            onPress={handleDeleteModal}>
            <Text style={{ color: 'white', width: 60, textAlign: 'center', paddingVertical: 4 }}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#671ddf' }}
            onPress={onCancel}>
            <Text style={{ color: 'white', width: 60, textAlign: 'center', paddingVertical: 4 }}
            >No
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  )
}

export default DeleteModal