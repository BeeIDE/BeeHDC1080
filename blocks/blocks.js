Blockly.defineBlocksWithJsonArray([
    // -> Led 7 Segments
    {
        "type": "hdc_temperature",
        "message0": "%2 %1 temperature (°C)",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "port",
                "columns": 2,
                "options": [
                    ["PORT1", "PORT1"],
                    ["PORT2", "PORT2"],
                    ["PORT3", "PORT3"],
                    ["PORT4", "PORT4"],
                    ["PORT5", "PORT5"],
                    ["PORT6", "PORT6"],
                ]
            },
            {
                "type": "field_image",
                "src": "/static/MicroBlock/images/icon/led7segments.png",
                "width": 45,
                "height": 45,
                "alt": "led7segments"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": "#0096d6",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hdc_humidity",
        "message0": "%2 %1 humidity (%)",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "port",
                "columns": 2,
                "options": [
                    ["PORT1", "PORT1"],
                    ["PORT2", "PORT2"],
                    ["PORT3", "PORT3"],
                    ["PORT4", "PORT4"],
                    ["PORT5", "PORT5"],
                    ["PORT6", "PORT6"],
                ]
            },
            {
                "type": "field_image",
                "src": "/static/MicroBlock/images/icon/led7segments.png",
                "width": 45,
                "height": 45,
                "alt": "led7segments"
            }
        ],
        "output": "Number",
        "colour": "#0096d6",
        "tooltip": "",
        "helpUrl": ""
    }
]);