let i = 0;
export const ChartTypes = Object.freeze(
    {
        "BAR": {"string": "bar", "display": "bar", "value": i++},
        "COLUMN": {"string": "column", "display": "column", "value": i++},
        "LINE": {"string": "line", "display": "line", "value": i++},
        "AREA": {"string": "area", "display": "area", "value": i++},
        "SPLINE": {"string": "spline", "display": "spline", "value": i++},
        "AREASPLINE": {"string": "areaspline", "display": "areaspline", "value": i++},
        "PIE": {"string": "pie", "display": "pie", "value": i++},
        "MAP": {"string": "map", "display": "map", "value": i++},
        "SEMI_CIRCLE_DONUT": {"string": "semi_circle_donut", "display": "semi circle donut", "value": i++},
        "STACKED_COLUMN": {"string": "stacked_chart", "display": "stacked chart", "value": i++},
        "STACKED_BAR": {"string": "stacked_bar", "display": "stacked bar", "value": i++},
        "TABLE": {"string": "table", "display": "table", "value": i++},
        "TREEMAP": {"string": "treemap", "display": "treemap", "value": i++},
        "TILE": {"string": "tile", "display": "tile", "value": i++},
    });