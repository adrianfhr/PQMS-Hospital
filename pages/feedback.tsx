import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';
import Navbar from '@src/components/Navigation/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify';
import Footer from '@src/components/Footer';



const Feedback = () => {
  const router = useRouter();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [komentar, setKomentar] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleFeedback = async () => {
        const feedback = async () => {
            try {
                const { data, error } = await (supabase as NonNullable<typeof supabase>).from('feedback').insert([
                    { 
                        name: nama,
                        email: email,
                        comment: komentar,
                        rating: rating
                    }
                ]);
                if (error) {
                    throw error;
                }
                console.log('feedback : ', data);
            } catch (error) {
                throw error;
            }
        };
        
        toast.promise(
            feedback(),
            {
                pending: 'Loading',
                success: {
                    render: () => {
                        router.push('/konfirmasifeedback')
                        return 'Berhasil memberikan masukan';
                    }
                },
                error: {
                    render: (error: any) => {
                        const errorMessage = error.message;
                        return errorMessage;
                    }
                }
            }
        )
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
            <Link href="/feedback">
              <div className='mr-1 text-light-blue'>Beri Masukan</div>
            </Link>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Beri Masukan
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Beri Masukan Sekarang!
          </div>


          

          <div className='rounded-lg border-2 border-slate-300 shadow-md flex flex-col px-6 py-4 text-dark-blue font-poppins mt-3'>
            <div className='text-black font-medium text-sm'>
              Nama
            </div>
            <div className='rounded-lg border-2 my-2 border-slate-300 shadow-md flex flex-col'>
              <input
                placeholder='Masukkan Nama'
                type="text"
                className=' mx-1 border-none focus:ring-0 focus:bg-slate-100 placeholder:font-light font-light text-black text-sm'
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className='text-black font-medium text-sm'>
              Email
            </div>
            <div className='rounded-lg border-2 my-2 border-slate-300 shadow-md flex flex-col'>
              <input
                placeholder='Masukkan Email'
                type="text"
                className='mx-1 border-none focus:ring-0 focus:bg-slate-100 placeholder:font-light font-light text-black text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='my-4 text-sm text-black font-medium'>
                Bagaimana Layanan Website Kami?
            </div>
            <div className='rounded-[40px] border-2 border-slate-300  shadow-md flex w-fit'>
                {[...Array(5)].map((star, index) =>{
                    const currentRating=index+1
                   return (
                    <label key={currentRating} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <input
                            placeholder='Rating'
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={()=>setRating(currentRating)}
                            style={{display:'none'}}
                        />
                        <FaStar 
                            className='cursor-pointer star flex' 
                            size={40}
                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={()=> setHover(currentRating)}
                            onMouseLeave={()=> setHover(0)}
                            style={{margin:'8px'}}
                        />
                    </label>
                   );
                })}
            
            </div>
            <div className='rounded-lg border-2 my-5 border-slate-300 shadow-md flex flex-col h-24 focus:bg-slate-100'>
              <input
                type="text"
                placeholder='Tambahkan Komentar...'
                className='mx-1 border-none focus:ring-0 focus:bg-slate-100 h-fit text-left placeholder:font-light font-light text-black text-sm'
                
                value={komentar}
                onChange={(e) => setKomentar(e.target.value)}
              />
            </div>
            <button onClick={handleFeedback} className='text-sm font-medium rounded-xl text-light-blue h-10 border border-light-blue shadow-lg hover:bg-light-blue hover:text-white'>Kirim</button>
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

export default Feedback;