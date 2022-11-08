import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Fonts} from '../theme';
import LangSheet from '../components/bottomsheets/LangSheet';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import { successToast } from '../components/toasts';

export default function SettingsScreen({navigation}) {
  const _langSheetRef = React.useRef(null);

  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();

  const lang_ = useSelector(state => state.language) || 'en';

  const handleLangChange = lang => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        dispatch({
          type: 'SET_LANGUAGE',
          payload: lang,
        });
        successToast("Language changed successfully");
      })
      .catch(err => console.log(err));
    _langSheetRef.current.close();
  };

  return (
    <View style={styles.container}>
      <LangSheet
        ref={_langSheetRef}
        value={lang_}
        handleChange={lang => handleLangChange(lang)}
      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings.screenTitle')}</Text>
      </View>
      <View style={styles.lists}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => _langSheetRef.current.open()}>
          <MaterialCommunityIcons
            name="earth"
            size={30}
            color={Color.primary}
          />
          <Text style={styles.listText}>{t('settings.change_language')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
  lists: {
    padding: 20,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.primaryRegular,
    marginLeft: 20,
  },
});
