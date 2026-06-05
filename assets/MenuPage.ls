{
  "_$ver": 1,
  "_$id": "pmth225m",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "width": 750,
  "height": 1334,
  "_$child": [
    {
      "_$id": "7njh3rhh",
      "_$type": "GButton",
      "name": "btn",
      "x": 275,
      "y": 403,
      "width": 250,
      "height": 250,
      "background": {
        "_$type": "DrawRectCmd",
        "fillColor": "#de2c2c"
      },
      "controllers": {
        "_$type": "Record",
        "button": {
          "_$type": "Controller",
          "pages": [
            "up",
            "down",
            "over",
            "selectedOver"
          ]
        }
      },
      "_$comp": [
        {
          "_$type": "91492e2f-0c22-4180-ae3c-71b66588832e",
          "scriptPath": "../src/Navigation/OpenScene.ts",
          "targetScene": "MainPage.ls"
        }
      ],
      "_$child": [
        {
          "_$id": "uursvf8s",
          "_$type": "Text",
          "name": "Text",
          "width": 250,
          "height": 250,
          "text": "开始游戏",
          "fontSize": 80,
          "color": "#000000",
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    }
  ]
}