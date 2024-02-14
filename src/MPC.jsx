import {defaultKeyMappings, octaves, keys} from "./config";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";

const defaultNotePlayDuration = 200;

function MPCBlock({button, tuneMode, swapPositions, ChangeKey, onPress}){
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
        <button ref={ref} style={{opacity: isDragging ? 0.3 : 1}} className={buttonClasses} disabled={tuneMode} onClick={() => onPress(button.key)} >
            <span>{button.name}</span> <br />
            {tuneMode ? (<>
                <select className="text-base p-1 border border-neutral-200 mx-1 rounded bg-transparent" onInput={(e) => ChangeKey(button.id, e.target.value, 'current')} defaultValue={button.key.replace(new RegExp('[0-9]', 'gi'), '')}>
                    {keys.map(k => {
                        return <option key={k} className="dark:text-black" value={k}>{k}</option>
                    })}
                </select>
                <select className="text-base p-1 border border-neutral-200 mx-1 rounded bg-transparent" onInput={(e) => ChangeKey(button.id, 'current', e.target.value)} defaultValue={button.key.replace(new RegExp('[^0-9]', 'gi'), '')}>
                    {octaves.map(o => {
                        return <option key={o} className="dark:text-black" value={o}>{o}</option>
                    })}
                </select>
            </>) : <span className=" text-neutral-400 dark:text-neutral-200">{button.key}</span>}
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
    const ChangeKey = (buttonId, scale = 'current', octave = 'current') => {
        let keyObj = KeyMappings;
        keyObj = keyObj.map(k => {
            if(k.id == buttonId){
                let currentScale = k.key.replace(new RegExp('[0-9]', 'gi'), '');
                let currentOctave = k.key.replace(new RegExp('[^0-9]', 'gi'), '');
                k.key = `${scale != 'current' ? scale : currentScale}${octave != 'current' ? octave : currentOctave}`;
            }
            return k;
        });
        setKeyMappings(keyObj);
    }
    const playNote = (note) => {
        if(midi != undefined && midi.outputs.length > 0){
            midi.outputs[0].playNote(note);
            setTimeout(() => {
                midi.outputs[0].stopNote(note);
            }, defaultNotePlayDuration);
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex items-center p-2">
                <h2 className="grow text-lg font-medium dark:text-white">MPC Web</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="1" defaultChecked={inTuneMode} onChange={() => setInTuneMode(!inTuneMode)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tune mode</span>
                </label>
            </div>
            <div className="grid grid-cols-12 md:gap-3 gap-1">
                {KeyMappings.sort((a,b) => a.positionAt - b.positionAt).map((btn) => {
                    return (
                        <MPCBlock button={btn} key={btn.id} onPress={playNote} tuneMode={inTuneMode} swapPositions={swapPositions} ChangeKey={ChangeKey} />
                    )
                })}
            </div>
        </DndProvider>
    )
}

export default MPC;