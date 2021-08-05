let i = 0;
export const PropertyTypes = Object.freeze(
    {
        "DATA_LABELS": {"value": "dataLabels", "display": "Label", "order": i++},
        "MARKERS": {"value": "marker", "display": "marker", "order": i++},
        "COLOUR": {"value": "color", "display": "colour", "order": i++},
        // "PERCENT": {"value": "percent", "display": "PERCENT", "order": i++},
    });

// https://gist.github.com/bobspace/2712980
export const CSS_COLOR_NAMES = [
    '#2f7ed8', '#0d233a', '#8bbc21', '#910000',
    '#1aadce', '#492970', '#f28f43', '#77a1e5',
    '#c42525', '#a6c96a', 'black', '#9370DB',
    '#DAA520', '#FFE4E1', '#5F9EA0', '#228B22',
    '#FF4500', "#1f77b4", "#d62728",
    "#ff7f0e", "#2ca02c", "#9467bd", "#8c564b"
];