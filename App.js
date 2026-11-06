import { StyleSheet, View } from 'react-native';
import Permisos from './src/components/Permisos';

export default function App() {
  return (
    <View style={styles.container}>
      <Permisos></Permisos>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
