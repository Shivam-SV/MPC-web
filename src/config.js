const defaultKeyMappings = [
    {
        id: 1,
        name: 'Kick',
        key: "C3",
        positionAt:1,
        color: 'red',
        colorClasses: `btn-red`
    },
    {
        id: 2,
        name: 'Snare',
        key: "C#3",
        positionAt:2,
        color: 'orange',
        colorClasses: `btn-orange`
    },
    {
        id: 3,
        name: 'Open Hat',
        key: "D3",
        positionAt:3,
        color: 'amber',
        colorClasses: `btn-amber`
    },
    {
        id: 4,
        name: 'Hi-Hat',
        key: "D#3",
        positionAt:4,
        color: 'yellow',
        colorClasses: `btn-yellow`
    },
    {
        id: 5,
        name: 'Clap',
        key: "E3",
        positionAt:5,
        color: 'lime',
        colorClasses: `btn-lime`
    },
    {
        id: 6,
        name: 'Crash',
        key: "F3",
        positionAt:6,
        color: 'green',
        colorClasses: `btn-green`
    },
    {
        id: 7,
        name: 'Tamborin',
        key: "F#3",
        positionAt:7,
        color: 'emerald',
        colorClasses: `btn-emerald`
    },
    {
        id: 8,
        name: 'Shaker',
        key: "G3",
        positionAt:8,
        color: 'teal',
        colorClasses: `btn-teal`
    },
    {
        id: 9,
        name: 'Perc',
        key: "G#3",
        positionAt:9,
        color: 'cyan',
        colorClasses: `btn-cyan`
    },
];

const octaves = [...Array(9).keys()];
const keys = Array.from(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']);

export {defaultKeyMappings, octaves, keys};