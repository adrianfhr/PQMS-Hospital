import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { supabase } from '../../../supabase';
import Image from 'next/image';

import NavItem from "@src/components/Navigation/NavItem";

import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const [sessionState, setSessionState] = useState(null as any);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.getSession();
      if (error) {
        console.error(error);
        setSessionState(null);
      } else if (data.session) {
        setSessionState(data);
      }
    }
    checkSession();
  }, []);

  const navItemsData = [
    {
      text: 'Beranda',
      destination: '/'
    },
    {
      text: 'Spesialisasi',
      destination: '/spesialisasi'
    },
    {
      text: 'Cek Janji Temu',
      destination: '/cekjanji'
    },
    {
      text: 'Live Antrian',
      destination: '/liveantrian'
    },
    {
      text: 'Beri Masukan',
      destination: '/feedback'
    },

  ];

  // Toggle Navbar
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      console.log(sessionState);
    } else {
      setIsOpen(true);
    }
  };

const handleLogout = async () => {
  handleOpen();
  async function logout(){
    await (supabase as NonNullable<typeof supabase>).auth.signOut();
    localStorage.removeItem('user');
    setSessionState(null);
    setIsOpen(false);
    router.push('/');
  }
  try {
    toast.promise(
  (logout() as Promise<any>), 
  {
    pending: 'Sedang logout...',
    success: 'Berhasil logout',
    error: 'Gagal logout',
  }
);

  } catch (error) {
    console.error('Gagal logout:', error);
    toast.error('Gagal logout');  }
};

  return (
    <>
      {/* Navbar Mobile */}
      <nav className="bg-dark-blue w-full flex justify-between items-center px-3 py-3 fixed z-[1000]">
              <Link href='/'>
                  <Image src="/images/logo-pqms.png" width={140} height={40} alt="logo pqms" />
              </Link>
          <div className='w-full flex justify-end my-2'>
            <div
              className={`${
                isOpen ? '' : ''
              } right-0 top-0 z-50 flex flex-col w-10 h-6 justify-between cursor-pointer `}
              onClick={handleOpen
              }>
              <span
                className={`h-1 w-6 bg-white rounded-lg transform transition duration-300 ease-in-out ${
                  isOpen ? 'w-7 bg-white rotate-45 translate-y-2.5' : ''
                }`}
              />
              <span
                className={`h-1 w-6 bg-white rounded-lg transition-all duration-300 ease-in-out ${
                  isOpen ? 'h-0 w-0 hidden' : 'w-6'
                }`}
              />
              <span
                className={`h-1 w-6 bg-white rounded-lg transform transition duration-300 ease-in-out ${
                  isOpen ? 'w-7 bg-white -rotate-45 -translate-y-2.5' : ''
                }`}
              />
            </div>
          </div>
          
        </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="w-screen h-screen bg-dark-blue z-50"
          >
            <div className='flex flex-col justify-center h-full'>
              {/* Daftar Item Navigasi */}
              {navItemsData.map((navItem) => (
                <div key={navItem.text} onClick={handleOpen}>
                  <NavItem text={navItem.text} destination={navItem.destination} />
                </div>
              ))}

              {/* Opsi Login/Logout */}
              {sessionState ? (
                        <div>
                           <NavItem text={"Profil"} destination={"/user"} />
                          <div className="flex items-center">
                          <button className="hover:bg-slate-500 hover:text-white transition-all w-full flex items-center "onClick={handleLogout}>
                              <div
                                  className="pl-10 py-3 text-white text-[18px] font-semibold cursor-pointer font-poppins"
                                  
                                  > 
                                  Logout
                              </div>
                              <div className="w-[18px] h-[18px] ml-2">
                                  <Image src="/images/logo-logout.png" alt="logo login" width={18} height={18} />
                              </div>
                          </button>
                          </div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                        <div className="hover:bg-slate-500 hover:text-white transition-all w-full flex items-center">
                            <Link href="/auth/login" className="flex items-center w-full" onClick={handleOpen}>
                            <div className='flex h-full w-full'>
                              <div className="pl-10 py-3 text-white text-[18px] font-semibold cursor-pointer font-poppins">
                                  Login
                              </div>
                              <div className='h-full w-f my-auto ml-2'>
                                  <Image src="/images/logo-login.png" alt="logo login" width={18} height={18} />
                              </div>
                            </div>
  
                            </Link>
                        </div>
                        </div>
                    )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <div className={`${isOpen ? 'hidden' : 'fixed'} flex justify-end bottom-4 right-0`}>
          <Image src="/images/gambar-emergency.png" alt="gambar-emergency" width={180} height={180}/>
      </div> */}
    </>
  );
}

export default Navbar;
