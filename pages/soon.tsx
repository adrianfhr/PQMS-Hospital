import Image from "next/image";
import Navbar from "@src/components/Navigation/Navbar";
import Footer from "@src/components/Footer";

const Soon: React.FC = () => {
    return (
        <div className="bg-white h-screen ">
                <div className="fixed w-screen z-[1000]">
                    <Navbar/>
                </div>
            <div className="flex flex-col justify-center items-center p-4 h-full">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center mb-64">
                        <Image src="/images/coming-soon.png" width={500} height={500} alt="soon"/>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-0 w-full '>
              <Footer/>
        </div>
        </div>
    )
}

export default Soon
