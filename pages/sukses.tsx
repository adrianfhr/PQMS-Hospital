import Image from "next/image";
import Navbar from "@src/components/Navigation/Navbar";
import Link from "next/link";
import Footer from "@src/components/Footer";
const Sukses: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
            <div className="h-16">
                <div className="fixed w-screen z-[1000]">
                    <Navbar/>
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
                            Buat Janji Temu
                        </div>
                    </Link>
                </div>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Buat Janji Temu
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Silahkan Konfirmasi Janji Temu Anda.
          </div>

                <div className='rounded-lg border-2 border-slate-200 shadow-md flex flex-col px-6 py-4 text-dark-blue font-poppins mt-3'>
                    <div>
                        <div className="flex justify-center">
                            <Image src="/images/logo-konfirmasi.png" width={150} height={20} alt="logo konfirmasi"/>
                        </div>
                        <div className="flex justify-center text-black">
                            Konfirmasi Berhasil
                        </div>
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
    )
}

export default Sukses;
