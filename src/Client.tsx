import {  useState } from 'react';
// import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from './assets/logo.png';
import clientPP from './assets/book-3964050_1920.jpg';
import fonctionnalite from './assets/merry-christmas-1093758_1920.jpg';
import { Link } from 'react-router-dom';
import{NavLink} from 'react-router-dom';
import {motion} from 'framer-motion';

export default function ClientPage() {

  const [billingCycle, setBillingCycle] = useState('mois');

  const plans = [
    { name: 'A', mois: 5.99},
    { name: 'B', mois: 10.99},
    { name: 'C', mois: 30.99 },
  ];

  // const setHideIntro = useState(false);

  // useEffect(() => {
  //   AOS.init({ duration: 800, once: true });
  //   const handleScroll = () => {
  //     setHideIntro(window.scrollY > 1000);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Header */}
      <header className="bg-[var(--white)]  fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <img src={logo} alt="logo" className="h-10 w-auto" />
              <nav className="flex space-x-6 text-#13698F font-semibold ">
              <NavLink
              to="/" end className = {({isActive}) => isActive ? "underline":"null" } > Accueil
              </NavLink>
              <NavLink to="/" end className = {({isActive}) => isActive ? "underline" : "null"}   >Fonctionnalités</NavLink>
              <NavLink to= "/" end className = {({isActive}) => isActive ? "underline" : "null" } >Tarifs</NavLink>
              <NavLink to= "/" end className={({isActive}) => isActive ? "underline": "null" } >Contacts </NavLink>
              </nav>
            </div>
            <Link to="/login">
            <button  className="bg-[var(--color-primary)] text-white font-semibold rounded-full
             px-5 py-2
             hover:bg-[var(--color-primary-hover)] transition shadow-md">
              Commencer
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Accueil */}
      <div className = "border-2 border-gray-200  rounded-2xl p-4 flex-col items-center grap-4 bg-gray-100 ">
      <section id="accueil" className="pt-28 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 items-center" data-aos="fade-up">
        <motion.div 
        initial={{
          x: 200
        }}
        animate={{
          x:-200
        }}
        >
            <span id='accueil'>
              <h1 className="text-3xl font-black text-gray-800 mb-4">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur doloremque fugiat similique laudantium necessitatibus,
                quibusdam nemo voluptate sapiente quis sed dicta, molestiae explicabo odit dolorum. Eligendi eaque blanditiis unde architecto!
              </h1>
              </span>
            <span id='accueil'>
               <p className="text-gray-700 text-lg leading-relaxed">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quos consectetur possimus omnis,
                facilis nihil fuga necessitatibus aut obcaecati laudantium, dolorem placeat eum itaque rem voluptates dolore voluptatem veritatis tempora.
              </p>
            </span>
          </motion.div> 
          <div data-aos="zoom-in">
            <img src={clientPP} alt="clientPP" className="w-full rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>
      </div>

      {/* Fonctionnalités */}
    <span>
        <section id="fonctionnalites" className="pt-28 px-6 max-w-7xl mx-auto" data-aos="fade-left">
        
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Fonctionnalités
          </h2>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
           
              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Gestion des étudiants</h3>
                <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eligendi laudantium voluptates odio iusto atque veritatis expedita quam et
                 sint! Omnis inventore unde consectetur sunt hic dolores, itaque in! Debitis.
                </p>
              </div>
           
              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta minus animi maxime omnis autem explicabo commodi molestias
                  , quaerat, magnam accusamus nisi facere vel, voluptas praesentium rem velit? Non, blanditiis dolorum.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta culpa voluptates sed id, at tempora repellendus 
                  molestiae necessitatibus eos architecto illum officiis itaque doloremque, quam quo? Molestiae fugit tempora atque.
                </p>
              </div>
           
              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, harum! Magnam ullam explicabo labore vitae ut reprehenderit laborum reiciendis!
                   Modi impedit asperiores saepe pariatur suscipit repudiandae praesentium quas tempore unde!</h3>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non omnis illo nobis quae sequi recusandae sed
                  , delectus vitae iure at tempora quia veniam eligendi, placeat nam ratione necessitatibus tempore natus!
                </p>
              </div>
            
          </div>
          <div data-aos="zoom-in">
            <img src={fonctionnalite} alt="fonctionnalite" className="w-full rounded-2xl shadow-md" />
          </div>
        </div>
      </section>
    </span>

      {/* Tarifs */};

