import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';
import Navbar from '@src/components/Navigation/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@src/components/Footer';
import App from 'next/app';
import Appointment from '@src/components/Appointment/Appointment';

interface UserAppointmentStatus {
  id: number;
  doctor_name: string;
  spesialisasi: string;
  jumlah_belum_selesai: number;
  jumlah_telah_selesai: number;
  jumlah_total: number;
  status: boolean;
  tanggal: string; // Sesuaikan dengan tipe data tanggal yang diharapkan
  jam_mulai: number;
  jam_selesai: number;
}


const Cekjanji = () => {

  const today = useMemo(() => new Date(), []);
  const router = useRouter();
  const [userData, setUserData] = useState(null as any);
  const [todayQueue, setTodayQueue] = useState([] as UserAppointmentStatus[]);
  const [monthQueue, setMonthQueue] = useState([] as UserAppointmentStatus[]);

  useEffect(() => {
    async function getUser(){
      const data = await localStorage.getItem('user');
      if(data){
        setUserData(JSON.parse(data));
      }
    } 

    async function getQueue(){
      const user = await localStorage.getItem('user');
      //refresh database
      
      if(user){

        const userTemp = JSON.parse(user);
        console.log('userTemp : ', userTemp);        
        const { data, error } = await (supabase as NonNullable<typeof supabase>).rpc('get_user_appointment_status_by_id_user', {
          p_id_user: userTemp.id
        })
        if (error) {
          console.error(error);
        } else {
          console.log('data : ', data);
          setTodayQueue(data.filter((item : UserAppointmentStatus) => {
            const date = new Date(item.tanggal);
            return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
          }));

          setMonthQueue(data.filter((item : UserAppointmentStatus) => {
            const date = new Date(item.tanggal);
            return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
          }));
        }
      }
    }

    async function fetchData(){
      await getUser();
      getQueue();
    }
    fetchData();
    console.log('todayQueue : ', todayQueue);
    console.log('monthQueue : ', monthQueue);

  }, [monthQueue, router, today, todayQueue])

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>
      <div className="h-16">
        <div className="fixed w-screen z-[1000]">
          <Navbar/>
        </div>
      </div>

      <div className='px-4 font-poppins mt-4 font-semibold'>
      <div className='flex text-xs'>
            <Link href="/">
              <div className='mr-1'>Beranda</div>
            </Link>
            <div className='mr-1'> &gt; </div>
            <Link href="/cekjanji">
              <div className='mr-1 text-light-blue'>Cek Janji Temu</div>
            </Link>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Cek Janji Temu
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Tandai Kalendar Anda!
          </div>
          <div className='rounded-lg border-[1px] border-slate-500 flex flex-col font-poppins mt-3 '>
            <div className='flex border-b-[1px] border-slate-500 py-3'>
              <div className='text-xs px-4'>Hari Ini</div>
            </div>
            <div className=' '>
              {todayQueue.length === 0 ? (
                <div className='text-center text-xs font-normal py-2'>
                  Tidak ada jadwal hari ini
                </div>
              ) : (
                todayQueue.map((item : UserAppointmentStatus) => {
                  const date = new Date(item.tanggal);
                  return (
                    <Appointment key={item.id} tanggal={date} doctor_name={item.doctor_name} spesialisasi={item.spesialisasi} jam_mulai={item.jam_mulai} jam_selesai={item.jam_selesai}/>
                  )
                })
              )}
            </div>
          </div>

          <div className='rounded-lg border-[1px] border-slate-500 flex flex-col font-poppins mt-3 '>
            <div className='flex border-b-[1px] border-slate-500 py-3'>
              <div className='text-xs px-4'>Bulan Ini</div>
            </div>
{/* 
            <Appointment tanggal={today} doctor_name={'Aduh '} spesialisasi={'Anak'} jam_mulai={0} jam_selesai={0}/> */}
            { monthQueue.length === 0 ? (
              <div className='px-4 py-2 text-center text-xs font-normal'>
                Tidak ada jadwal bulan ini
              </div>
            ) : (
              monthQueue.map((item : UserAppointmentStatus) => {
                const date = new Date(item.tanggal);
                return (
                  <Appointment key={item.id} tanggal={date} doctor_name={item.doctor_name} spesialisasi={item.spesialisasi} jam_mulai={item.jam_mulai} jam_selesai={item.jam_selesai}/>
                )
              })
            )}
          </div>
      </div> 
      </div>
      <div className=' h-32 bg-white'/>
            <div className=' bottom-0 w-full '>
              <Footer/>
        </div>
    </div>
  );
}

export default Cekjanji;