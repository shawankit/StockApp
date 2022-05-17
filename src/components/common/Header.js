import { Icon, TabSection } from "atoms";
import MainMenu from "atoms/MainMenu";
import Location from "molecules/Location";
import Profile from "molecules/Profile";
import SearchBox from "molecules/SearchBox";
import router from "next/router";
import { useEffect, useState } from "react";

const { default: Logo } = require("atoms/Logo")

const Header = () => {
    const [menu, setMenu] = useState([
        {
            title: 'Services',
            link: "/services"
        },
        {
            title: 'Ideas',
            link: "/ideas"
        },
        {
            title: 'Articles',
            link: "/articles"
        }
    ]);
    useEffect(() => {
        setMenu(menu.map(item => {
            if (router.pathname.includes(item.link))
                item.active = true;
            return item;
        }))
    }, [])
    return (
        <div className="shadow-md-5 w-full bg-white flex items-center h-14 md:h-20 justify-between">
            <div className="flex items-center">
                <Logo desktoplogoclassName="hidden md:flex object-contain h-9 ml-20" mobilelogoclassName="flex md:hidden object-contain h-9 ml-4" alt="logo"
                    src="/images/livspace_logo.svg" mobilelogosrc="/images/livespace_icon.svg" />
                <MainMenu
                    MainMenu={menu}
                    className="hidden md:flex ml-8"
                />
            </div>
            <div className="h-9 w-px bg-neutral-10 hidden md:flex" />
            <div className="flex items-center mr-4 md:mr-10 lg:mr-20 xl:mr-0">
                <Location
                    className=""
                    icon="lightbulb"
                    iconClassName=""
                />
                <SearchBox
                    iconClassName="absolute z-50 left-4 top-1/2 text-textgrey transform -translate-y-2/4 text-base md:text-lg md:text-textlightBlack"
                    inputClassName="rounded-full h-9 w-full placeholder-textgrey bg-offWhite-100 focus:outline-none py-2 text-sm pl-11 pr-3 md:h-12 overflow-ellipsis"
                    placeholder="What are you looking?"
                    className="hidden xl:flex relative ml-12 w-80 h-12"
                />
                <Icon name="bell" className="ml-6 mr-6" />
                <Icon name="shopping-cart" />
            </div>
            <div className="h-9 w-px bg-neutral-10 hidden xl:flex" />
            <div className="hidden xl:flex items-center">
                <Profile className="mr-20" />
            </div>
        </div>)
}
export default Header;