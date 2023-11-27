import React, { useState } from 'react';
import Router from 'next/router';
import Modal from 'react-modal'
import { toast } from 'react-toastify';

export interface JadwalItem {
  id: number;
  id_doctor: number;
  tanggal: Date;
  jamMulai: number;
  jamSelesai: number;
  selected: boolean;
}

export interface Doctor {
  id : number;
  name : string;
  spesialisasi : string;
}

export interface User {
  id : number;
  name : string;
}

interface KalenderProps {
  today: Date;
  jadwal: JadwalItem[];
  user: User;
  doctor: Doctor;
}

export interface Appointment {
    isConfirmed: boolean;
    id_doctor: number;
    name_doctor: string;
    spesialisasi: string;
    id_user: number;
    name_user: string;
    id_schedule: number;
    hour: string;
}

const Kalender: React.FC<KalenderProps> = ({ today, jadwal, user, doctor }) => {
  const router = Router;   
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // Menyimpan state bulan saat ini
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // Menyimpan state tahun saat ini
  const [selectedHour, setSelectedHour] = useState({
    hour : '',
    clicked : false,
    available : false
  }); // Menyimpan state tanggal dan jam yang dipilih
  const [userAppointment, setUserAppointment] = useState({
    isConfirmed: false,
    id_doctor: 0,
    name_doctor: '',
    spesialisasi: '',
    id_user: 0,
    name_user: '',
    id_schedule: 0,
  } as Appointment); // Menyimpan state data appointment

  const renderTanggal = () => {
    
    const dates = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    // Push empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(
        <div key={`empty${i}`} className="w-full flex justify-center my-2">
          <div className="w-6 h-6 flex justify-center">
            <div className="text-xs text-center text-slate-400">{''}</div>
          </div>
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const jadwalAvailable = jadwal.find((item) => {
        const itemDate = new Date(item.tanggal);
        return itemDate.getDate() === i && itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear && itemDate >= today;
      });

      if (jadwalAvailable) {
        dates.push(
          <div key={i} className="w-full flex justify-center my-2">
            <div key={i} className="w-6 h-6 flex justify-center">
              <button
                className= {`w-full text-xs font-light rounded-full hover:bg-light-blue hover:text-white ${jadwalAvailable.selected ? 'bg-light-blue text-white' : ''}`}
                onClick={() => handleDateClick(jadwalAvailable)}
              >
                {i}
              </button>
            </div>
          </div>
        );
      } else {
        dates.push(
          <div key={i} className="w-full flex justify-center my-2 z-[-999]">
            <div key={i} className="w-6 h-6 flex justify-center">
              <button
                className="w-full text-xs font-light rounded-full text-slate-400  opacity-50 cursor-not-allowed "
                disabled
              >
                {i}
              </button>
            </div>
          </div>
        );
      }
    }

    return dates;
  };

  const handleBuatJanjiTemu = () => {
    if(user.id && user.name ){
      if (userAppointment.id_doctor !== 0 && userAppointment.id_schedule !== 0 && userAppointment.hour !== '' && userAppointment.name_doctor !== '' && userAppointment.spesialisasi !== '' && userAppointment.name_user !== '' && selectedHour.clicked) {
        //store data to local storage
        localStorage.setItem('userAppointment', JSON.stringify(userAppointment));
        //redirect to konfirmasi page in [id]
        router.push(`/${userAppointment.spesialisasi}/${userAppointment.id_doctor}/konfirmasi`);
      }else {
        console.log('Gagal membuat janji temu : ', 'user, id_doctor, id_schedule tidak boleh kosong');
        toast.error('Gagal membuat janji temu : Pastikan Anda memilih tanggal dan jam yang tersedia');
      }
    }else{
      setShowModal(true)
    }

  }

  const handlePergantianBulan = (increment: number) => {
    const newMonth = currentMonth + increment;
    setSelectedHour({
        hour : ``,
        clicked : false,
        available : false
      });
      // set all jadwal.selected to false
        jadwal.forEach((item) => {
            item.selected = false;
        });
    
    if (newMonth >= 0 && newMonth <= 11) {
      setCurrentMonth(newMonth);
      if (newMonth === 12) {
        setCurrentYear(currentYear + 1);
      } else if (newMonth === -1) {
        setCurrentYear(currentYear - 1);
      }
    }
  };

  const handleHourClick = () => {   
   if (selectedHour.clicked) {
    setSelectedHour({
        hour : selectedHour.hour,
        clicked : false,
        available : true
      });
    }
    else {
        setSelectedHour({
            hour : selectedHour.hour,
            clicked : true,
            available : true
          });
    }
    console.log('selectedDateHour : ', selectedHour);
  }

  const getNamaBulan = (bulan: number) => {
    const namaBulanInggris = new Date(2023, bulan, 1).toLocaleString('default', { month: 'long' });
    // Ubah nama bulan dalam bahasa Inggris menjadi bahasa Indonesia
    switch (namaBulanInggris) {
      case 'January':
        return 'Januari';
      case 'February':
        return 'Februari';
      case 'March':
        return 'Maret';
      case 'April':
        return 'April';
      case 'May':
        return 'Mei';
      case 'June':
        return 'Juni';
      case 'July':
        return 'Juli';
      case 'August':
        return 'Agustus';
      case 'September':
        return 'September';
      case 'October':
        return 'Oktober';
      case 'November':
        return 'November';
      case 'December':
        return 'Desember';
      default:
        return '';
    }
  };

  const handleDateClick = (jadwalAvailable: JadwalItem) => {
    if (!jadwalAvailable.selected) {
      setSelectedHour({
        hour: `${jadwalAvailable.jamMulai} : 00 - ${jadwalAvailable.jamSelesai} : 00`,
        clicked: false,
        available: true,
      });

      setUserAppointment({
        isConfirmed: true,
        id_doctor: jadwalAvailable.id_doctor,
        name_doctor: doctor.name,
        spesialisasi: doctor.spesialisasi,
        id_user: user.id,
        name_user: user.name,
        id_schedule: jadwalAvailable.id,
        hour: `${jadwalAvailable.jamMulai} : 00 - ${jadwalAvailable.jamSelesai} : 00`,
      });

    } else {
      setSelectedHour({
        hour: '',
        clicked: false, 
        available: false,
      });

      setUserAppointment({
        isConfirmed: false,
        id_doctor: 0,
        name_doctor: '',
        spesialisasi: '',
        id_user: 0,
        name_user: '',
        id_schedule: 0,
        hour: '',
      });
    }
    
    for (let i = 0; i < jadwal.length; i++) {
      if (jadwal[i].id === jadwalAvailable.id) {
        jadwal[i].selected = !jadwal[i].selected;
      } else {
        jadwal[i].selected = false;
      }
    }
  
    return true;
  };
  

  const daysInIndonesian = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
  console.log('userAppointment : ', userAppointment);
  return (
    <div>
      <h2 className="text-sm font-medium mb-4 text-slate-400">Pilih Tanggal</h2>
      <div className="flex justify-between items-center my-4">
        <button className='text-slate-400 px-4 text-xl' onClick={() => handlePergantianBulan(-1)}>&lt;</button>
        <h2 className="h-full font-medium ">{getNamaBulan(currentMonth)} {currentYear}</h2>
        <button className='text-slate-400 px-4 text-xl' onClick={() => handlePergantianBulan(1)}>&gt;</button>
      </div>
      <div className='grid grid-cols-7 gap-4 mb-5 text-light-blue'>
        {daysInIndonesian.map((day, index) => (
          <div key={index} className='text-xs text-center'>{day}</div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-4 '>
        {renderTanggal()}
      </div>
      {selectedHour.available && (
        <div>
          <h2 className='text-sm text-slate-400 font-normal mb-2 mt-4'>Pilih Jam</h2>
          <button onClick={()=>handleHourClick()} className={`py-1 px-4 border-light-blue border-[1px] rounded-xl mr-2 my-2 font-normal hover:bg-light-blue hover:text-white text-sm ${selectedHour.clicked ? 'bg-light-blue text-white' : ''}`} >
            {selectedHour.hour}
          </button>
        </div>
      )}
      <button onClick={()=>handleBuatJanjiTemu()} className='border-[1px] border-light-blue rounded-xl w-full py-2 my-2 text-light-blue text-sm font-medium hover:text-white hover:bg-light-blue'> Lanjut</button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        //ukurannya disesuaikan dengan ukuran konten
        contentLabel="Peringatan"
        className="text-white h-full w-full flex justify-center items-center"
      >
        <div className=" bg-dark-blue p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Peringatan</h2>
          <p>Anda belum login, silahkan login terlebih dahulu.</p>
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2 bg-light-blue text-white rounded-md hover:bg-opacity-80"
              onClick={() => {
                setShowModal(false);
                //save redirect to local storage
                // Store the redirect URL without additional characters
                localStorage.setItem('redirect', router.asPath)
                router.push('/auth/login');
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Kalender;
