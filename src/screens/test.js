let formData = new FormData();
formData.append('user_id', user?.userid);
formData.append('name', name);
formData.append('date_of_birth', dob);
formData.append('marital_status', maritalStatus);
formData.append('gender', gender);
formData.append('email', email);
formData.append('fees', doctor_fees);
formData.append('do_lo_id', dolo_id);
formData.append('doctorContact', doctorContact);
formData.append('clinic_contact', clinicContact);
formData.append('location', location);
formData.append('pincode', pinCode);
formData.append('adhar', adhar);
formData.append('registration_number', registration_number);
formData.append('schedule', JSON.stringify(schedule));
formData.append('avgTime', avgTime);
clinicLocations.length > 0
  ? formData.append('clinicLocations', JSON.stringify(clinicLocations))
  : formData.append('clinicLocations', JSON.stringify([clinicLocationText]));
formData.append('facilities', facilities);
formData.append('specialization', specialization);
formData.append('Degree', Degree);
formData.append('collegename', collegename);
formData.append('year_of_passout', year_of_passout);
formData.append('college_location', college_location);
formData.append('feeconsultation', checked);
formData.append('languages', languages);
awardList.length > 0
  ? formData.append('awardList', JSON.stringify(awardList))
  : formData.append(
      'awardList',
      JSON.stringify([
        {
          award_name,
          award_giving_authority_name,
        },
      ]),
    );
certList.length > 0
  ? formData.append('certList', JSON.stringify(certList))
  : formData.append('certList', JSON.stringify([certifications]));
achievementList.length > 0
  ? formData.append('achievementList', JSON.stringify(achievementList))
  : formData.append(
      'achievementList',
      JSON.stringify([{achievement_specialization, achievement_year}]),
    );
formData.append('profileimage', {
  uri: doctorPic.path,
  type: doctorPic.mime,
  name: 'profileimage',
});
console.log('formData', JSON.stringify(formData))


    let body = {
      user_id: user?.userid,
      name,
      date_of_birth: dob,
      marital_status: maritalStatus,
      gender,
      email,
      fees: doctor_fees,
      do_lo_id: dolo_id,
      doctorContact,
      clinic_contact: clinicContact,
      location,
      pincode: pinCode,
      adhar,
      registration_number,
      schedule,
      avgTime,
      clinicLocations:
        clinicLocations.length > 0 ? clinicLocations : [clinicLocationText],
      facilities,
      specialization,
      Degree,
      collegename,
      year_of_passout,
      college_location,
      feeconsultation: checked,
      languages,
      awardList:
        awardList.length > 0
          ? awardList
          : [
              {
                award_name,
                award_giving_authority_name,
              },
            ],
      certList: certList.length > 0 ? certList : [certifications],
      achievementList:
        achievementList.length > 0
          ? achievementList
          : [{achievement_specialization, achievement_year}],
      profileimage: doctorPic.data,
    };
