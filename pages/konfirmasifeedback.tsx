import Image from "next/image";
import Navbar from "@src/components/Navigation/Navbar";
import Link from "next/link";
import Footer from "@src/components/Footer";
const Konfirmasi: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <div className="h-16">
                <div className="fixed w-screen">
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

                <div className='rounded-lg border-2 border-slate-200 shadow-lg flex flex-col px-6 py-4 text-dark-blue font-poppins mt-3'>
                    <div>
                        <div className="flex justify-center">
                            <Image src="/images/logo-konfirmasi.png" width={150} height={20} alt="logo konfirmasi"/>
                        </div>
                        <div className="flex justify-center text-black">
                            Masukan Terkirim
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className=' h-32 bg-white'/>
            <div className=' bottom-0 w-full '>
              <Footer/>
        </div>
        </div>
    )
}

export default Konfirmasi
