// let formData = new FormData();
// formData.append('user_id', user?.userid);
// formData.append('name', name);
// formData.append('date_of_birth', dob);
// formData.append('marital_status', maritalStatus);
// formData.append('gender', gender);
// formData.append('email', email);
// formData.append('fees', doctor_fees);
// formData.append('do_lo_id', dolo_id);
// formData.append('doctorContact', doctorContact);
// formData.append('clinic_contact', clinicContact);
// formData.append('location', location);
// formData.append('pincode', pinCode);
// formData.append('adhar', adhar);
// formData.append('registration_number', registration_number);
// formData.append('schedule', JSON.stringify(schedule));
// formData.append('avgTime', avgTime);
// clinicLocations.length > 0
//   ? formData.append('clinicLocations', JSON.stringify(clinicLocations))
//   : formData.append('clinicLocations', JSON.stringify([clinicLocationText]));
// formData.append('facilities', facilities);
// formData.append('specialization', specialization);
// formData.append('Degree', Degree);
// formData.append('collegename', collegename);
// formData.append('year_of_passout', year_of_passout);
// formData.append('college_location', college_location);
// formData.append('feeconsultation', checked);
// formData.append('languages', languages);
// awardList.length > 0
//   ? formData.append('awardList', JSON.stringify(awardList))
//   : formData.append(
//       'awardList',
//       JSON.stringify([
//         {
//           award_name,
//           award_giving_authority_name,
//         },
//       ]),
//     );
// certList.length > 0
//   ? formData.append('certList', JSON.stringify(certList))
//   : formData.append('certList', JSON.stringify([certifications]));
// achievementList.length > 0
//   ? formData.append('achievementList', JSON.stringify(achievementList))
//   : formData.append(
//       'achievementList',
//       JSON.stringify([{achievement_specialization, achievement_year}]),
//     );
// formData.append('profileimage', {
//   uri: doctorPic.path,
//   type: doctorPic.mime,
//   name: 'profileimage',
// });
// console.log('formData', JSON.stringify(formData));

// let body = {
//   user_id: user?.userid,
//   name,
//   date_of_birth: dob,
//   marital_status: maritalStatus,
//   gender,
//   email,
//   fees: doctor_fees,
//   do_lo_id: dolo_id,
//   doctorContact,
//   clinic_contact: clinicContact,
//   location,
//   pincode: pinCode,
//   adhar,
//   registration_number,
//   schedule,
//   avgTime,
//   clinicLocations:
//     clinicLocations.length > 0 ? clinicLocations : [clinicLocationText],
//   facilities,
//   specialization,
//   Degree,
//   collegename,
//   year_of_passout,
//   college_location,
//   feeconsultation: checked,
//   languages,
//   awardList:
//     awardList.length > 0
//       ? awardList
//       : [
//           {
//             award_name,
//             award_giving_authority_name,
//           },
//         ],
//   certList: certList.length > 0 ? certList : [certifications],
//   achievementList:
//     achievementList.length > 0
//       ? achievementList
//       : [{achievement_specialization, achievement_year}],
//   profileimage: doctorPic.data,
// };

export const dummyAppointments = [
  {
    id: 1,
    name: 'Kuldeep Singh',
    date: '2022-11-02',
    time: '9:00 AM',
    status: 0,
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    location: 'Gwalior',
  },
  {
    id: 2,
    name: 'Kuldeep Singh',
    date: '2022-11-02',
    time: '11:00 AM',
    status: 0,
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    location: 'Gwalior',
  },
  {
    id: 3,
    name: 'Kuldeep Singh',
    date: '2022-11-02',
    time: '8:00 AM',
    status: 1,
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    location: 'Gwalior',
  },
  {
    id: 4,
    name: 'Kuldeep Singh',
    date: '2022-11-02',
    time: '11:00 AM',
    status: -1,
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    location: 'Gwalior',
  },
];

