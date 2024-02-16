function Layout({ children }) {
    return (
        <div className=" w-full h-full">
            <div className="container mx-auto md:p-5 p-2 flex items-center justify-center">
                <div className="box bg-white dark:bg-gray-900 p-4 lg:w-auto w-full rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;