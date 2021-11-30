import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 65,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    section: {

    }
});

// Create Document Component
const PdfCustom = ({dato}) => {
    const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];
    const date = new Date()
    return <Document>
        <Page size="LETTER" style={styles.body}>
            <View>
                <Text style={{ fontSize: '12px', textAlign: 'right', margin: 12 }}>
                    MÉRIDA, YUCATÁN A DÍA {date.getDate()} DE MES {monthNames[date.getMonth()]} DEL AÑO {date.getFullYear()}</Text>
                <Text style={{ fontSize: '12px', textAlign: 'left', marginTop: 50, marginHorizontal:12, marginBottom: 50}}>A QUIEN CORRESPONDA:</Text>
                <Text style={{ fontSize: '12px', textAlign: 'justify', margin: 12, }}>
                    Por medio de la presente y para los fines que pretenda el interesado, hago de su 
                    conocimiento que recomiendo ampliamente al C. {dato.Nombre}, ya que es una 
                    persona Honesta y Responsable en las actividades que durante el periodo que prestó
                    servicios en nuestra empresa que le fueron asignados, por tal motivo no tengo ninguna duda
                    en expedir esta recomendación.
                </Text>
                <Text style={{ fontSize: '12px', textAlign: 'justify', marginTop: 12, marginHorizontal:12, marginBottom: 80 }}>
                    Se extiende la presente a solicitud del interesado y para los fines que juzgue convenientes.
                </Text>
                <Text style={{ fontSize: '12px', textAlign: 'center', marginHorizontal:12, marginBottom: 25  }}>
                    FIRMA
                </Text>
                <Text style={{ fontSize: '12px', textAlign: 'center', marginBottom:5 }}>
                    ________________________
                </Text>
                <Text style={{ fontSize: '12px', textAlign: 'center' }}>
                    Efren Hazaar Herrera Isaac
                </Text>
                <Text style={{ fontSize: '12px', textAlign: 'center' }}>
                    Linkel Constructora SA. de CV.
                </Text>
            </View>
        </Page>
    </Document>
}

export default PdfCustom;