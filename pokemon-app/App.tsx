import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  KeyboardAvoidingView, 
  ScrollView,           
  Platform,
  Pressable,
  Alert              
} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  const handleSend = () => {
    if (mensaje.trim().length > 0) {
      const nuevoMensaje = {
        id: Date.now(),
        texto: mensaje.trim(),
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        esMio: true,
      };
      
      setMensajes(prevMensajes => [...prevMensajes, nuevoMensaje]);
      setMensaje('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.containerMessage}>
          {mensajes.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                styles.messageBubble, 
                msg.esMio ? styles.myMessage : styles.otherMessage
              ]}
            >
              <Text style={styles.messageText}>{msg.texto}</Text>
              <Text style={styles.messageTime}>{msg.hora}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.inputStyle}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="lightgray"
            value={mensaje}
            onChangeText={setMensaje}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Pressable 
            style={styles.sendButton}
            onPress={handleSend}
            disabled={mensaje.trim().length === 0}
          >
            <Text style={styles.textStyle}>Enviar</Text>
          </Pressable>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black',
    paddingTop: 100
  },
  
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },

  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  containerMessage: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    minHeight: 300,
    width: '100%',
  }, 

  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
    flexDirection: 'column',
  },
  
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    marginRight: 10,
  },
  
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333', 
    marginLeft: 10,
  },
  
  messageText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 3,
  },
  
  messageTime: {
    color: '#D1D1D1',
    fontSize: 10,
    alignSelf: 'flex-end',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    // paddingTop: 5,
  },

  inputStyle: {
    flex: 1,
    backgroundColor: '#444444',
    color: 'white',
    minHeight: 40,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 8,
  },
  
  sendButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    minHeight: 40,
  }
});