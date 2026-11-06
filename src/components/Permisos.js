//Ejemplo 3: Diferencia entre CONSULTAR (get) y SOLICITAR (request)
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';

export default function Permisos() {
    const [respuesta, setRespuesta] = useState(null); //devuelve el permiso
    const [origen, setOrigen] = useState(''); //acción que produjo ese resultado

    //get: Solo lee el estado. Nunca abre un cuadro de diálogo.
    //async porque la consulta tarda un tiempo
    const consultar = async () => {
        //await espera la respuesta
        //getCameraPermissionsAsync() obtiene el permiso de usar la cámara
        const resultado = await Camera.getCameraPermissionsAsync();
        setRespuesta(resultado); //guarda el resultado
        setOrigen('get (solo lectura)');
    };

    //request: Abre el cuadro del sistema si todavía se puede preguntar
    const solicitar = async () => {
        //await espera la respuesta
        //requestCameraPermissionsAsync() solicita permiso de usar la cámara
        const resultado = await Camera.requestCameraPermissionsAsync();
        setRespuesta(resultado); //guarda el resultado
        setOrigen('request (pregunta al usuario)');
    };
    
    //Al abrir la app solo consultamos: no molestamos al usuario
    useEffect(() => {
        consultar();
    }, []);

    //Si "granted" es verdadero es verde, de lo contrario, rojo
    const colorEstado = respuesta?.granted ? '#15803D' : '#B91C1C';

    return (
        <View style={styles.contenedor}>
            <StatusBar style="dark" />
            <Text style={styles.titulo}>get vs request</Text>
            {respuesta && (
                <View style={styles.tarjeta}>
                    <Text style={styles.origen}>Última llamada:
                        {origen}</Text>
                    <Text style={[styles.estado, {
                        color: colorEstado
                    }]}>
                        {/*El estado textual del permiso*/}
                        status: {respuesta.status}
                    </Text>
                    {/*Las llamadas a String(...) convierten valores como true y 
                    false en texto que pueda mostrarse en pantalla*/}
                    <Text style={styles.dato}>granted:
                        {String(respuesta.granted)}</Text>
                    <Text style={styles.dato}>canAskAgain:
                        {String(respuesta.canAskAgain)}</Text>
                    <Text style={styles.dato}>expires:
                        {String(respuesta.expires)}</Text>
                </View>
            )}
            <View style={styles.boton}>
                <Button title="Consultar (get)" onPress={consultar} />
            </View>
            <View style={styles.boton}>
                <Button title="Solicitar (request)" color="#7C3AED" onPress={solicitar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#F6F6F6',
    },

    titulo: {
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 20
    },

    tarjeta: {
        padding: 16,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },

    origen: {
        fontSize: 14, 
        color: '#555555', 
        marginBottom: 10
    },

    estado: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 8
    },

    dato: { 
        fontSize: 16, 
        marginVertical: 2 
    },

    boton: { 
        marginTop: 12 
    },
});