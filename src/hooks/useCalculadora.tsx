import { useRef, useState } from "react";

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    const [numero, setNumero] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const armarNumero = (numeroTexto: string) => {

        // NO aceptar mas de 1 punto
        if ( numero.includes('.') && numeroTexto === '.' ) return;

        if ( numero.startsWith('0') || numero.startsWith('-0') ){
            // Punto decimal
            if ( numeroTexto === '.' ) {
                setNumero( numero + numeroTexto );
            
                // Evaluar cero y si hay punto
            } else if ( numeroTexto === '0' && numero.includes('.') ) {
                setNumero( numero + numeroTexto );

            }else if ( numero.includes('-') && numero.includes('0') ) {
                setNumero( '-' + numeroTexto );

                // Evaluar si es != 0 y no hay punto
            } else if ( numeroTexto !== '0' && !numero.includes('.') ) {
                setNumero( numeroTexto );

                // Evitar 000.0
            } else if ( numeroTexto === '0' && !numero.includes('.') ) {
                setNumero( numero );
                
            } else {
                setNumero( numero + numeroTexto );
            }


        } else {
            setNumero( numero + numeroTexto );
        };
    };

    const cambiarNumPorAnterior = () => {
        if ( numero.endsWith('.') ) {
            setNumeroAnterior( numero.slice(0,-1) );
        } else {
            setNumeroAnterior( numero );
        }

        setNumero( '0' );
    };

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    };

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    };

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    };

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    };

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    };

    const del = () => {
        if (numero.length - 1 === 0) {
            setNumero( '0' );
        
        } else if (numero.length - 1 === 1 && numero.includes('-')) {
            setNumero( '-0' );

        } else {
            const newNumero = numero.substring(0, numero.length - 1);
            setNumero(newNumero);
        }
    };

    const positivoNegativo = () => {
        if ( numero.includes('-') ) {
            if (numero === '-') {
                setNumero( numero.replace( '-', '0' ) );
            } else {
                setNumero( numero.replace( '-', '' ) );
            }
        } else {
            setNumero( '-' + numero );
        }
    };

    const calcular = () => {
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero( `${num1 + num2}` );
                break;
            case Operadores.restar:
                setNumero( `${num2 - num1}` );
                break;
            case Operadores.multiplicar:
                setNumero( `${num1 * num2}` );
                break;
            case Operadores.dividir:
                setNumero( `${num2 / num1}` );
                break;
                    
            default:
                break;
        }

        setNumeroAnterior( '0' );
    };


    return {
        numero,
        numeroAnterior,
        armarNumero,
        positivoNegativo,
        limpiar,
        del,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular
    }

}