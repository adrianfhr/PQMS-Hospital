import Image from "next/image";
import Navbar from "@src/components/Navigation/Navbar";
import Link from "next/link";
import Footer from "@src/components/Footer";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const User: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUserFullName() {
      const userDetail = localStorage.getItem('user');
      if (userDetail) {
        setFullName(JSON.parse(userDetail).full_name);
        setLoading(false); // Set loading to false once the data is retrieved
      } else {
        toast.error('Failed to retrieve user details');
        setLoading(false); // Set loading to false on failure as well
        router.push('/')
      }
    }
    getUserFullName();
  }, [router]);

  
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
              <div className='mr-1 text-light-blue'>Profil</div>
            </Link>
          </div>


          <div className='font-semibold text-dark-blue text-[25px]'>
            Profil
          </div>
          <div className='font-semibold text-dark-blue mb-4'>
            Cek Profil Mu!
          </div>

                <div className='rounded-lg border-2 border-slate-200 shadow-lg flex flex-col px-6 py-4 '>
                  <div className=" flex justify-between items-center pb-4 border-b-[1px] border-[#878383]">
                    <div className="flex items-center">

                      <div className="mr-3">
                        <Image src="/images/profile.svg" width={80} height={20} alt="logo"/>
                      </div>
                      <div className=" text-base font-bold">
                        {fullName}
                      </div>
                    </div>
                    <div>
                      <Image src="/images/edit.svg" width={20} height={20} alt="logo"/>
                      
                    </div>

                  </div>
                  <div className="flex items-center justify-between py-2 border-b-[1px] border-[#878383]">
                    <div className="flex ">
                      <div className="w-14">
                        <Image src="/images/person.svg" width={50} height={20} alt="logo"/>
                      </div>
                      <div>
                        <div className="text-sm">
                          Profil
                        </div>
                        <div className=" text-sm font-thin">Kelola Profile Anda</div>
                      </div>
                    </div>
                    <div className="text-light-blue text-2xl font-thin">
                      &gt;
                    </div>
                
                    </div>
                  <div className="flex items-center justify-between py-2 border-b-[1px] border-[#878383] ">
                    <div className="flex">
                      <div className="w-14 flex justify-center items-center">
                        <Image src="/images/alamat.svg" width={25} height={20} alt="logo"/>
                      </div>
                      <div>
                        <div className="text-sm ">
                          Alamat
                        </div>
                        <div className="text-sm font-thin">Kelola Alamat Anda</div>
                      </div>
                    </div>
                    <div className="text-light-blue text-2xl font-thin">
                      &gt;
                    </div>

                    </div>
                  <div className="flex items-center justify-between py-2 border-b-[1px] border-[#878383]">
                    <div className="flex">
                      <div className="w-14 flex justify-center items-center">
                        <Image src="/images/password.svg" width={50} height={20} alt="logo"/>
                      </div>
                      <div>
                        <div className="text-sm ">
                          Password
                        </div>
                        <div className="text-sm font-thin">Ubah Password Anda</div>
                      </div>
                    </div>
                    <div className="text-light-blue text-2xl font-thin">
                      &gt;
                    </div>

                    </div>
                  <div className="flex items-center justify-between py-2 border-b-[1px] border-[#878383]">
                    <div className="flex">
                      <div className="w-14 flex justify-center items-center">

                        <Image src="/images/logout.svg" width={25} height={20} alt="logo"/>
                      </div>
                      <div>
                        <div className="text-sm ">
                          Keluar
                        </div>
                        <div className="text-sm font-thin">Keluar Dari Akun Anda</div>
                      </div>
                    </div>
                    <div className="text-light-blue text-2xl font-thin">
                      &gt;
                    </div>


                  </div>

                </div>
            </div>
            </div>
            <div className=' h-64 bg-white'/>
            <div className=' bottom-0 w-full '>
              <Footer/>
        </div>
        </div>
  )
}

export default User;
