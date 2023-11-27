import Link from "next/link";

interface NavItemProps {
    text: string;
    destination: string;
};

const NavItem: React.FC<NavItemProps> = (props) => {
    const { text, destination } = props;
    
    return (
        <Link href={destination}>
            <div className="flex items-center w-full px-10 py-3 text-white text-[18px] font-semibold cursor-pointer font-poppins hover:bg-slate-500 hover:text-white transition-all">{text}</div>    
        </Link>
    );
};


export default NavItem;