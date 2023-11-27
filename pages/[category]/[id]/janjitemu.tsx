import Navbar from "@src/components/Navigation/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Calendar, {JadwalItem, Doctor, User} from "@src/components/Calendar/Calendar";
import { supabase } from "../../../supabase";
import { useRouter } from "next/router";
import Footer from "@src/components/Footer";

const JanjiTemu: React.FC = () => {

  const [schedule, setSchedule] = React.useState([] as JadwalItem[]);
  const  [user, setUser] = React.useState({} as User);
  const [doctor, setDoctor] = React.useState({} as Doctor);
  const router = useRouter();
  const doctorId = router.query.id ? (typeof router.query.id === 'string' ? parseInt(router.query.id, 10) : parseInt(router.query.id[0], 10)) : 0;



  useEffect(() => {
    async function getSchedule(id : number  ) {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).from('doctor_schedule').select('*').eq('id_doctor', id );
      if (error) {
        console.error('Gagal mendapatkan data schedule:', error.message);
      }else {
        const formattedSchedule: JadwalItem[] = data.map((item: any) => ({
          id: item.id,
          id_doctor: item.id_doctor,
          tanggal: new Date(item.date),
          jamMulai: Number(item.time_start),
          jamSelesai: Number(item.time_end),
          selected: false
        }));
        setSchedule(formattedSchedule);
      }
    }

    async function getDoctor() {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).from('doctors').select('*').eq('id', doctorId);
      if (error) {
        console.error('Gagal mendapatkan data dokter:', error.message);
      }else if(data && data.length > 0){
        console.log('data : ', data);
        const formattedDoctor: Doctor = {
          id : data[0].id,
          name : data[0].name,
          spesialisasi : data[0].spesialisasi,
        };
        setDoctor(formattedDoctor);
      }
    }

    async function checkSession() {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.getSession();
      if (data.session) {
        console.log('session : ', data.session);
      }
    }
    //get user from local storage
    async function getUser() {
      const user = await localStorage.getItem('user');
      if(user){
        console.log('user : ', JSON.parse(user).id);
        console.log('user : ', JSON.parse(user).full_name)
        setUser({
          id : JSON.parse(user).id,
          name : JSON.parse(user).full_name
        });
      }
    }

    async function fetchData() {
      await getUser();
      // operasi lain yang memerlukan data user
      checkSession();
      getSchedule(doctorId);
      getDoctor();
    }
    fetchData();
  }, [doctorId]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
      <div className="h-16">
        <div className="fixed w-screen">
          <Navbar />
        </div>
      </div>

      <div className="px-4 font-poppins mt-4 font-semibold">
      <div className='flex text-xs'>
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
                            Daftar Dokter Spesialis
                        </div>
                    </Link>
                </div>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Buat Janji Temu
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Segera Buat Janji Temu.
          </div>
        <div className='rounded-lg border-2 border-slate-200 shadow-md flex flex-col px-6 py-4 text-dark-blue font-poppins mt-3'>
                        <div className="flex">
                            <div className="">
                                <div className="">
                                    <Image src="/images/contoh-dokter.png" width={75} height={75} alt="dokter" />
                                </div>
                            </div>

                            <div className="text-black text-sm pl-5">
                                <div className="">
                                    {doctor.name}
                                </div>

                                <div className="flex text-xs font-medium mt-2">
                                    <div>
                                        <Image src="/images/stethoscope.png" width={16} height={2} alt="lihat profil" />
                                    </div>
                                    <div className="ml-1">
                                        {doctor.spesialisasi}
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
        <div className="p-4 border-2 border-slate-200 rounded-lg shadow-md mt-4 ">
          <Calendar today={new Date('2023-11-20')} jadwal={schedule} user={user} doctor={doctor}/>
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

export default JanjiTemu;