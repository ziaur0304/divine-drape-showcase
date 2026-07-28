export type Rating = {
  score: number;
  description?: string;
};

export type College = {
  id: string;
  name: string;
  shortName: string;
  overview: string;
  established: string;
  pgCourses: string;
  libraryAvailable: string;
  cadaver: Rating;
  attendanceStrictness: Rating;
  facultySupport: Rating;
  patientFlow: Rating;
  hostelConditions: Rating;
  hostelFood: Rating;
  sportsFacilities: Rating;
  collegeFest: string;
  locality: string;
  distanceFromGuwahati: string;
  studentOpinion: {
    quote: string;
    name: string;
    designation: string;
  };
  campusPhotosLink: string;
};

export const colleges: College[] = [
  {
    id: "gmch",
    name: "Gauhati Medical College & Hospital",
    shortName: "GMCH",
    overview:
      "As Assam's premier medical institution located in the state capital, Gauhati Medical College & Hospital combines academic excellence with one of the busiest tertiary care hospitals in Northeast India. The college is recognized for its diverse clinical exposure, advanced healthcare facilities, and significant contribution to medical education, research, and specialized patient care.",
    established: "1960",
    pgCourses: "Available",
    libraryAvailable: "Yes",
    cadaver: { score: 5 },
    attendanceStrictness: { score: 5 },
    facultySupport: { score: 3 },
    patientFlow: { score: 5 },
    hostelConditions: {
      score: 3,
      description:
        "Two boys hostels (Hostel 4 and Hostel 2) and three girls hostels (Hostel 3, Hostel 7 and Additional Girl's Hostel) for UG students.",
    },
    hostelFood: { score: 4 },
    sportsFacilities: {
      score: 3,
      description:
        "No outdoor playground on campus. Horuhojai Stadium is booked for intra-college sports events during college week. Badminton and Volleyball courts are available inside the hostels.",
    },
    collegeFest: "Plexus",
    locality:
      "Gauhati Medical College & Hospital (GMCH) is situated in Bhangagarh, one of Guwahati's most prominent and well-connected localities. The campus enjoys excellent road connectivity and is surrounded by pharmacies, banks, restaurants, shopping centres, and essential services, making daily life convenient for students. Its close proximity to the Guwahati Railway Station, ISBT, Lokpriya Gopinath Bordoloi International Airport, and major commercial areas ensures easy accessibility for patients, faculty, and visitors from across Assam and the Northeast.",
    distanceFromGuwahati: "Itself situated at Guwahati",
    studentOpinion: {
      quote:
        "Studying at GMCH has been a rewarding experience. The clinical exposure is exceptional, with a diverse patient load that helps build confidence and practical skills from an early stage. The campus is busy and academically demanding, but the supportive faculty, experienced seniors, and easy access to essential facilities in the surrounding area make student life both enriching and memorable.",
      name: "Dhritajit Medhi",
      designation: "Intern, GMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/1td4i2_eg5FiiqOFOdK31f9-oV7j4QjIy",
  },
  {
    id: "amch",
    name: "Assam Medical College, Dibrugarh",
    shortName: "AMCH",
    overview:
      "Assam Medical College & Hospital is the oldest medical college in Northeast India and a pioneer in medical education in the region, previously known as John Berry White Medical School. Renowned for its rich academic heritage, high patient inflow and extensive clinical exposure, the institution has produced generations of healthcare professionals while serving as a major referral center for Upper Assam and neighboring states.",
    established: "1947",
    pgCourses: "Available",
    libraryAvailable: "Yes",
    cadaver: { score: 5 },
    attendanceStrictness: { score: 5 },
    facultySupport: { score: 4 },
    patientFlow: { score: 5 },
    hostelConditions: { score: 4 },
    hostelFood: { score: 4 },
    sportsFacilities: {
      score: 5,
      description:
        "AMCH is the best college for sports in all of Assam. Facilities for every indoor and outdoor sport are available on campus.",
    },
    collegeFest: "Synapse",
    locality:
      "Situated in the heart of Dibrugarh, popularly known as the 'Tea City of India,' Assam Medical College enjoys a well-developed urban locality with a peaceful environment. The campus is surrounded by lush tea gardens, residential neighborhoods, pharmacies, restaurants, supermarkets, banks, and essential services, making day-to-day student life convenient. The college is well connected by road, rail, and air, with Dibrugarh Railway Station and Dibrugarh Airport offering easy access to other parts of Assam and India. As Dibrugarh serves as the healthcare and commercial hub of Upper Assam, students benefit from excellent clinical exposure while enjoying a safe, student-friendly atmosphere with plenty of recreational and dining options nearby.",
    distanceFromGuwahati:
      "Approx 450 KM (Distance from the city is the only weak point for this college — otherwise it is the best medical college of Assam)",
    studentOpinion: {
      quote:
        "Living around AMCH is comfortable because everything we need — food, transport, pharmacies, and study essentials — is easily available nearby. The calm surroundings, greenery, and friendly atmosphere make it a great place to focus on medical studies while still enjoying city conveniences.",
      name: "Ajijur Rahman",
      designation: "MBBS 4th Year, AMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/157EMfR2y8rAbJkMLihjDBfDtX1X13AF3",
  },
  {
    id: "pmch",
    name: "Pragjyotishpur Medical College",
    shortName: "PMCH",
    overview:
      "As one of Assam's newest government medical colleges, Pragjyotishpur Medical College & Hospital is still in its early stages of development. While the institution offers modern infrastructure and significant growth potential, students may currently experience the challenges common to newly established medical colleges, including evolving academic systems, ongoing infrastructure expansion, and comparatively lower clinical exposure than long-established institutions. However, with continued government investment and expansion, the college is expected to strengthen its academic and healthcare services in the coming years.",
    established: "2025",
    pgCourses: "Not Available",
    libraryAvailable: "Yes",
    cadaver: { score: 1 },
    attendanceStrictness: { score: 5 },
    facultySupport: { score: 4 },
    patientFlow: { score: 1 },
    hostelConditions: {
      score: 4,
      description: "Hostel is available in good condition.",
    },
    hostelFood: { score: 2 },
    sportsFacilities: {
      score: 1,
      description:
        "Only some indoor sports facilities are available. No playground is available on campus.",
    },
    collegeFest: "Mridangam",
    locality:
      "PMCH is located on the outskirts of Guwahati, where the surrounding area is still undergoing development. While the peaceful environment can be beneficial for studies, students may find the locality lacking in vibrant social life and modern amenities. Public transport is available but may not be as frequent or convenient as in central Guwahati, especially during late hours. Options for cafés, shopping malls, entertainment, and recreational activities are limited nearby, requiring students to travel into the city. During the monsoon season, some surrounding roads may also experience waterlogging and traffic delays, making daily commuting less convenient.",
    distanceFromGuwahati: "Itself situated at Guwahati",
    studentOpinion: {
      quote:
        "I took admission here for city life. I would suggest: don't sacrifice your career just for city life. If you are getting an older and more established college, you'll have much better opportunities for learning and clinical exposure.",
      name: "Anonymous",
      designation: "MBBS 1st Year, PMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/1UASXljlIM_h3zwvBSRtMv0XNgwQKbcAQ",
  },
  {
    id: "jmch",
    name: "Jorhat Medical College",
    shortName: "JMCH",
    overview:
      "Jorhat Medical College & Hospital has grown into one of Assam's prominent government medical institutions, serving as a major tertiary care center for Upper Assam and neighboring regions. The college offers good clinical exposure and expanding postgraduate programs, but it still trails older institutions like AMCH and GMCH in terms of legacy, alumni network, and long-established academic reputation. Nevertheless, JMCH continues to strengthen its infrastructure, research activities, and healthcare services, making it a preferred choice for many MBBS aspirants in the state.",
    established: "2009",
    pgCourses: "Available",
    libraryAvailable: "Yes",
    cadaver: { score: 5 },
    attendanceStrictness: { score: 5 },
    facultySupport: { score: 4 },
    patientFlow: { score: 5 },
    hostelConditions: { score: 4 },
    hostelFood: { score: 4 },
    sportsFacilities: {
      score: 3,
      description:
        "A playground is available but not large enough. Free gym facility is available for students.",
    },
    collegeFest: "Esperenza",
    locality:
      "Jorhat Medical College is located in the culturally rich city of Jorhat, one of the major urban centers of Upper Assam. The locality offers a peaceful and student-friendly environment with easy access to essential amenities such as pharmacies, grocery stores, restaurants, banks, and public transport. Unlike larger metropolitan cities, Jorhat has a slower pace of life, making it suitable for focused academic pursuits. The city is well connected by road, rail, and air, ensuring convenient travel for students. Although nightlife and large entertainment hubs are limited, the locality provides a safe and comfortable atmosphere for medical education.",
    distanceFromGuwahati: "Approx 300 KM",
    studentOpinion: {
      quote:
        "The locality is peaceful and convenient for students, with most daily necessities available nearby. However, Jorhat isn't a very happening city, so entertainment options are limited. On the positive side, the calm environment makes it easier to stay focused on academics.",
      name: "Shajid Ahmed",
      designation: "MBBS 3rd Year, JMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/19vRD_loq8T3-54tXJCLUd4uPn3z95FGv",
  },
  {
    id: "lmch",
    name: "Lakhimpur Medical College & Hospital",
    shortName: "LMCH",
    overview:
      "Lakhimpur Medical College & Hospital is a relatively young government medical institution established to improve healthcare access in North Assam and neighboring Arunachal Pradesh. While the college benefits from modern infrastructure and a developing campus, it is still building its academic legacy and postgraduate ecosystem. Compared to Assam's older medical colleges, clinical exposure, departmental maturity, and research opportunities are continuing to evolve, making LMCH a promising institution that is still in its developmental phase.",
    established: "2021",
    pgCourses: "Available",
    libraryAvailable: "Yes",
    cadaver: { score: 4 },
    attendanceStrictness: {
      score: 2,
      description: "Biometric not available.",
    },
    facultySupport: { score: 4, description: "Helpful." },
    patientFlow: { score: 4 },
    hostelConditions: { score: 4 },
    hostelFood: { score: 3 },
    sportsFacilities: { score: 3, description: "Playground available." },
    collegeFest: "Chiasma",
    locality:
      "Lakhimpur Medical College is situated in North Lakhimpur, a small and peaceful town in Upper Assam. The locality offers a calm environment that is well suited for academic life, with essential facilities such as pharmacies, grocery stores, restaurants, banks, and public transport available nearby. However, compared to larger cities, the area has limited shopping, entertainment, and recreational options. The town is less crowded, making daily commuting easier, but students seeking an active city lifestyle may find the surroundings relatively quiet.",
    distanceFromGuwahati: "Approximately 370 Km",
    studentOpinion: {
      quote:
        "LMCH offers a calm and student-friendly environment with modern infrastructure and a well-maintained campus. The faculty are approachable and supportive, and the improving patient flow provides good clinical learning opportunities. Being a newer college also means many facilities are well equipped, making it a comfortable place to study and grow as a future doctor.",
      name: "Sikdar Rashidul Islam",
      designation: "Final Year, LMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/1aQU2gRFUS2uUQE1OXtFh2w-jnwzEJg9z",
  },
  {
    id: "bmch",
    name: "Barpeta Medical College & Hospital",
    shortName: "BMCH",
    overview:
      "Barpeta Medical College & Hospital (formerly Fakhruddin Ali Ahmed Medical College) is one of Assam's established government medical colleges, serving as a major healthcare and teaching institution for Lower Assam. With a well-functioning tertiary care hospital, experienced faculty, postgraduate programs, and a consistently high patient load, the college provides strong clinical exposure and a solid academic environment. Although the infrastructure is older than some newer colleges, BMCH remains a preferred choice for students seeking practical learning and extensive hands-on experience.",
    established: "2011",
    pgCourses: "Available",
    libraryAvailable: "Yes",
    cadaver: { score: 4 },
    attendanceStrictness: { score: 5 },
    facultySupport: { score: 3 },
    patientFlow: { score: 5 },
    hostelConditions: { score: 2 },
    hostelFood: { score: 3 },
    sportsFacilities: { score: 3, description: "Playground available." },
    collegeFest: "Xclepia",
    locality:
      "Barpeta Medical College is located in Barpeta town, a well-connected district headquarters in Lower Assam. The locality provides all the essential facilities required for student life, including pharmacies, grocery stores, restaurants, banks, hostels, and public transport. The town has a peaceful atmosphere with relatively low traffic, making daily commuting convenient. While Barpeta does not offer the nightlife or entertainment options of larger cities like Guwahati, its affordable cost of living and student-friendly environment make it a comfortable place to pursue medical education.",
    distanceFromGuwahati: "Approximately 92 Km",
    studentOpinion: {
      quote:
        "The faculty members are supportive and approachable, creating a healthy academic environment. The campus is peaceful, patient exposure is good, and seniors are always willing to help. Overall, BMCH provides a balanced atmosphere for both learning and personal growth.",
      name: "Khan Wasif Mostafa",
      designation: "Final Year, BMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/1BQkzwH4N9Y27Oc-DxykD5jBOf2cQ_Zft",
  },
  {
    id: "tmch",
    name: "Tezpur Medical College & Hospital",
    shortName: "TMCH",
    overview:
      "Tezpur Medical College & Hospital is one of Assam's prominent government medical colleges, serving the healthcare needs of North Assam and parts of Arunachal Pradesh. Over the years, the institution has expanded its academic programs with postgraduate courses, modern infrastructure, and a steadily increasing patient load, offering students strong clinical exposure. While it may not have the legacy of Assam's oldest medical colleges, TMCH has built a reputation for quality medical education, supportive faculty, and continuous growth in both academics and healthcare services.",
    established: "2013",
    pgCourses: "Available",
    libraryAvailable: "Yes",
    cadaver: { score: 4 },
    attendanceStrictness: { score: 4 },
    facultySupport: { score: 4 },
    patientFlow: { score: 4 },
    hostelConditions: { score: 3 },
    hostelFood: { score: 3 },
    sportsFacilities: { score: 5, description: "Playground available." },
    collegeFest: "No Name",
    locality:
      "Tezpur Medical College is located in Tezpur, one of Assam's cleanest and most scenic cities. The locality offers a peaceful and student-friendly environment with easy access to pharmacies, grocery stores, restaurants, banks, cafes, and public transport. Compared to many other towns in Assam, Tezpur has better civic amenities and a pleasant atmosphere, making student life comfortable. Although it is not as busy as Guwahati, the city provides a good balance between urban convenience and a calm environment that supports academic focus.",
    distanceFromGuwahati: "Approximately 150 Km",
    studentOpinion: {
      quote:
        "The faculty members are supportive and approachable, and the teaching quality is good. The campus is clean, green, and well maintained, creating a pleasant atmosphere for studying. With good infrastructure, a friendly senior-junior culture, and steadily improving clinical exposure, TMCH provides a positive environment for both academic and personal growth.",
      name: "Shariful Islam",
      designation: "Final Year, TMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/13g43ZPj5HAEehLh99K8gQTe5ao4FjKAf",
  },
  {
    id: "nmch",
    name: "Nagaon Medical College & Hospital",
    shortName: "NMCH",
    overview:
      "Nagaon Medical College & Hospital is one of Assam's newest government medical colleges. Located in central Assam, the college features modern infrastructure, a well-planned campus, and a 500-bed teaching hospital. As a newly established institution, it currently offers MBBS with growing academic and clinical facilities. While it is still developing its reputation, NMCH has the advantage of contemporary infrastructure and is steadily expanding its patient services, faculty strength, and overall academic environment.",
    established: "2023",
    pgCourses: "Not Available",
    libraryAvailable: "Yes",
    cadaver: { score: 3 },
    attendanceStrictness: { score: 2 },
    facultySupport: { score: 4 },
    patientFlow: { score: 5 },
    hostelConditions: { score: 4 },
    hostelFood: { score: 3 },
    sportsFacilities: {
      score: 3,
      description: "Playground under construction. Free gymnastics available.",
    },
    collegeFest: "Sphygmos",
    locality:
      "Nagaon Medical College is located in Nagaon, a centrally located town in Assam with good road connectivity to Guwahati, Tezpur, and Upper Assam. The locality offers easy access to essential facilities such as pharmacies, grocery stores, restaurants, banks, and public transport, making daily student life convenient. Compared to smaller towns, Nagaon has better commercial activity and a moderate cost of living. While the city does not offer the extensive entertainment and nightlife of Guwahati, it provides a practical, student-friendly environment with most necessities available nearby.",
    distanceFromGuwahati: "Approximately 120 Km",
    studentOpinion: {
      quote:
        "The faculty members are helpful and approachable, and the college has a friendly academic atmosphere. The campus is spacious, clean, and well maintained, with good hostel facilities. Despite being a newer medical college, the patient flow is encouraging, providing students with valuable clinical exposure and a strong foundation for MBBS.",
      name: "Raihanul Hoque",
      designation: "3rd Year, NMCH",
    },
    campusPhotosLink:
      "https://drive.google.com/drive/folders/1TSyQlwd1A3xHDJZ18vXq3LWNvhKVv4PF",
  },
  {
    id: "timch",
    name: "Tinsukia Medical College & Hospital",
    shortName: "TiMCH",
    overview:
      "Tinsukia Medical College & Hospital is one of Assam's newest government medical colleges. Located at Makum in Tinsukia district, the college features modern infrastructure, a spacious campus, and a 500-bed teaching hospital. With an annual MBBS intake of 100 students, it is recognized by the National Medical Commission and affiliated with Srimanta Sankaradeva University of Health Sciences. As a newly established institution, it is still developing its academic ecosystem, but its modern facilities and expanding healthcare services provide a strong foundation for future growth.",
    established: "2024",
    pgCourses: "Not Available",
    libraryAvailable: "Yes",
    cadaver: { score: 4 },
    attendanceStrictness: { score: 2 },
    facultySupport: { score: 4 },
    patientFlow: { score: 4 },
    hostelConditions: { score: 4 },
    hostelFood: { score: 3 },
    sportsFacilities: { score: 3, description: "Playground available." },
    collegeFest: "Selestia",
    locality:
      "Tinsukia Medical College is located in Makum, around 15 km from Tinsukia town, in the tea-growing region of Upper Assam. The locality offers a peaceful environment with basic amenities such as pharmacies, grocery stores, restaurants, and local transport available nearby. Since the college is situated slightly away from the main town, students may need to travel to Tinsukia for shopping malls, branded stores, and a wider range of entertainment options. However, the area is well connected by road, and Tinsukia Railway Station and Dibrugarh Airport provide convenient travel links.",
    distanceFromGuwahati: "Approximately 500 Km",
    studentOpinion: {
      quote:
        "The campus is modern, clean, and well maintained. The faculty members are supportive, and the new infrastructure creates a comfortable learning environment. Being a new college, everything feels well organized, and we're optimistic about its future as patient flow and academic activities continue to grow.",
      name: "Hifzur Rahman",
      designation: "2nd Year, TiMCH",
    },
    campusPhotosLink: "",
  },
];
