import SideNav from "./_comp/SideNav"
import TopHeader from "./_comp/TopHeader"
export default function Layout({children}){
    return(
        <>
        <div className="h-full w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
            <SideNav></SideNav>
        </div>
        <div className="md:ml-64">
            <TopHeader></TopHeader>
            {children}
        </div>
        </>
    )
}