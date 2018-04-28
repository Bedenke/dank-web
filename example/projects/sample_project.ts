export default {
  "id": "sample_project",
  "name": "Sample Project",
  "root": {
    "component": "Router",
    "children": [
      {
        "component": "Route",
        "attributes": {
          "path": "/",
          "title": "My First Page"
        },
        "children": [
          {
            "component": "Page",
            "children": [
              {
                "component": "Navigator",
                "children": [
                  {
                    "component": "NavigatorItem",
                    "attributes": { "label": "Sample Page 1", "url": "/sample_page1" }
                  },
                  {
                    "component": "NavigatorItem",
                    "attributes": { "label": "Sample Page 2", "url": "/sample_page2" }
                  }
                ]
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
    ]
  }
}
