import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col">
      <div  
        style={{ backgroundImage: `url('/images/footer.png')` }}
        className="h-[290px] bg-cover bg-center pt-14 font-poppins text-white w-full">

        <div className='h-full w-full justify-center flex '>
        <div>
          <div className='text-sm'>
            Download PQMS Hospital APP
          </div>
          <div className='grid grid-cols-2 gap-16 my-6'>
            
            <Link href = '/soon'>
              <Image src="/images/appstore.png" alt="gambar appstore" width={125} height={15}/>
            </Link>
            <Link href = '/soon'>
              <Image src="/images/playstore.png" alt="gambar playstore" width={125} height={15}/>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-16 my-2 text-sm'>
            <div>
              Tentang Kami
            </div>
            <div>
              Hubungi Kami
            </div>
          </div>
          
            
              <div className='flex font-extralight my-3  text-[10px]'>
                <div className='mr-8 w-16'>Blog</div>
                <div className='mr-8 w-16'>Facebook</div>
                <div className='mr-8 w-16'>Team</div>
              </div>
              <div className='flex font-extralight text-[10px]'>
                <div className='w-16 mr-8'>Instagram</div>
                <div className='mr-8 w-16'>Twitter</div>
                <div className='mr-8 w-16'>Investors</div>
              </div>
{/*             
            <div className='flex items-center mt-3'>
            <Image src="/images/emergency-call.png" alt="emergency call" width={250} height={25}/>
          </div> */}
</div>
        </div>


      </div>

    </footer>
  );
};

export default Footer;
