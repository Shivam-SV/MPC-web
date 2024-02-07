import KeyMappings from "./keyMap";
function MPC({outputs, midi}){

    function playNote(note){
        console.log(note, midi.outputs[0].playNote(note));
    }

    return (
        <>
            <div className="flex items-center p-2">
                <h2 className="grow text-lg font-medium">MPC Web</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tune mode</span>
                </label>
            </div>
            <div className="grid grid-cols-12 md:gap-3 gap-1">
                {KeyMappings.map((btn) => {
                    return (
                        <button key={btn.id} className={"col-span-4 mpc-block-btn " + `active:bg-${btn.color}-100 active:bg-${btn.color}-900`} onClick={() => playNote(btn.key)} >
                            <span>{btn.name}</span> <br />
                            <span className=" text-neutral-400 dark:text-neutral-200">{btn.key}</span>
                        </button>
                    )
                })}
            </div>
        </>
    )
}

export default MPC;