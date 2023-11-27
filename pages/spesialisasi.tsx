import React, { useState } from 'react';
import Navbar from '@src/components/Navigation/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@src/components/Footer';


const Spesialisasi: React.FC = () => {
    const [spesialisasi, setSpesialisasi] = useState([
        {
            spesialisasi : "Anak",
            visible: false,
            subspesisalisasi : [
                {
                    nama : "Anak - Konsultan Inspeksi Penyakit Tropis",
                    image : "/images/spesialisasi/anak-1.png"
                },
                {
                    nama : "Anak - Tumbuh Kembang Anak",
                    image : "/images/spesialisasi/anak-2.png"
                }
            ]
        },
        {
            spesialisasi : "Bedah",
            visible: false,
            subspesisalisasi : [
                {
                    nama : "Bedah - Spine",
                    image : "/images/spesialisasi/bedah-2.png"
                },
                {
                    nama : "Bedah - Hip & Knee",
                    image : "/images/spesialisasi/bedah-1.png"
                },
                {
                    nama : "Bedah - Foot & Ankle",
                    image : "/images/spesialisasi/bedah-3.png"
                }
            ]
        },
        {
            spesialisasi : "Paru",
            visible: false,
            subspesisalisasi : [
                {
                    nama : "Paru & Pernapasan - Onkologi toraks",
                    image : "/images/spesialisasi/paru-1.png"
                }
            ]
        },
        {
            spesialisasi : "Kebidanan",
            visible: false,
            subspesisalisasi : [
                {
                    nama : "Kebidangan & Kandungan - Uroginekologi",
                    image : "/images/spesialisasi/kebidanan-1.png"
                },
                {
                    nama : "Kebidangan & Kandungan - Fetomaternal",
                    image : "/images/spesialisasi/kebidanan-2.png"
                }
            ]
        },
        {
            spesialisasi : "Penyakit Dalam",
            visible: false,
            subspesisalisasi : [
                {
                    nama : "Penyakit Dalam - Geriatri",
                    image : "/images/spesialisasi/pd-1.png"
                },
                {
                    nama : "Penyakit Dalam - Ginjal & Hipertensi",
                    image : "/images/spesialisasi/pd-2.png"
                },
                {
                    nama : "Penyakit Dalam - Tropik Inspeksi",
                    image : "/images/spesialisasi/pd-3.png"
                },
                {
                    nama : "Penyakit Dalam - Diabetes",
                    image : "/images/spesialisasi/pd-4.png"
                }
              ]
        }      
    ])

    function makeVisible(index: number) {
        const updatedSpesialisasi = [...spesialisasi];
        updatedSpesialisasi[index].visible = !updatedSpesialisasi[index].visible;
        setSpesialisasi(updatedSpesialisasi);
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
              <div className='mr-1'>Beranda</div>
            </Link>
            <div className='mr-1'> &gt; </div>
            <Link href="/auth/spesialisasi">
              <div className='mr-1 text-light-blue'>Spesialisasi</div>
            </Link>
          </div>


          <div className='font-bold text-dark-blue text-[25px]'>
            Spesialisasi
          </div>
          <div className=' text-dark-blue mb-4'>
            Subspesialis Kami.
          </div>

            <div className='rounded-lg border-2 border-slate-300 shadow-md flex flex-col px-6 py-4 text-black text-sm font-poppins mt-3'>
            {spesialisasi.map((item, index) => (
            <div className='' key={item.spesialisasi}>
                <div className={`flex justify-between ${item.visible? 'border-b-0' : ' border-b-2'} border-slate-300`}>
                    <div className='flex items-center'>{item.spesialisasi}</div>
                    <div>
                        <button onClick={() => makeVisible(index)} className={`text-light-blue px-4 py-2 ${item.visible? 'transform -rotate-90 text-slate-500' : 'transform rotate-90'} transition-all ease-in-out duration-500`}>
                        &gt;
                        </button>
                    </div>
                </div>
                <div className=' justify-items-center grid-cols-2 grid gap-4 px-4 '>
                {item.visible && item.subspesisalisasi.map((subitem, subindex) => (
                    <Link href={`/${subitem.nama}/dokter`} key={subitem.nama}>
                        <div key={subitem.nama} className='hover:bg-slate-300 hover:text-white hover:rounded-xl transition-all border-2 rounded-xl border-slate-300'>
                            <Image src={subitem.image} width={130} height={120} alt={`spesialisasi ${item.spesialisasi} ${subindex + 1}`} />
                        </div>
                    </Link>
                ))}
                </div>
            </div>
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

export default Spesialisasi;