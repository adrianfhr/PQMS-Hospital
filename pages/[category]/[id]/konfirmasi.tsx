import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import router, { useRouter } from 'next/router';
import Navbar from '@src/components/Navigation/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Appointment } from '@src/components/Calendar/Calendar';
import Footer from '@src/components/Footer';
import { error } from 'console';
import { toast } from 'react-toastify';

const Konfirmasijanji = () => {

    const [userAppointment, setUserAppointment] = useState({} as Appointment);

    useEffect(() => {
        async function getUserAppointment() {
            const userAppointment = localStorage.getItem('userAppointment');
            if (userAppointment) {
                setUserAppointment(JSON.parse(userAppointment));
            }
        }
        getUserAppointment();
    }, [])

    console.log('userAppointment : ', userAppointment);

    const handleBuatJanjiTemu = () => {
        //get from local storage
        if (userAppointment) {
            const appointmentDatabase = {
                id_user: userAppointment.id_user,
                id_doctor: userAppointment.id_doctor,
                id_schedule: userAppointment.id_schedule,
                };
            if(supabase){
        
              const makeAppointment = async () => {
                try{
                  const { data, error } = await (supabase as NonNullable<typeof supabase>).from('appointment').insert([
                    appointmentDatabase
                  ]);
                  if(error){
                    throw error;
                  }
                  console.log('data : ', data);
                } catch (error) {
                  throw error;
              } 
            };
              
              
              toast.promise(
              makeAppointment(),
                {
                  pending: 'Loading',
                  success: {
                    render: () => {
                      router.push('/sukses');
                      return 'Berhasil membuat janji temu';
                    }
                  },
                  error: {
                    render: (error: any) => {
                      const errorMessage = error.message;
                      return errorMessage;
                    }
                  },
                }
              )
              

            }
        }else {
          // console.log('Gagal membuat janji temu : ', 'user, id_doctor, id_schedule tidak boleh kosong');
          toast.error('Gagal membuat janji temu : Pastikan Anda memilih tanggal dan jam yang tersedia');
        }
      }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>
      <div className="h-16">
        <div className="fixed w-screen z-[1000]">
          <Navbar/>
        </div>
      </div>

      <div className='px-4 font-poppins mt-4 font-semibold'>
      <div className='flex text-xs font-semibold'>
                    <Link href="/">
                        <div className='mr-1'>
                            Beranda
                        </div>
                    </Link>
                    <div className='mr-1'> &gt; </div>
                    <Link href="/spesialisasi">
                        <div className='mr-1'>
                            Spesialisasi
                        </div>
                    </Link>
                    <div className='mr-1'> &gt; </div>
                    <Link href="/dokter">
                        <div className='mr-1 text-light-blue'>
                            Buat Janji Temu
                        </div>
                    </Link>
                </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Buat Janji Temu
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Silahkan Konfirmasi Janji Temu Anda.
          </div>

          <div className='rounded-lg border-2 border-slate-300 shadow-xl flex flex-col px-6 py-4 text-dark-blue font-poppins mt-3 '>
            <div className='flex text-black font-medium font'>
              <Link href={`/${userAppointment.spesialisasi}/${userAppointment.id_doctor}/janjitemu`}>
                <div className='mr-1 rotate-180 '>&gt;</div>
              </Link>

              <div className='flex items-center text-xs font-semibold'>Konfirmasi Janji Temu</div>
            </div>

            <div className='flex my-3 '>
              <div className='mr-5'>
                <Image src="/images/contoh-dokter.png" alt="Contoh dokter" width={100} height={20}/>
              </div>

              <div>
                <div className='text-black'>
                  {userAppointment.name_doctor}
                </div>
                <div className='flex '>
                  <div className='flex items-start mr-2 mt-1 '>
                    <Image src="/images/stethoscope.png" alt="stetoskop" width={20} height={20}/>
                  </div>
                  <div className='text-sm font-medium text-black'>
                    {userAppointment.spesialisasi}
                  </div>
                </div>
              
              </div>
            </div>
            <div className='flex font-medium'>
              <div className='my-1 items-center mr-1 flex-shrink-0'>
                <Image src="/images/stethoscope.png" alt="gambar spesialisasi" width={15} height={20}/>
              </div>
              <div className='text-light-blue text-sm flex-shrink-0'>
                Spesialisasi :
              </div>
              <div className='text-sm ml-1 text-black font-thin'>
                {userAppointment.spesialisasi}
              </div>
            </div>

            <div className='flex font-medium'>
              <div className='my-1 mr-1'>
                <Image src="/images/clinical_notes.png" alt="gambar spesialisasi" width={15} height={20}/>
              </div>
              <div className='text-light-blue text-sm flex-shrink-0'>
                Nama Dokter :
              </div>
              <div className='text-sm ml-1 text-black'>
                {userAppointment.name_doctor}
              </div>
            </div>

            <div className='flex font-medium'>
              <div className='my-1 mr-1'>
                <Image src="/images/person.png" alt="gambar spesialisasi" width={15} height={20}/>
              </div>
              <div className='text-light-blue text-sm flex-shrink-0'>
                Nama Pasien :
              </div>
              <div className='text-sm ml-1 text-black'>
                {userAppointment.name_user}
              </div>
            </div>

            <div className='flex font-medium'>
              <div className='my-1 mr-1'>
                <Image src="/images/calendar.png" alt="gambar spesialisasi" width={15} height={20}/>
              </div>
              <div className='text-light-blue text-sm flex-shrink-0'>
                Jadwal :
              </div>
              <div className='text-sm ml-1 text-black'>
                {userAppointment.hour}
              </div>
            </div>

      
            

            <button onClick={()=>handleBuatJanjiTemu()} className='rounded-xl text-sm text-light-blue h-8 border border-light-blue shadow-lg mt-3 hover:bg-light-blue hover:text-white font-medium'>Konfirmasi</button>


          </div>




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

export default Konfirmasijanji;