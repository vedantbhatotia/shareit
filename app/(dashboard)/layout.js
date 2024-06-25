import SideNav from "./_comp/SideNav"
export default function Layout({children}){
    return(
        <>
        <div className="h-full w-64 flex-col fixed inset-y-0 z-50">
            <SideNav></SideNav>
        </div>
        <div className="md:ml-64">
        {children}
        </div>
        </>
    )
}