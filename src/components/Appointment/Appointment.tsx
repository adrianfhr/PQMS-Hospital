import {useState} from 'react';
import Image from 'next/image';

interface AppointmentProps {
    tanggal : Date;
    doctor_name : string;
    spesialisasi : string;
    jam_mulai : number
    jam_selesai : number;
}

const Appointment: React.FC<AppointmentProps> = ({tanggal, doctor_name, spesialisasi, jam_mulai, jam_selesai}) => {
    const hari = getDayName(tanggal.getDay());

    function getDayName(day : number) {
        const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
        return days[day];       
    }

    const tanggalan = tanggal.getDate();

    return (
        <div className='flex  items-center my-2 px-4 rounded-lg'>
                <div className='flex flex-col items-center px-6 mr-1 w-8'>
                  <div className='font-light text-xs '>{hari}</div>
                  <div>{tanggalan}</div>
                </div>
                <div className='flex my-2 px-4 py-2 rounded-lg bg-light-blue bg-opacity-25 w-full'>
                    <div>
                      <div className='text-xs'>
                        {doctor_name}
                      </div>
                      <div className='flex'>
                        <div className='flex items-center mr-2'>
                          <Image src="/images/stethoscope.png" alt="stetoskop" width={15} height={20}/>
                        </div>
                        <div className='text-xs font-light'>
                          {spesialisasi}
                        </div>
                      </div>
                      <div className='text-xs font-light'>
                            {jam_mulai+' : 00'} - {jam_selesai+' : 00'}
                      </div>
                    </div>
                </div>
            </div>
    );
}

export default Appointment;