import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';
import Navbar from "@src/components/Navigation/Navbar";
import Image from "next/image";
import Footer from '@src/components/Footer';


const Landing: React.FC = () => {
  const [sessionState, setSessionState] = useState(null as any);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('userAppointment');
  }, [router]);
    return (
        <div className="min-h-screen flex flex-col">
          <div className='flex-grow mb-24'>
            <div className="h-16">
                <div className="fixed w-screen">
                    <Navbar/>
                </div>
            </div>
            <div className='bg-cover bg-landing-page bg-no-repeat w-screen h-[300px] sm:h-[560px]' />
            <div className='flex justify-center'>
              <div className='mt-6'>
                <div className="bg-white">
                    <div className="text-light-blue text-[20px] font-bold font-poppins flex justify-center tracking-wider">
                        PERCAYA PADA
                    </div>
                    <div className="text-dark-blue text-[25px] flex justify-center font-yesavan font-bold">
                        LAYANAN KAMI
                    </div>
                </div>
                <div className='h-full flex-col justify-center flex '>
                  <div className='w-[330px] h-[210px]  grid grid-cols-2 gap-6'>
                      <Link href='/spesialisasi'>
                          <div className='p-2 rounded-lg flex justify-center items-center text-white font-poppins bg-dark-blue'>
                              <div className='mt-3'>
                                <div className='text-2xl flex justify-center'>
                                  <Image src="/images/logo-spesialisasi.png" alt="doctor" width={30} height={30}/>
                                </div>
                                <div className='my-2'>
                                  Spesialisasi
                                </div>
                              </div>
                          </div>
                      </Link>
                      <Link href='/cekjanji'>
                          <div className='p-2 rounded-lg flex justify-center items-center text-white font-poppins bg-dark-blue'>
                              <div className='mt-3'>
                                <div className='text-2xl flex justify-center'>
                                  <Image src="/images/logo-cekjanjitemu.png" alt="doctor" width={30} height={30}/>
                                </div>
                                <div className='my-2'>
                                  Cek Janji Temu
                                </div>
                              </div>
                          </div>
                      </Link>
                      <Link href='/liveantrian'>
                          <div className='p-2 rounded-lg flex justify-center items-center text-white font-poppins bg-dark-blue mt-2'>
                              <div className='mt-3'>
                                <div className='text-2xl flex justify-center'>
                                  <Image src="/images/logo-liveantrian.png" alt="doctor" width={35} height={35}/>
                                </div>
                                <div className='my-2'>
                                  Live Antrian
                                </div>
                              </div>
                          </div>
                      </Link>
                      <Link href='/feedback'>
                          <div className='p-2 rounded-lg flex justify-center items-center text-white font-poppins bg-dark-blue mt-2'>
                              <div className='mt-3'>
                                <div className='text-2xl flex justify-center '>
                                  <Image src="/images/logo-feedback.png" alt="doctor" width={30} height={30} style={{color : 'white'}}/>
                                </div>
                                <div className='my-2'>
                                  Beri Masukan
                                </div>
                              </div>
                          </div>
                      </Link>
                  </div>
                </div>
                </div>
                {/* space untuk emergency  */}
              </div>
            </div>
            <div>

        <div className=' h-32 bg-white'></div>
            <div className=' bottom-0 w-full '>
              <Footer/>
            </div>
        </div>
    </div>
  );
}

export default Landing;