export default {
  "id": "sample_project",
  "name": "Sample Project",
  "global": {
    "navigation.links": [
      { "label": "Sample Page 1", "url": "/sample_page1" },
      { "label": "Sample Page 2", "url": "/sample_page2" }
    ]
  },
  "root": {
    "component": "Router",
    "children": [
      {
        "component": "Route",
        "attributes": {
          "path": "/",
          "title": "My First Dank Page"
        },
        "children": [
          {
            "component": "Page",
            "children": [
              {
                "component": "Navigator",
              },
              {
                "component": "Hero",
                "attributes": {
                  "h1.title": "Main Title",
                  "h2.title": "Subtitle"
                }
              },
              {
                "component": "Section",
                "children": [
                  {
                    "component": "Image",
                    "attributes": {
                      "source": "../images/image1.png"
                    }
                  }
                ]
              },
              {
                "component": "Footer",
                "attributes": {
                  "about": "All the text in the footer"
                }
              }
            ]
          }
        ]
      }
      ,{
        "component": "Route",
        "attributes": {
          "path": "/second",
          "title": "My Second Dank Page"
        },
        "children": [
          {
            "component": "Page",
            "children": [
              {
                "component": "Navigator",
                "attributes": {
                  "navigation.links": [
                    { "label": "Second Sample Page 1", "url": "/sample_page1" },
                    { "label": "Second Sample Page 2", "url": "/sample_page2" }
                  ]
                }
              },
              {
                "component": "Hero",
                "attributes": {
                  "h1.title": "Main Title",
                  "h2.title": "Subtitle"
                }
              },
              {
                "component": "Section",
                "children": [
                  {
                    "component": "Image",
                    "attributes": {
                      "source": "../images/image2.png"
                    }
                  }
                ]
              },
              {
                "component": "Footer",
                "attributes": {
                  "about": "All the text in the footer"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