<span id="tarifs">
 <section
  id="tarifs"
  className="pt-28 px-6 max-w-7xl mx-auto text-center"
  data-aos="fade-up"
>
  {/*  Description */}
  <div className='text-start justify-normal'>
    <h2 className="
    text-2xl font-bold text-gray-800  text-center md:text-left mb-2"> Tarifs</h2>
    <p className=" text-gray-700 text-lg leading-relaxed mb-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam quasi ullam facilis officiis a
      t animi placeat officia blanditiis! Magnam maiores quos voluptate laudantium ratione ipsam! Dolore mollitia atque saepe unde.
    </p>
  </div>

  {/* Toggle */}
  <div className="flex justify-center mb-4">
    <div className="inline-flex bg-gray-100 rounded-full shadow-inner p-1 transition-shadow">
      <button
        className={`px-6 py-2 rounded-full transition ease-in-out font-medium ${
          billingCycle === 'mois'
            ? 'bg-[var(--color-primary)] text-white'
            : 'text-[var(--color-primary)]'
        }`}
        onClick={() => setBillingCycle('mois')}
      >
        Mensuel
      </button>
      <button
        className={`transition-transform duration-300 px-6 py-2 rounded-full  font-medium ${
          billingCycle === 'annuel'
            ? 'bg-[var(--color-primary)] text-white'
            : 'text-[var(--color-primary)]'
        }`}
        onClick={() => setBillingCycle('annuel')}
      >
        Annuel
      </button>
    </div>
  </div>

  {/* Plans */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
    {plans.map((plan) => (
      <div
        key={plan.name}
        className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 w-[5cm] h-[8cm] mx-auto flex flex-col justify-between"
      >
        {/* Nom du plan */}
        <div className="mb-4">
          <span className="inline-block bg-[var(--color-primary)] text-white text-sm font-semibold px-3 py-1 rounded-full">
            {plan.name}
          </span>
        </div>

        {/* Prix */}
        <div>
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {billingCycle === 'mois' ? plan.mois : (plan.mois*12).toFixed(2)} Ar
          </p>
          <p className="text-sm text-gray-500 mb-4">Facturation {billingCycle}</p>
        </div>

        {/* Bouton */}
        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-full transition">
          Choisir
        </button>
      </div>
    ))}
  </div>
</section>

</span>


      {/* Contacts */}
     <span id = "contacts">
       <section id="contacts" className="pt-28 px-6 max-w-7xl mx-auto" data-aos="fade-up">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contacts</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam hic voluptatibus corrupti nobis itaque blanditiis voluptatem magnam deserunt exercitationem.
                 Nam quaerat quae ex minus nobis assumenda impedit perspiciatis nihil vitae.
              </p>

          </div>
          <div>
           
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <p className="text-[var(--color-primary)] font-bold text-lg mb-2">kosongoyeye@gmail.com</p>
                <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat doloremque, deserunt porro sunt magni incidunt aspernatur 
                  nam reiciendis facere perspiciatis maiores eveniet quas nostrum magnam, nobis, nesciunt nihil ipsam consectetur?</p>
              </div>
            
          </div>
        </div>
      </section>
     </span>

      {/* Bouton retour en haut */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[var(--color-primary-hover)] transition transform hover:scale-105"
        aria-label="Retour en haut">
        ↑ Haut
      </button>
    </>
  );
}