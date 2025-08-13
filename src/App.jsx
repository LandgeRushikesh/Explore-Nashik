import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Events from "./Pages/Events/Events";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { AuthContext } from "./Context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase-config";
import User from "./Pages/User/User";
import { LoadScript } from "@react-google-maps/api";
import Details from "./Pages/Details/Details";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { DataContext } from "./Context/DataContext";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [places, setPlaces] = useState([]);

  const [AllEvents, setAllEvents] = useState([]);

  const EventscollectionRef = collection(db, "All Events");
  const PlacescollectionRef = collection(db, "All Places");

  const Attractions = [
    {
      title: "Trimbakeshwar Temple",
      category: "Religious",
      location: "Trimbak, Nashik, Maharashtra, India",
      latitude: 19.9381,
      longitude: 73.3264,
      shortDescription:
        "One of the twelve Jyotirlinga temples, source of the Godavari River.",
      longDescription:
        "Trimbakeshwar Temple is an ancient Hindu shrine and one of the twelve sacred Jyotirlingas of Lord Shiva. It is situated at the origin of the sacred Godavari River and built in the Hemadpanthi architectural style. The temple is spiritually significant and architecturally striking.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076310/Trimbakeshwar_Temple_jwmzht.jpg",
    },
    {
      title: "Sula Vineyards",
      category: "Modern Attractions",
      location: "Nashik, Maharashtra, India",
      latitude: 19.993,
      longitude: 73.7785,
      shortDescription:
        "India's premier vineyard offering wine-tasting and wine festivals.",
      longDescription:
        "Sula Vineyards is a renowned wine destination in Nashik offering guided tours, wine tasting, and the annual SulaFest music and wine festival. Its lush rolling vineyards and modern facilities make it a popular draw for tourists and wine enthusiasts alike.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076305/Sula_Vineyards_ewl092.jpg",
    },
    {
      title: "Pandav Caves",
      category: "Historical",
      location: "Nashik, Maharashtra, India",
      latitude: 19.9412,
      longitude: 73.7486,
      shortDescription:
        "Ancient rock-cut Buddhist caves dating to 3rd century BCE–CE.",
      longDescription:
        "Pandav Caves, also known as Pandavleni or Trirashmi Caves, are a group of 24 intricately carved Buddhist viharas and chaityas. Located on Trirashmi Hill in Nashik, they reflect early rock-cut architectural traditions and offer historical and scenic value.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755070345/Pandav_Caves_fjwy9a.jpg",
    },
    {
      title: "Dudhsagar (Someshwar) Waterfall",
      category: "Nature",
      location: "Gangapur, Nashik, Maharashtra, India",
      latitude: 20.0548,
      longitude: 73.823,
      shortDescription:
        "Picturesque waterfall near Godavari River, best in monsoon.",
      longDescription:
        "Dudhsagar or Someshwar Waterfall is located on the Godavari River near Gangapur. Its milky-white cascade amid verdant surroundings makes it a popular monsoon-time picnic and photo destination.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076383/Someshwar_waterfall_ezzf7n.webp",
    },
    {
      title: "Kalaram Temple",
      category: "Religious",
      location: "Panchavati, Nashik, Maharashtra, India",
      latitude: 19.9902,
      longitude: 73.7953,
      shortDescription:
        "Historic temple with a unique black statue of Lord Rama.",
      longDescription:
        "The Kalaram Temple is an iconic Hindu temple dedicated to Lord Rama, known for its black stone idol. It played a significant role in the Dalit temple entry movement led by Dr. B.R. Ambedkar. Architecturally and historically significant, it's located at Panchavati.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076302/Kalaram_Temple_kvxgm8.jpg",
    },
    {
      title: "Sita Gumpha",
      category: "Religious / Historical",
      location: "Panchavati, Nashik, Maharashtra, India",
      latitude: 19.9895,
      longitude: 73.795,
      shortDescription:
        "Cave shrine where Sita is believed to have worshipped Lord Shiva.",
      longDescription:
        "Sita Gumpha (Sita Gufa) is a revered cave near Kalaram Temple. Legend holds that Sita worshipped Lord Shiva here during the exile. It houses idols of Rama, Sita, and Lakshmana and is a serene spiritual spot in Panchavati.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076302/Sita_Gumpha_cghflz.jpg",
    },
    {
      title: "Muktidham Temple",
      category: "Religious",
      location: "Nashik Road, Nashik, Maharashtra, India",
      latitude: 19.954,
      longitude: 73.7782,
      shortDescription:
        "Marble temple complex with replicas of 12 Jyotirlingas & Geeta verses.",
      longDescription:
        "Muktidham Temple is a white marble complex featuring replicas of the twelve Jyotirlingas and Krishna temple paintings with Bhagavad Gita verses inscribed on the walls. It attracts thousands, especially during the Kumbh Mela.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076300/Muktidham_Temple_rl2jf2.jpg",
    },
    {
      title: "Gargoti Museum",
      category: "Cultural",
      location: "College Road, Nashik, Maharashtra, India",
      latitude: 19.9945,
      longitude: 73.7889,
      shortDescription: "Mineral and gem museum with geological exhibits.",
      longDescription:
        "The Gargoti Mineral Museum displays rare minerals, crystals, fossils, and gemstones collected from India and beyond. A paradise for geology enthusiasts and curious tourists.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076299/Gargoti_Museum_dwgcwv.jpg",
    },
    {
      title: "Harihar Fort",
      category: "Adventure",
      location: "Nashik, Maharashtra, India",
      latitude: 20.003,
      longitude: 73.789,
      shortDescription:
        "Thrilling trek with steep rock-cut steps and scenic views.",
      longDescription:
        "Harihar Fort is famous for its steep, rock-cut staircase carved at an extraordinary angle. It offers adventurous treks and panoramic views, combining historical intrigue with adrenaline-pumping paths.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076298/Harihar_Fort_ahg3zs.jpg",
    },
    {
      title: "Gangapur Dam",
      category: "Nature",
      location: "Gangapur, Nashik, Maharashtra, India",
      latitude: 20.057,
      longitude: 73.815,
      shortDescription:
        "Scenic dam and reservoir ideal for boating and monsoon visits.",
      longDescription:
        "Gangapur Dam is a tranquil water reservoir surrounded by greenery. Popular for leisurely boating and picnics, it shines especially during monsoon season with lush landscapes.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076299/Gangapur_Dam_mrlboq.jpg",
    },
    {
      title: "Coin Museum",
      category: "Cultural",
      location: "College Road, Nashik, Maharashtra, India",
      latitude: 19.996,
      longitude: 73.79,
      shortDescription: "Specialized museum dedicated to numismatic history.",
      longDescription:
        "The Coin Museum in Nashik showcases historical coins from India's rich monetary past. It’s the only numismatic museum in India and a standout cultural attraction for collectors and history lovers.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076297/Coin_Museum_dr67pg.jpg",
    },
    {
      title: "Saptashrungi Temple (and Fort)",
      category: "Religious / Historical",
      location: "Vani, Nashik, Maharashtra, India",
      latitude: 20.3931,
      longitude: 73.8676,
      shortDescription:
        "Revered hill shrine of Goddess Saptashrungi with fort views.",
      longDescription:
        "The Saptashrungi Treasury houses a sacred shrine dedicated to Goddess Saptashrungi on a scenic hill. Nearby, Saptashrungi Fort offers spectacular views of the Sahyadri range and historical significance in Maratha heritage.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755070345/Saptashrungi_Fort_outily.jpg",
    },
    {
      title: "Ramshej Fort Trek",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755070345/Ramshej_Fort_gea0gp.jpg",
      category: "Adventure",
      latitude: 20.0717,
      longitude: 73.7495 ,
      shortDescription:
        "A historic fort offering scenic views and a moderately challenging trek.",
      longDescription:
        "Ramshej Fort, located near Nashik, is a site of historical significance linked to Chhatrapati Shivaji Maharaj’s battles. The trek to the top offers panoramic views of surrounding hills and valleys. It is popular among adventure enthusiasts and history lovers for its ruins, natural beauty, and tranquil environment.",
    },
    {
      title: "Vaitarna Dam",
      category: "Nature / Adventure",
      location: "Igatpuri, Nashik district, Maharashtra, India",
      latitude: 19.958,
      longitude: 73.512,
      shortDescription:
        "Scenic dam in Igatpuri offering trekking and hiking nearby.",
      longDescription:
        "Vaitarna Dam is a picturesque site near Nashik, popular for serene views, nearby trekking trails, and nature walks. Ideal for outdoor enthusiasts and those exploring the Igatpuri region.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755076298/Vaitarna_Dam_ygbttq.webp",
    },
    // --- Religious ---
    {
      title: "Someshwar Temple",
      category: "Religious",
      location: "Gangapur Road, Nashik, Maharashtra, India",
      latitude: 20.0136,
      longitude: 73.7919,
      shortDescription:
        "Ancient Shiva temple on the banks of the Godavari River.",
      longDescription:
        "Someshwar Temple is a peaceful riverside shrine dedicated to Lord Shiva. Surrounded by greenery and flowing waters, it is a popular spot for devotees and tourists seeking a serene experience.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090636/Someshwar_Temple_xni8kk.jpg",
    },
    {
      title: "Navshya Ganpati Temple",
      category: "Religious",
      location: "Anandvalli, Nashik, Maharashtra, India",
      latitude: 20.0003,
      longitude: 73.7899,
      shortDescription:
        "Historic Ganesha temple known for fulfilling devotees' wishes.",
      longDescription:
        "Navshya Ganpati Temple is an iconic Nashik landmark dedicated to Lord Ganesha. It’s renowned for its divine ambiance and believed blessings, attracting crowds year-round, especially during Ganesh Chaturthi.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090633/Navshya_Ganpati_Temple_lmqghz.webp",
    },
    {
      title: "Shree Kapaleshwar Mahadev Temple",
      category: "Religious",
      location: "Panchavati, Nashik, Maharashtra, India",
      latitude: 19.9963,
      longitude: 73.7927,
      shortDescription: "Unique Shiva temple with no Nandi idol.",
      longDescription:
        "Shree Kapaleshwar Mahadev Temple is over 800 years old and uniquely lacks a Nandi idol. Located in Panchavati, it’s an important pilgrimage point with a tranquil atmosphere.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090630/Shree_Kapaleshwar_Mahadev_Temple_mql0sm.jpg",
    },
    {
      title: "Balaji Temple",
      category: "Religious",
      location: "Gangapur Road, Nashik, Maharashtra, India",
      latitude: 20.0271,
      longitude: 73.7485,
      shortDescription: "South Indian style temple of Lord Venkateswara.",
      longDescription:
        "A replica of the Tirupati Balaji Temple, this beautifully designed shrine offers devotees an authentic southern Indian temple experience without leaving Nashik.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090629/Balaji_Temple_jwiav1.jpg",
    },

    // --- Historical ---
    {
      title: "Anjaneri Fort",
      category: "Historical",
      location: "Anjaneri, Nashik, Maharashtra, India",
      latitude: 19.9628,
      longitude: 73.5933,
      shortDescription:
        "Believed birthplace of Lord Hanuman with trekking trails.",
      longDescription:
        "Anjaneri Fort is a historic and mythological site linked to Lord Hanuman. It offers scenic trekking routes, ancient caves, and panoramic Sahyadri views.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090625/Anjaneri_Fort_zrcp1c.jpg",
    },
    {
      title: "Salher Fort",
      category: "Historical",
      location: "Satana, Nashik, Maharashtra, India",
      latitude: 20.8763,
      longitude: 73.9305,
      shortDescription: "Highest fort in Maharashtra with Maratha history.",
      longDescription:
        "Salher Fort is famed for its height and as the site of the historic Battle of Salher in 1672. It offers stunning mountain views and challenging treks.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090625/Salher_Fort_ju9psy.jpg",
    },
    {
      title: "Ramkund",
      category: "Historical",
      location: "Panchavati, Nashik, Maharashtra, India",
      latitude: 19.9996,
      longitude: 73.7895,
      shortDescription: "Sacred bathing ghat on the Godavari River.",
      longDescription:
        "Ramkund is a holy bathing ghat where pilgrims perform rituals. It is believed Lord Rama bathed here during his exile. It’s the focal point during Kumbh Mela.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090621/Ramkund_btp5x3.jpg",
    },
    {
      title: "Bhaskargad Fort (Basgad)",
      category: "Historical",
      location: "Igatpuri, Nashik district, Maharashtra, India",
      latitude: 19.6275,
      longitude: 73.7002,
      shortDescription:
        "Lesser-known fort with panoramic views and heritage value.",
      longDescription:
        "Bhaskargad Fort, located near Igatpuri, offers offbeat trekking, ruined bastions, and sweeping views of the Sahyadri ranges.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090619/Bhaskargad_Fort_Basgad_tsdqzx.jpg",
    },

    // --- Nature ---
    {
      title: "Vihigaon Waterfall",
      category: "Nature",
      location: "Vihigaon, Igatpuri, Nashik district, Maharashtra, India",
      latitude: 19.5932,
      longitude: 73.6279,
      shortDescription: "Beautiful monsoon waterfall popular for rappelling.",
      longDescription:
        "Vihigaon Waterfall cascades through lush greenery, offering thrilling rappelling experiences for adventure seekers during monsoon.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090617/Vihigaon_Waterfall_e1hskv.jpg",
    },
    {
      title: "Dugarwadi Waterfall",
      category: "Nature",
      location: "Trimbak, Nashik district, Maharashtra, India",
      latitude: 19.9622,
      longitude: 73.4956,
      shortDescription: "Hidden monsoon gem near Trimbakeshwar.",
      longDescription:
        "Dugarwadi is a less-commercialized waterfall surrounded by dense forests. It’s ideal for nature lovers seeking tranquility in monsoon.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090615/Dugarwadi_Waterfall_pgmmry.jpg",
    },
    {
      title: "Igatpuri Hills",
      category: "Nature",
      location: "Igatpuri, Nashik district, Maharashtra, India",
      latitude: 19.6951,
      longitude: 73.5623,
      shortDescription: "Hill station with misty peaks and trekking trails.",
      longDescription:
        "Igatpuri is a scenic getaway offering misty mountain landscapes, forts, and waterfalls. It’s a popular weekend spot from Nashik and Mumbai.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090613/Igatpuri_Hills_dnjpfc.webp",
    },
    {
      title: "Saputara Hill Station",
      category: "Nature",
      location: "Saputara, Gujarat (near Nashik border), India",
      latitude: 20.5791,
      longitude: 73.7493,
      shortDescription: "Hill resort near Nashik with boating and viewpoints.",
      longDescription:
        "Saputara, though across the Gujarat border, is a favorite excursion from Nashik. It offers boating, ropeway rides, and stunning hilltop sunsets.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090611/Saputara_Hill_Station_r6d2dh.jpg",
    },

    // --- Cultural ---
    {
      title: "Dadasaheb Phalke Memorial",
      category: "Cultural",
      location: "Trirashmi Hills, Nashik, Maharashtra, India",
      latitude: 19.9501,
      longitude: 73.7378,
      shortDescription: "Memorial dedicated to the father of Indian cinema.",
      longDescription:
        "This memorial showcases the life and works of Dadasaheb Phalke with exhibitions, a museum, and an amphitheater in a scenic setting.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090609/Dadasaheb_Phalke_Memorial_xmx8wh.jpg",
    },
    {
      title: "Artillery Centre Museum",
      category: "Cultural",
      location: "Nashik Road, Nashik, Maharashtra, India",
      latitude: 19.9498,
      longitude: 73.8035,
      shortDescription: "Military museum showcasing Indian Army history.",
      longDescription:
        "The museum inside the Artillery Centre exhibits weapons, war memorabilia, and the heritage of the Regiment of Artillery.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090607/Artillery_Centre_Museum_uavsuh.jpg",
    },
    {
      title: "Bhakti Dham",
      category: "Cultural",
      location: "Dindori Naka, Nashik, Maharashtra, India",
      latitude: 20.0215,
      longitude: 73.8001,
      shortDescription: "Temple and cultural complex for religious gatherings.",
      longDescription:
        "Bhakti Dham serves as a hub for religious discourses and cultural programs, attracting devotees and tourists alike.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090605/Bhakti_Dham_y0w9rz.jpg",
    },
    {
      title: "Chandwad Jain Mandir",
      category: "Cultural",
      location: "Chandwad, Nashik district, Maharashtra, India",
      latitude: 20.3284,
      longitude: 74.155,
      shortDescription: "Ancient Jain temple complex in Chandwad.",
      longDescription:
        "These Jain temples are known for intricate carvings and spiritual significance, drawing pilgrims and art lovers.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090603/Chandwad_Jain_Mandir_ajnbla.jpg",
    },

    // --- Adventure ---
    {
      title: "Kalsubai Peak",
      category: "Adventure",
      location: "Bari Village, Igatpuri, Nashik district, Maharashtra, India",
      latitude: 19.6062,
      longitude: 73.7101,
      shortDescription:
        "Highest peak in Maharashtra, popular trekking destination.",
      longDescription:
        "Kalsubai Peak offers a challenging yet rewarding trek with breathtaking Sahyadri views and a small temple at the summit.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090602/Kalsubai_Peak_p1kosk.webp",
    },
    {
      title: "Alang Fort",
      category: "Adventure",
      location: "Igatpuri region, Nashik district, Maharashtra, India",
      latitude: 19.6178,
      longitude: 73.6369,
      shortDescription: "One of the toughest treks in the Sahyadris.",
      longDescription:
        "Alang Fort is part of the Alang-Madan-Kulang trio and is famous for its technical trekking difficulty and mesmerizing scenery.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090602/Alang_Fort_d0ske2.jpg",
    },
    {
      title: "Madan Fort",
      category: "Adventure",
      location: "Igatpuri region, Nashik district, Maharashtra, India",
      latitude: 19.6134,
      longitude: 73.6409,
      shortDescription: "Steep climb with panoramic views.",
      longDescription:
        "Madan Fort offers challenging ascents and is often trekked along with Alang and Kulang forts by experienced trekkers.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090598/Madan_Fort_j1reec.jpg",
    },
    {
      title: "Kulang Fort",
      category: "Adventure",
      location: "Igatpuri region, Nashik district, Maharashtra, India",
      latitude: 19.6105,
      longitude: 73.6468,
      shortDescription: "Historic fort with vast plateau at the top.",
      longDescription:
        "Kulang Fort features wide summit space and panoramic views, often visited as part of the AMK trek.",
      imageUrl:
        "https://res.cloudinary.com/de3hys95z/image/upload/v1755090599/Kulang_Fort_l0ibza.jpg",
    },
  ];

  const addPlaces = async () => {
    for (const place of Attractions) {
      try {
        const res = await addDoc(PlacescollectionRef, {
          Name: place.title,
          imgURL: place.imageUrl,
          category: place.category,
          shortDesc: place.shortDescription,
          location:{lat:place.latitude,lon:place.longitude},
          LongDesc: place.longDescription,
        });
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // useEffect(()=>{
  //   addPlaces()
  // },[])

  // Fetch Events

  const fetchEvents = async () => {
    try {
      const res = await getDocs(EventscollectionRef);
      setAllEvents(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      alert(err.message);
    }
  };

  // Fetch Places

  const fetchPlaces = async () => {
    const res = await getDocs(PlacescollectionRef);
    setPlaces(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchEvents();
    fetchPlaces()
  }, []);

  onAuthStateChanged(auth, (currUser) => {
    setIsAuth(!!currUser);
  });

  return (
    <>
      <div className="min-h-screen">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
          <DataContext.Provider value={{ AllEvents,places }}>
            <AuthContext.Provider value={{ isAuth, setIsAuth, places }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="Attraction" element={<Explore />} />
                    <Route path="Events" element={<Events />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="Signup" element={<SignUp />} />
                    <Route path="UserPage" element={<User />} />
                    <Route path="Details" element={<Details />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AuthContext.Provider>
          </DataContext.Provider>
        </LoadScript>
      </div>
    </>
  );
}

export default App;
