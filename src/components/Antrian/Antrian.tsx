import React, { useState } from 'react';
import Image from 'next/image';

interface AntrianProps {
    name_doctor: string;
    spesialisasi: string;
    status: boolean;
    antrianselesai: string;
    antriankeseluruhan: string;
}

const Antrian: React.FC<AntrianProps> = ({name_doctor, spesialisasi, status, antrianselesai, antriankeseluruhan}) => {
    return (
        <div className='rounded-lg shadow-lg flex justify-between px-4 my-4'>
            <div className='text-xs my-2 '>
                <div className='mb-1 text-sm'>
                    {name_doctor}
                </div>
                <div className='flex'>
                    <div className='mr-1'> 
                        <Image src="/images/stethoscope.png" alt="stetoskop" width={15} height={20}/>
                    </div>
                    <div className='mb-1 font-semibold'>
                        {spesialisasi}
                    </div>
                </div>
                <div className='flex '>
                    <div className='flex mr-1'>
                        <Image src={status ? "/images/sudah-dimulai.png" : "/images/belum-dimulai.png"} alt="gambar search" width={15} height={30}/>
                    </div>
                    <div className='font-light'>
                        {status ? "Sudah Dimulai" : "Belum Dimulai"}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center text-sm'>
                {antrianselesai}/{antriankeseluruhan}
            </div>
        </div>
    );
}

export default Antrian;
