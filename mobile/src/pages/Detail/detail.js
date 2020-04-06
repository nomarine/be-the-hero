import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import imgLogo from '../assets/logo.png';
import style from './style';

export default function Detail(){
    const navigate = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `E aí piranha, bora ajudar a causa ${incident.title} da ONG ${incident.name} de ${incident.city}/${incident.uf} por apenas ${Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'})
        .format(incident.value)}!`;

    function sendMail() {
        MailComposer.composeAsync({
            subject: 'Herói do caso: Lacre solidário',
            recipients: [`${incident.email}`],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    function navigateBack() {
        navigate.goBack();
    }

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={imgLogo}/>
                <TouchableOpacity 
                    style={style.headerText}
                    onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>    

            <View style={style.incident}>

                    <Text style={[style.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                    <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={style.incidentProperty}>CASO:</Text>
                    <Text style={style.incidentValue}>{incident.title}</Text>

                    <Text style={style.incidentProperty}>VALOR:</Text>
                    <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'})
                        .format(incident.value)}</Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso!</Text>

                <Text style={style.heroDescription}>Entre em contato</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}