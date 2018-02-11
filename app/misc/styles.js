import React from 'react';
import { StyleSheet }   from 'react-native';
import colors from './colors.js';

export default styles = StyleSheet.create({

    //SPLASH
    continue: {
        fontSize:20,
        fontFamily:'Bungee-Regular',
        color:colors.background,
        alignSelf: 'center',
        marginTop:5
    },

    //Lists Header
    header: {
        fontFamily:'FredokaOne-Regular',
        fontSize: 23,
        color: colors.font,
        marginRight:15,
    },

    //Lists Screen
    normalFont: {
        fontFamily:'ConcertOne-Regular',
        fontSize: 18,
        color: colors.font,
    },
    descFont: {
        fontFamily:'ConcertOne-Regular',
        fontSize: 18,
        color: colors.font,
        alignSelf:'center',
        lineHeight: 20
    },
    centeredBtn: {
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 18,
        color: colors.font,
        alignSelf:'center',
    },
    centeredBtnPressed: {
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 18,
        color: colors.font,
        alignSelf:'center',
    },
    flatListBtn : {
        fontFamily:'ConcertOne-Regular',
        fontSize: 25,
        color: colors.font,
        alignSelf:'center',
        marginTop:10,
        marginBottom:10
    },
    titleFont: {
        fontFamily:'ConcertOne-Regular',
        fontSize: 25,
        color: colors.main,
    },
    detail: {
        color:colors.shadow,
        fontFamily: 'FredokaOne-Regular',
        fontSize:15,
        lineHeight: 18,
        marginBottom:5,
        marginLeft:10,
        marginRight:10,
    },
    detailContainer: {
        justifyContent:'center',
        marginTop:10,
        marginLeft:10,
        marginRight:10,
    },
    comment: {
        color:colors.shadow,
        fontFamily: 'FredokaOne-Regular',
        fontSize:15,
        lineHeight: 18,
        marginBottom:5,
        marginLeft:10,
        marginRight:10,
    },
    commentContainer: {
        justifyContent:'center',
        marginTop:10,
        marginLeft:10,
        marginRight:10,
    },
    link: {
        color:colors.font,
        fontFamily: 'ConcertOne-Regular',
        fontSize:17,
        lineHeight: 25,
        alignSelf:'center',
        marginBottom:5,
        marginLeft:10,
        marginRight:10,
    },
    linkContainer: {
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginLeft:10,
        marginRight:10,
    },
    listButton: {
        fontFamily:'FredokaOne-Regular',
        fontSize:22,
        alignSelf:'center',
        color:colors.font,
        margin:4,
    },
    pagerButton: {
        fontSize: 15,
        fontFamily: 'FredokaOne-Regular',
        color: colors.shadow,
        marginTop:5,
        marginBottom:5,
    },
    choiceButton: {
        fontFamily:'LuckiestGuy-Regular',
        color: colors.font,
        fontSize: 17,
        alignSelf: 'center',
    },

    //Details Screen
    roleDesc: {
        fontSize: 15,
        fontFamily: 'FredokaOne-Regular',
        color: colors.striker,
        marginTop:5,
        marginBottom:5,
    },
    message: {
        fontSize: 15,
        fontFamily: 'FredokaOne-Regular',
        color: colors.striker,
        marginTop:5,
        marginBottom:5,
    },
    hidden: {
        fontSize: 15,
        fontFamily: 'ConcertOne-Regular',
        textAlign:'center',
        color: colors.gameback,
        marginLeft: 40,
        marginRight:40,
    },
    chat:{
        fontSize:20,
        fontFamily:'LuckiestGuy-Regular',
        color:colors.details,
        alignSelf: 'center',
        marginTop:15,
        marginBottom:15,
    },
    leftfont:{
        fontSize:17,
        fontFamily:'LuckiestGuy-Regular',
        color:colors.striker,
        marginTop:5,
    },

    //Join Tutorial
    roomcode: {
        fontSize: 40,
        fontFamily: 'LuckiestGuy-Regular',
        textAlign:'center',
        color: colors.striker
    },
    subtitle : {
        fontSize: 20,
        fontFamily: 'ConcertOne-Regular',
        textAlign:'center',
        color: colors.striker,
    },
    digit: {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.font, 
        borderRadius:2,
        margin:5
    },
    nameInput: {
        backgroundColor: colors.main,
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 30,
        color:colors.background,
        textAlign:'center',
        borderRadius:10,
    },
    textInput: {
        backgroundColor: colors.main,
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 30,
        color:colors.background,
        textAlign:'center',
        borderRadius:10,
    },
    playerList: {
        fontSize: 25,
        fontFamily: 'LuckiestGuy-Regular',
        textAlign:'center',
        color: colors.font,
        margin:5,
    },

    //Create Tutorial
    options: {
        fontSize: 20,
        fontFamily: 'ConcertOne-Regular',
        marginLeft:20,
        color: colors.font,
    },
    title : {
        fontSize: 30,
        fontFamily: 'LuckiestGuy-Regular',
        textAlign:'center',
        color: colors.striker,
    },
    subtitle : {
        fontSize: 20,
        fontFamily: 'LuckiestGuy-Regular',
        textAlign:'center',
        color: colors.striker,
    },
    menuBtn : {
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 25,
        color: colors.font,
        alignSelf:'center'
    },
    error: {
        fontSize: 15,
        fontFamily: 'LuckiestGuy-Regular',
        textAlign:'center',
        color: colors.striker,
    },
    textOutput: {
        flex:0.7,
        backgroundColor:colors.font,
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 30,
        color:colors.background,
        textAlign:'center',
        borderRadius:10,
    },
    warningTitle: {
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 30,
        color:colors.font,
        textAlign:'center',
    },
    warningText: {
        fontFamily:'LuckiestGuy-Regular',
        fontSize: 20,
        color:colors.font,
        textAlign:'center',
    },

    //General
    dfont: {
        fontSize:15,
        fontFamily:'FredokaOne-Regular',
        color:colors.shadow,
        alignSelf: 'center',
    },
    lfont: {
        fontSize:17,
        fontFamily:'LuckiestGuy-Regular',
        color:colors.font,
    },
    counterfont: {
        fontSize:17,
        fontFamily:'LuckiestGuy-Regular',
        color:colors.font,
        marginLeft:15,
    },
    lsfont: {
        fontSize:12,
        fontFamily:'LuckiestGuy-Regular',
        color:colors.font,
        alignSelf: 'center',
    },
    sfont: {
        fontSize: 15,
        fontFamily: 'ConcertOne-Regular',
        textAlign:'center',
        color: colors.striker,
    },
    font: {
        fontSize:15,
        fontFamily:'FredokaOne-Regular',
        color:colors.font,
        alignSelf: 'center',
    },
    subfont: {
        fontSize:17,
        fontFamily:'LuckiestGuy-Regular',
        color:colors.striker,
        alignSelf: 'center',
    },
    mfont: {
        fontSize: 19,
        fontFamily: 'FredokaOne-Regular',
        textAlign:'center',
        color: colors.font,
    },
    plainfont: {
        color: colors.font,
        fontFamily: 'LuckiestGuy-Regular',
    },
    plaindfont: {
        color: colors.background,
        fontFamily: 'LuckiestGuy-Regular',
    }

})