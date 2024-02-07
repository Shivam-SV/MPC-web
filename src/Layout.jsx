function Layout({ children }) {
    return (
        <div className=" bg-gray-100 dark:bg-gray-950 w-full h-screen">
            <div className="container mx-auto md:p-5 p-2 flex items-center justify-center">
                <div className="box bg-white dark:bg-black p-4 lg:w-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;