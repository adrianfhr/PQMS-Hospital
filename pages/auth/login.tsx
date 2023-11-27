import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/router';
import Navbar from '@src/components/Navigation/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { get } from 'http';
import { toast } from 'react-toastify';
import Footer from '@src/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async () => {
    const login = async () => {
      try {
        if(!email){
          throw new Error('Email harus diisi');
        }
        if(!password){
          throw new Error('Password harus diisi');
        }
        const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.signInWithPassword({
          email: email,
          password: password,
        });
  
        if (error) {
          throw error;
        }

        await getUser(data.user.id);
        const redirect = localStorage.getItem('redirect');
        const cleanedRedirect = redirect ? decodeURIComponent(redirect) : '/';
        router.push(cleanedRedirect);
        console.log('redirect : ', cleanedRedirect);


      } catch (error) {
        throw error;
      }
    };
  
    toast.promise(
      login(),
      {
        pending: 'Loading',
        success: 'Berhasil masuk',
        error: {
          render: (error: any) => {
            const errorMessage = getErrorMessage(error);
            return errorMessage;
          }
        }
      }
    );
  };
  
  function getErrorMessage(error : any) {
    let errorMessage = 'Gagal masuk'; // Default error message
    console.log(error);
    if (error.data.message === 'Invalid login credentials') {
      return 'Email atau password salah'
    } else if (error.data.message === 'Email not confirmed') {
      return 'Email belum terkonfirmasi';
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

    return (
      <div className='min-h-screen flex flex-col'>
        <div className='flex-grow'>
        <div className="h-16">
          <div className="fixed w-screen">
            <Navbar/>
          </div>
        </div>
        <div className='px-4 mt-4 font-poppins'>
        <div className='flex text-xs font-semibold'>
            <Link href="/">
              <div className='mr-1'>Beranda</div>
            </Link>
            <div className='mr-1'> &gt; </div>
            <Link href="/auth/login">
              <div className='mr-1 text-light-blue'>Login</div>
            </Link>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Login
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Selamat Datang di Website PQMS Hospital.
          </div> 
          <div className='flex justify-center '>
          <Image src="/images/gambar-login.png" alt="gambar login" width={300} height={300}/>
          </div>

        {/* kotaklogin */}
        <div className='rounded-lg border-2 border-slate-200 shadow-md flex flex-col px-6 py-4 text-dark-blue font-poppins'>
            <div className='text-light-blue font-medium text-sm'>
              Email
            </div>
            <div className='border-b-[1px] my-2 border-light-blue flex flex-col mb-3'>
              <input
                type="text"
                placeholder='Masukkan Email'
                className='border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100 text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='text-light-blue font-medium text-sm'>
              Password
            </div>
            <div className='border-b-[1px] my-2 border-light-blue flex flex-col'>
              <input
                placeholder='Masukkan Password'
                type="password"
                className='border-none border-b-2 border-dark-blue focus:ring-0 focus:bg-slate-100 text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='text-slate-300 font-light text-xs mt-1'>
              Masukkan Password 8-12 digit angka & huruf
            </div>




            
            <button className='hover:bg-light-blue hover:text-white  rounded-xl text-light-blue mt-3 h-10 border-[1px]  border-light-blue shadow-lg text-sm font-medium' onClick={handleLogin}>Login</button>

            <div className='flex justify-center font-light text-xs pt-2 my-1'>
            <div className='mr-1'>Belum punya akun?</div> 
            <Link href="/auth/register">
              <div className='mr-1 text-light-blue'>Register</div>
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

export default Login;