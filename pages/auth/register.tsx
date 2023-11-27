import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/router';
import Navbar from '@src/components/Navigation/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Footer from '@src/components/Footer';

const Register = () => {

  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  
  const cekLengthPassword = () => {
    if(password.length >= 8){
      return true;
    }else {
      return false;
    }
  }

  const cekConfirmPassword = () => {
    if(password === konfirmasiPassword){
      return true;
    }else {
      return false;
    }
  }

  const router = useRouter();
  
  // Gunakan useEffect untuk memeriksa sesi saat komponen dimuat
  useEffect(() => {
    async function checkSession() {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.getSession();
      if (data.session) {
        router.push('/'); // Redirect pengguna ke halaman utama jika sudah masuk
      }
    }
    
    checkSession();
  }, [router]);

  const handleRegister = async () => {
    const register = async () => {
      try {
        if(!email){
          throw new Error('Email harus diisi');
        }
        if(!nama){
          throw new Error('Nama harus diisi');
        }
        if(!alamat){
          throw new Error('Alamat harus diisi');
        }
        if(!password){
          throw new Error('Password harus diisi');
        }
        if(!cekLengthPassword()){
          throw new Error('Password harus lebih dari 8 karakter');
        }
        if(!cekConfirmPassword()){
          throw new Error('Password tidak sama');
        }

        const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.signUp({
          email: email,
          password: password,
          options:{
            data:{
              email: email,
              full_name: nama,
              address: alamat
            },
          },
        });

        if (error) {
          throw error;
        }
        if(data.user){
          console.log('Berhasil mendaftar:', data);
          await getUser(data.user.id ? data.user.id : '');
          const redirect = localStorage.getItem('redirect');
          const cleanedRedirect = redirect ? decodeURIComponent(redirect) : '/';
          router.push(cleanedRedirect);
          console.log('redirect : ', cleanedRedirect);
        }
      } catch (error) {
        throw error;
      }
    };

    function getErrorMessage(error : any) {
      let errorMessage = error.data.message
      if (error.data.message === 'User already registered') {
        return 'Email sudah terdaftar'
      }else if(error.data.message === 'Unable to validate email address: invalid format'){
        return 'Format email salah'
      } else{
        return errorMessage;
      }
    }

    const getUser = async (id : string) => {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).from('profiles').select('*').eq('id', id);
      if (data && data.length > 0) {
  
          localStorage.setItem('user', JSON.stringify(data[0]));
          console.log('user : ', data[0]);
        }
    }

    toast.promise(
      register(),
      {
        pending: 'Loading',
        success: 'Berhasil mendaftar',
        error: {
          render: (error: any) => {
            const errorMessage = getErrorMessage(error);
            return errorMessage;
          }
        }
      }
    );
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>
      <div className="h-16">
        <div className="fixed w-screen">
          <Navbar/>
        </div>
      </div>
      <div className='px-4 font-poppins mt-4 '>
      <div className='flex text-xs font-semibold'>
            <Link href="/">
              <div className='mr-1'>Beranda</div>
            </Link>
            <div className='mr-1'> &gt; </div>
            <Link href="/auth/register">
              <div className='mr-1 text-light-blue'>Register</div>
            </Link>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Register
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Selamat Datang di Website PQMS Hospital.
          </div> 

      {/* kotaklogin */}
      <div className='rounded-lg border-2 border-slate-200 shadow-md flex flex-col px-6 py-4 my-4 text-dark-blue font-poppins'>
            <div className='text-light-blue font-medium text-sm'>
              Email
            </div>
            <div className='border-b-[1px] my-2 border-light-blue flex flex-col'>
              <input
                placeholder='Masukkan Email'
                type="text"
                className='border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100 text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          <div className='text-light-blue font-medium text-sm'>
            Nama Lengkap
          </div>
          <div className='border-b-[1px] my-2 border-light-blue flex flex-col mb-3'>
            <input
              placeholder='Masukkan Nama Lengkap'
              type="text"
              className='border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100 text-sm'
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className='text-light-blue font-medium text-sm'>
            Alamat
          </div>
          <div className='border-b-[1px] my-2 border-light-blue flex flex-col mb-3'>
            <input
              placeholder='Masukkan Alamat'
              type="text"
              className='border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100 text-sm'
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className='text-light-blue text-sm font-medium '>
            Password
          </div>
          <div className='border-b-[1px] mt-2  border-light-blue flex flex-col'>
            <input
              placeholder='Masukkan Password'
              type="password"
              className=' border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100 text-sm'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='text-slate-300 font-light text-xs'>
            Masukkan Password 8-12 digit angka & huruf
          </div>
          <div className='text-light-blue font-medium text-sm'>
            Konfirmasi Password
          </div>
          <div className='border-b-[1px] mt-2 border-light-blue flex flex-col'>
            <input
              placeholder='Masukkan Password'
              type="password"
              className='border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100 text-sm'  
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
            />
          </div>
          <div className='text-slate-300 font-light text-xs mt-1'>
            Masukkan Password 8-12 digit angka & huruf
          </div>
          <button className='hover:bg-light-blue hover:text-white text-sm font-medium rounded-xl text-light-blue mt-3 h-10 border-[1px]  border-light-blue shadow-lg' onClick={handleRegister}>Register</button>
          <div className='flex justify-center font-light text-xs pt-2 my-1'>
          <div className='mr-1'>Sudah punya akun?</div> 
          <Link href="/auth/login">
            <div className='mr-1 text-light-blue'>Login</div>
          </Link>
        </div>
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

export default Register;