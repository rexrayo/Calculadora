import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/appTheme';

interface Props {
    ancho?: boolean;
    color?: string;
    texto: string;
    accion: ( numeroTexto: string ) => void;
}

export const BotonCalc = ({ texto, color = '#2D2D2D', ancho = false, accion }: Props) => {
    return (
        <TouchableOpacity onPress={ () => accion( texto ) }>
            <View style={{ 
                ...styles.button,
                backgroundColor: color,
                width: ( ancho ) ? 160 : 70
                }}>
                <Text style={{ 
                    ...styles.buttonText,
                    color: (color === '#9B9B9B' ? 'black' : 'white')
                    }}>
                        { texto }
                </Text>
            </View>
        </TouchableOpacity>
    )
}
