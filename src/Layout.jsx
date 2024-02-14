function Layout({ children }) {
    return (
        <div className=" bg-gray-100 dark:bg-black w-full h-screen">
            <div className="container mx-auto md:p-5 p-2 flex items-center justify-center">
                <div className="box bg-white dark:bg-gray-900 p-4 lg:w-auto w-full rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;