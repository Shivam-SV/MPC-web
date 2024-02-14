function NoConnection(){
    return (
        <div className="w-full dark:text-white">
            <section className="p-4">
                <i className='bx bx-no-signal text-center text-6xl font-bold block'></i>
                <h1 className="text-center text-2xl font-bold mb-2">No connection Available</h1>
                <p>Make Sure you have connected with your PC/Laptop/Tablet for MIDI</p>
            </section>
            <hr className="my-6" />
            <h1 className="p-2 text-xl font-semibold">Follow the steps to connect with you device</h1>
            <section id="android-guides" className="p-4">
                <h2 className="text-lg font-medium">Android</h2>
                <ol className="list-decimal ml-6">
                    <li>Go to Settings</li>
                    <li>Select Developer options</li>
                    <li>Select Networking</li>
                    <li>In the Select USB Configuration dialog, check the box for MIDI</li>
                    <li>While connected to the USB host, pull down from the top of the screen</li>
                    <li>Select the entry USB for, and then select MIDI</li>
                </ol>
            </section>
        </div>
    )
}

export default NoConnection;