let defaultSchedule = [
  {
    day: 'Sunday',
    start_time: new Date(new Date().setHours(11, 0, 0)),
    end_time: new Date(new Date().setHours(19, 0, 0)),
    checked: false,
  },
  {
    day: 'Monday',
    start_time: new Date(new Date().setHours(11, 0, 0)),
    end_time: new Date(new Date().setHours(19, 0, 0)),
    checked: true,
  },
  {
    day: 'Tuesday',
    start_time: new Date(new Date().setHours(11, 0, 0)),
    end_time: new Date(new Date().setHours(19, 0, 0)),
    checked: true,
  },
  {
    day: 'Wednesday',
    start_time: new Date(new Date().setHours(11, 0, 0)),
    end_time: new Date(new Date().setHours(19, 0, 0)),
    checked: true,
  },
  {
    day: 'Thursday',
    start_time: new Date(new Date().setHours(11, 0, 0)),
    end_time: new Date(new Date().setHours(19, 0, 0)),
    checked: true,
  },
  {
    day: 'Friday',
    start_time: new Date(new Date().setHours(11, 0, 0)),
    end_time: new Date(new Date().setHours(19, 0, 0)),
    checked: true,
  },
  {
    day: 'Saturday',
    start_time: new Date(new Date().setHours(11, 0, 0)),
    end_time: new Date(new Date().setHours(19, 0, 0)),
    checked: true,
  },
];

export const dummyProfile = {
  name: 'Kuldeep Singh',
  do_lo_id: '123456',
  fees: '500',
  profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
  registrationNo: '123456',
  gender: 'Male',
  approve_date: '2022-11-18',
  email: 'dummy@gmail.com',
  date_of_birth: '1990-11-18',
  marital_status: 'Married',
  feeConsultation: true,
  adhar: '123456789012',
  avgTime: '30',
  doctorContact: '1234567890',
  clinicContact: '1234567890',
  location: 'Gwalior',
  facilities: 'OPD,Emergency',
  specialization: 'Cardiologist',
  clinicLocations: 'Gwalior,Indore',
  clinicSchedule: defaultSchedule,
  education_details: [
    {
      class: 'MBBS',
      Institue: 'AIIMS',
      Address: 'Gwalior',
      Yearofpassout: '2000',
    },
  ],
  languages: 'English,Hindi',
  awardList: [
    {
      award_name: 'Best Doctor Award',
      award_giving_authority_name: 'AIIMS',
    },
  ],
  certList: ['MBBS'],
  achievementList: [
    {
      achievement_specialization: 'Cardiologist',
      achievement_year: '2011',
    },
  ],
};

export const dummyAssistants = [
  {
    id: 1,
    name: 'Kuldeep Singh',
    profileimage: null,
    age: 30,
    gender: 'Male',
    joined: '2022-11-18',
  },
  {
    id: 2,
    name: 'Priyanka Singh',
    profileimage: null,
    age: 30,
    gender: 'Female',
    joined: '2022-11-18',
  },
  {
    id: 3,
    name: 'Priyanka Singh',
    profileimage: null,
    age: 30,
    gender: 'Female',
    joined: '2022-11-18',
  },
];

export const dummyRating = [
  {
    id: 1,
    name: 'Kuldeep Singh',
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    rating: 4,
    feedback: 'Good Doctor',
    date: '2022-11-18',
  },
  {
    id: 2,
    name: 'Kuldeep Singh',
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    rating: 5,
    feedback: 'Nice Doctor',
    date: '2022-11-18',
  },
  {
    id: 3,
    name: 'Kuldeep Singh',
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    rating: 1,
    feedback: 'Bad Doctor',
    date: '2022-11-18',
  },
  {
    id: 4,
    name: 'Kuldeep Singh',
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    rating: 3,
    feedback: 'OK Doctor',
    date: '2022-11-18',
  },
  {
    id: 5,
    name: 'Kuldeep Singh',
    profileimage: 'https://www.w3schools.com/howto/img_avatar.png',
    rating: 4,
    feedback: 'Good Doctor',
    date: '2022-11-18',
  },
];
