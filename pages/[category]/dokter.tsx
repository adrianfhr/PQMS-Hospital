import Image from "next/image";
import Navbar from "@src/components/Navigation/Navbar";
import Link from "next/link";
import { useRouter } from 'next/router';
import { supabase } from "../../supabase";
import { useEffect, useState } from "react";
import Footer from "@src/components/Footer";

const Dokter: React.FC = () => {

    const router = useRouter();
    const { category } = router.query;
    
    useEffect(() => {
        async function getDoctor(category: string | string[] | undefined) {
            const { data, error } = await (supabase as NonNullable<typeof supabase>).from('doctors').select('*').eq('spesialisasi', category);
            
           
            console.log('error : ', error);

            if(data){
                console.log('category : ', category);
                console.log('data : ', data);
                setDokter(null);
                setDokter(data);
            }
        }
        getDoctor(category);
      }, [category]
    )

    const [dokter, setDokter] = useState([] as any); 
    
    console.log('dokter : ', dokter);

    const handleBuatJanjiTemu = (id : number) => {
        router.push(`/${category}/${id}/janjitemu`);
    }
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
            <div className="h-16">
                <div className="fixed w-screen">
                    <Navbar />
                </div>
            </div>

            <div className='px-4 font-poppins mt-4 font-semibold'>
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
            Daftar Dokter Spesialis
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Dokter Ahli & Berpengalaman Di Bidangnya.
          </div>
                

                { dokter.map((dokter: any) => (
                    <div key={dokter.name} className='rounded-lg border-2 border-slate-200 shadow-md flex flex-col px-6 py-4 text-dark-blue font-poppins mt-3'>
                        <div className="flex pb-4">
                            <div className="">
                                <div className="">
                                    <Image src="/images/contoh-dokter.png" width={75} height={75} alt="dokter" />
                                </div>
                            </div>

                            <div className="text-black text-sm pl-5">
                                <div className="">
                                    {dokter.name}
                                </div>

                                <div className="flex text-xs font-medium mt-2">
                                    <div>
                                        <Image src="/images/stethoscope.png" width={16} height={2} alt="lihat profil" />
                                    </div>
                                    <div className="ml-1">
                                        {category}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mx-2">
                            <button onClick={()=>handleBuatJanjiTemu(dokter.id)} className="hover:text-white hover:bg-light-blue rounded-xl border border-light-blue flex justify-center items-center text-light-blue text-xs font-medium w-32 h-8">
                                Buat Janji Temu
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div>

        <div className=' h-32 bg-white'></div>
            <div className=' bottom-0 w-full '>
              <Footer/>
            </div>
        </div>
        </div>
    )
}

export default Dokter