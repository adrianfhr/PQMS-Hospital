import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';
import Navbar from '@src/components/Navigation/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Antrian from '@src/components/Antrian/Antrian';
import Footer from '@src/components/Footer';

const Liveantrian: React.FC = () => {

  const [selectedSubspesialisasi,setSelectedSubspesialisasi] = useState('');
  const [spesialisasi,setSpesialisasi]=useState([
    {
      spesialisasi : selectedSubspesialisasi || "Cari Berdasarkan Spesialisasi",
      visible : false,
      subspesialisasi:[
        {nama : "Anak"},
        {nama : "Bedah"},
        {nama : "Paru & Pernafasan"},
        {nama : "Kebidanan & Kandungan"},
        {nama : "Penyakit Dalam"}
      ]
    }
  ])

  function makeVisible(index: number) {
    const updatedSpesialisasi = [...spesialisasi];
    updatedSpesialisasi[index].visible = !updatedSpesialisasi[index].visible;
    setSpesialisasi(updatedSpesialisasi);
    setSelectedSubspesialisasi('');
  }

  function handleSubspesialisasiClick(subitem: { nama: string }) {
    const updatedSpesialisasi = [...spesialisasi];
    updatedSpesialisasi[0].spesialisasi = subitem.nama;
    updatedSpesialisasi[0].visible = false;
    setSpesialisasi(updatedSpesialisasi);
    setSelectedSubspesialisasi(subitem.nama);
  }

  const [doctorQueue, setDoctorQueue] = useState([] as any);

  const handleSearch = async () => {
    const { data, error } = await (supabase as NonNullable<typeof supabase>)
    .rpc('get_doctor_appointments_by_specialization', {
      p_spesialisasi: selectedSubspesialisasi // Isi nilai sesuai dengan spesialisasi yang diinginkan
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      setDoctorQueue(data);
    }
  } 

  return (
    <div className='flex flex-col min-h-screen'>
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
            <Link href="/liveantrian">
              <div className='mr-1 text-light-blue'>Cek Live Antrian</div>
            </Link>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Live Antrian
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Lihat Antrian Hari Ini!
          </div>

          
            <div className='rounded-lg border-[1px] shadow-md border-slate-500'>
              <div className='flex justify-center items-center border-b-[1px] border-slate-500 py-2'>
                Live Antrian
              </div>
              
              <div className='px-4 text-xs font-thin py-3'>
                <div className='text-sm'>
                  Pilih Spesialisasi :
                </div>  
              </div>
              {spesialisasi.map((item, index) => (
                <div className='' key={item.spesialisasi}>
                <div className={`flex justify-between mx-4 px-1 border-[1px] border-slate-500 rounded-lg text-sm text-gray-400 font-light`}>
                    <div className={`flex items-center ml-2 ${selectedSubspesialisasi === item.spesialisasi ? 'text-black' : ''}`}>{item.spesialisasi}</div>
                    <div>
                        <button onClick={() => makeVisible(index)} className={`text-light-blue px-4 py-2 ${item.visible? 'transform -rotate-90' : 'transform rotate-90'} transition-all ease-in-out duration-500`}>
                        &gt;
                        </button>
                    </div>
                </div>

                <div className={`${item.visible? 'border-[1px] border-slate-500 rounded-lg mt-2' : ' border-0'} px-4 mx-4 font-light text-xs`}>

                {item.visible && item.subspesialisasi.map((subitem, subindex) => (
                  
                        <div key={subitem.nama} className={`hover:text-light-blue transition-all text-sm my-2 w-full ${
                    selectedSubspesialisasi === subitem.nama ? 'font-semibold' : ''
                  }`} onClick={() => handleSubspesialisasiClick(subitem)}>
                            {subitem.nama}
                        </div>
          
                ))}
                </div>
            </div>
            ))}
            <div className='px-4'>
              <button onClick={handleSearch} className='rounded-xl text-light-blue font-medium text-sm my-4 w-full  h-8 border-[1px] border-light-blue shadow-lg  hover:bg-light-blue hover:text-white'>Cari</button>
            </div>
          </div>
            

            <div className='mt-3 '>
{/*               
              <Antrian name_doctor='Dr. MM. Tri Sp.A (K)' spesialisasi='Tumbuh Kembang Anak' status={true} antriankeseluruhan='20' antrianselesai='5' /> */}
              {doctorQueue.map((item: any) => (
                <Antrian key={item.id} name_doctor={item.doctor_name} spesialisasi={item.spesialisasi} status={item.status} antriankeseluruhan={item.jumlah_total} antrianselesai={item.jumlah_telah_selesai} />
              ))}

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

export default Liveantrian;