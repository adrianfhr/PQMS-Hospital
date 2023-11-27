import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/router';
import Navbar from '@src/components/Navigation/Navbar';
import Image from 'next/image';
import Link from 'next/link';

const User = () => {
  {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();
  
    useEffect(() => {
      async function checkSession() {
        const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.getSession();
        if (!data.session) {
          // router.push('/'); // Redirect pengguna ke halaman utama jika sudah masuk
          console.log("data : ", data);
        }
      }
      checkSession();
    }, []);
  
    const handleFinishRegistration = async () => {
      // Menambahkan data pengguna ke profil
      const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.getUser();
      if (error) {
        console.error('Gagal mendapatkan data pengguna:', error.message);
      }else {
          console.log('Berhasil mendapatkan data pengguna:', data);
  
          try {
            const { data: profileData, error: profileError } = await (supabase as NonNullable<typeof supabase>)
              .from('profiles')
              .update({
                full_name: fullName,
                email: email,
                phone_number: phoneNumber,
                updated_at: new Date()
              }).eq('id', data.user.id)
  
            if (profileError) {
              console.error("profileError : ", profileError);
            }else {
              router.push("/");
            }
      
          } catch (profileError) {
            console.error("profileError : ", profileError);
            console.log("data : ", data);
          }
      }
  
      
    };
  
    const handleLogout = async () => {
      const { error } = await (supabase as NonNullable<typeof supabase>).auth.signOut();
      if (error) {
        console.error('Gagal logout:', error.message);
      } else {
        // Redirect ke halaman login atau halaman lain yang sesuai
        router.push('/');
      }
    };
  
    return (
      <div className='font-poppins h-screen'>
        <Navbar/>
        <div className="flex justify-end fixed bottom-0 right-0">

          {/* <img src="/images/gambar-emergency.png" width={180}/> */}
          <Image src="/images/gambar-emergency.png" alt='emergency' width={180} height={180}/>
        </div>
        <div className='px-5 mt-7 font-poppins text-xs font-semibold'>
          <div className='flex'>
            <Link href="/">
              <div className='mr-1'>Beranda</div>
            </Link>
            <div className='mr-1'> &gt; </div>
            <Link href="/profile/user">
              <div className='mr-1 text-light-blue'>Profile</div>
            </Link>
          </div>
          <h1 className='text-2xl mt-2 font-bold font-poppins text-dark-blue'>
            Profile
          </h1>
          
          <div className=' mt-1 text-xs font-semibold text-dark-blue'>
            Silahkan isi dan lengkapi data berikut.
          </div>   
          <div className='mt-4 rounded-lg border-2 border-slate-200 shadow-md flex flex-col px-6 py-4 text-dark-blue font-normal text-base'>
            <div className='text-light-blue font-semibold'>
              Nama Lengkap
            </div>
            <div className='border-b-2 my-2 border-light-blue flex flex-col'>
              <input
                placeholder='Masukkan Nama Lengkap'
                type="text"
                className='p-0 border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className='text-light-blue font-semibold'>
              Email
            </div>
            <div className='border-b-2 my-2 border-light-blue flex flex-col'>
              <input
                placeholder='Masukkan Email'
                type="text"
                className='p-0 border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='text-light-blue font-semibold'>
              Nomor Telepon
            </div>
            <div className='border-b-2 my-2 border-light-blue flex flex-col'>
              <input
                placeholder='Masukkan Nomor Telepon'
                type="text"
                className='p-0 border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className='my-4 flex flex-col'>
              <button className='py-2 rounded-xl bg-light-blue text-white shadow-xl' onClick={handleFinishRegistration}>Finish</button>
            </div>

            <button onClick={handleLogout}>Logout</button>
            
          </div>
        </div>
      </div>
    );
  }
};

export default User;