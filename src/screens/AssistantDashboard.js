import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Color, Fonts} from '../theme';
import AssistantCard from '../components/AssistantCard';
import {useSelector} from 'react-redux';
import {getData, postData} from '../API';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import EditAssistant from '../components/bottomsheets/EditAssistant';
import {errorToast, successToast} from '../components/toasts';
import AlertModal from '../components/modals/AlertModal';
import {useTranslation} from 'react-i18next';

export default function AssistantDashboard({navigation}) {
  const user = useSelector(state => state.user);

  const {t} = useTranslation();

  const [assistantData, setAssistantData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [editLoading, setEditLoading] = React.useState(false);

  const [selectedItem, setSelectedItem] = React.useState(null);

  const [showModal, setShowModal] = React.useState(false);

  const _sheetRef = React.useRef(null);

  const fetchAssistants = async () => {
    const list = await getData(`doctorassistantlist/${user?.userid}`);
    setAssistantData(list?.data);
    console.log('asslist==',list?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const onEdit = item => {
    setSelectedItem(item);
    _sheetRef.current.open();
  };

  const handleEdit = async item => {
    setEditLoading(true);
    const body = item;
    const result = await postData('assistantprofileupdate', body);
    if (result.success) {
      fetchAssistants();
      _sheetRef.current.close();
      successToast(t('assistantDashboard.assistantUpdated'));
    }
    setEditLoading(false);
  };

  const onPrimaryPress = async () => {
    const result = await getData(
      `assistantprofiledelete/${selectedItem?.assistant_id}`,
    );
    if (result.success) {
      fetchAssistants();
      setShowModal(false);
      successToast(t('assistantDashboard.assistantDeleted'));
    } else {
      errorToast(t('assistantDashboard.somethingWentWrong'));
    }
  };

  const onDelete = item => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <AlertModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        title={t('assistantDashboard.areYouSure')}
        primaryBtnText={t('assistantDashboard.deleteAssistant')}
        onPrimaryPress={() => onPrimaryPress()}
        secondaryBtnText={t('assistantDashboard.cancel')}
        onSecondaryPress={() => {
          setShowModal(false);
        }}
      />
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => navigation.navigate('AddAssistant')}>
        <MaterialIcons
          name="add-box"
          size={64}
          color={Color.white}
          style={styles.addIcon}
        />
        <Text style={styles.addText}>{t('assistantDashboard.addNew')}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{t('assistantDashboard.yourAssistants')}</Text>
      {loading ? (
        <View
          style={{
            margin: 20,
          }}>
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
        </View>
      ) : (
        <FlatList
          data={assistantData}
          persistentScrollbar
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          renderItem={({item}) => (
            <AssistantCard
              item={item}
              onEdit={() => onEdit(item)}
              onDelete={onDelete}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
      <EditAssistant
        ref={_sheetRef}
        loading={editLoading}
        item={selectedItem}
        handleEdit={item => handleEdit(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  addContainer: {
    backgroundColor: Color.primary,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Color.primary,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addIcon: {
    fontWeight: '800',
  },
  addText: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.white,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    marginTop: 20,
    marginHorizontal: 20,
  },
});
