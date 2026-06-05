{
  "_$ver": 1,
  "_$id": "vsstwj0k",
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
      "_$id": "5mswefp6",
      "_$type": "GButton",
      "name": "btn_map",
      "y": 150,
      "width": 750,
      "height": 160,
      "anchorY": 1,
      "background": {
        "_$type": "DrawRectCmd",
        "lineWidth": 10,
        "lineColor": "#000000",
        "fillColor": "#cda0a0"
      },
      "tooltips": "",
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
          "_$type": "62e8915d-ba31-4558-a5f3-9e6cc70cdd1f",
          "scriptPath": "../src/OpenPanel.ts",
          "targetPrefab": "MapPage.lh"
        }
      ],
      "_$child": [
        {
          "_$id": "jz6jh2fv",
          "_$type": "Text",
          "name": "Text_1",
          "y": 160,
          "width": 750,
          "height": 160,
          "anchorY": 1,
          "text": "打开地图",
          "fontSize": 45,
          "color": "#000000",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    },
    {
      "_$id": "ymnz6vfr",
      "_$type": "GButton",
      "name": "btn_bag",
      "y": 310,
      "width": 750,
      "height": 160,
      "anchorY": 1,
      "background": {
        "_$type": "DrawRectCmd",
        "lineWidth": 10,
        "lineColor": "#000000",
        "fillColor": "#cda0a0"
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
      "_$child": [
        {
          "_$id": "dxyr4c1x",
          "_$type": "Text",
          "name": "Text",
          "y": 160,
          "width": 750,
          "height": 160,
          "anchorY": 1,
          "text": "查看人物和背包",
          "fontSize": 45,
          "color": "#000000",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    },
    {
      "_$id": "m3njs0hh",
      "_$type": "GButton",
      "name": "btn_warehouse",
      "y": 470,
      "width": 750,
      "height": 160,
      "anchorY": 1,
      "background": {
        "_$type": "DrawRectCmd",
        "lineWidth": 10,
        "lineColor": "#000000",
        "fillColor": "#cda0a0"
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
          "_$type": "62e8915d-ba31-4558-a5f3-9e6cc70cdd1f",
          "scriptPath": "../src/OpenPanel.ts",
          "targetPrefab": "Warehouse.lh"
        }
      ],
      "_$child": [
        {
          "_$id": "5kdt5h3j",
          "_$type": "Text",
          "name": "Text",
          "y": 160,
          "width": 750,
          "height": 160,
          "anchorY": 1,
          "text": "打开仓库",
          "fontSize": 45,
          "color": "#000000",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    },
    {
      "_$id": "tradeBtn",
      "_$type": "GButton",
      "name": "btn_trade",
      "y": 630,
      "width": 750,
      "height": 160,
      "anchorY": 1,
      "background": {
        "_$type": "DrawRectCmd",
        "lineWidth": 10,
        "lineColor": "#000000",
        "fillColor": "#cda0a0"
      },
      "tooltips": "JumpToTradePage.show();",
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
          "_$type": "62e8915d-ba31-4558-a5f3-9e6cc70cdd1f",
          "scriptPath": "../src/OpenPanel.ts",
          "targetPrefab": "TradePage.lh"
        }
      ],
      "_$child": [
        {
          "_$id": "tradeText",
          "_$type": "Text",
          "name": "Text",
          "y": 160,
          "width": 750,
          "height": 160,
          "anchorY": 1,
          "text": "交易处",
          "fontSize": 45,
          "color": "#000000",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    },
    {
      "_$id": "8j3372af",
      "_$type": "GButton",
      "name": "btn",
      "y": 1334,
      "width": 750,
      "height": 160,
      "anchorY": 1,
      "background": {
        "_$type": "DrawRectCmd",
        "lineWidth": 10,
        "lineColor": "#000000",
        "fillColor": "#cda0a0"
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
          "scriptPath": "../src/OpenScene.ts",
          "targetScene": "MenuPage.ls"
        }
      ],
      "_$child": [
        {
          "_$id": "l9h14rr6",
          "_$type": "Text",
          "name": "Text",
          "y": 160,
          "width": 750,
          "height": 160,
          "anchorY": 1,
          "text": "返回菜单",
          "fontSize": 45,
          "color": "#000000",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    },
    {
      "_$id": "ojo0s5lh",
      "_$type": "GButton",
      "name": "btn_gaizhuangtai",
      "y": 790,
      "width": 750,
      "height": 160,
      "anchorY": 1,
      "background": {
        "_$type": "DrawRectCmd",
        "lineWidth": 10,
        "lineColor": "#000000",
        "fillColor": "#cda0a0"
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
          "_$type": "62e8915d-ba31-4558-a5f3-9e6cc70cdd1f",
          "scriptPath": "../src/OpenPanel.ts",
          "targetPrefab": "gaizhaungtai.lh"
        }
      ],
      "_$child": [
        {
          "_$id": "dt120cxb",
          "_$type": "Text",
          "name": "Text",
          "y": 160,
          "width": 750,
          "height": 160,
          "anchorY": 1,
          "text": "改装台",
          "fontSize": 45,
          "color": "#000000",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    }
  ]
}