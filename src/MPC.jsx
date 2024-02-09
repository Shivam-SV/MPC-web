import defaultKeyMappings from "./keyMap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";

const defaultNotePlayDuration = 200;
const playNote = (note) => {
    // if(midi != undefined){
    //     midi.outputs[0].playNote(note);
    //     setTimeout(() => {
    //         midi.outputs[0].stopNote(note);
    //     }, defaultNotePlayDuration);
    // }
}

function MPCBlock({button, tuneMode, swapPositions}){
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: 'button',
        drop(item) {
            console.log(item);
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = button.positionAt;
            if (dragIndex === hoverIndex) return;
            swapPositions(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'button',
        item: { id: button.id, index: button.positionAt },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));

    if(tuneMode) drag(drop(ref));
    const buttonClasses = `col-span-4 mpc-block-btn ${button.colorClasses}`;
    return (
        <button ref={ref} style={{opacity: isDragging ? 0.3 : 1}} className={buttonClasses} disabled={tuneMode} onClick={() => playNote(button.key)} >
            <span>{button.name}</span> <br />
            <span className=" text-neutral-400 dark:text-neutral-200">{button.key}</span>
        </button>
    );
}

function MPC({outputs, midi}){
    const [inTuneMode, setInTuneMode] = useState(false);
    const [KeyMappings, setKeyMappings] = useState(defaultKeyMappings);
    const swapPositions = (currentPosition, changablePosition) => {
        let keyObj = KeyMappings;
        let draggedElm = keyObj.find(b => b.positionAt == currentPosition);
        let t = keyObj.filter(b => b.positionAt != currentPosition);
        t.splice(changablePosition - 1, 0, draggedElm);
        t = t.map((b, i) => {b.positionAt = i + 1; return b});
        console.log(currentPosition, changablePosition);
        setKeyMappings(t);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex items-center p-2">
                <h2 className="grow text-lg font-medium">MPC Web</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="1" defaultChecked={inTuneMode} onChange={() => setInTuneMode(!inTuneMode)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tune mode</span>
                </label>
            </div>
            <div className="grid grid-cols-12 md:gap-3 gap-1">
                {KeyMappings.sort((a,b) => a.positionAt - b.positionAt).map((btn) => {
                    return (
                        <MPCBlock button={btn} key={btn.id} tuneMode={inTuneMode} swapPositions={swapPositions} />
                    )
                })}
            </div>
        </DndProvider>
    )
}

export default MPC;