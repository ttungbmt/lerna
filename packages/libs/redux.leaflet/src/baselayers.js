export default {
    google: {
        "control": "basemap",
        "title": "Google",
        "active": true,
        "type": "tile",
        "options": {
            "url": "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
            "subdomains": ["mt0", "mt1", "mt2", "mt3"],
            "attribution": "Map data &copy; <a href='https://www.google.com/maps'>Google Maps</a>"
        }
    },
    openstreet: {
        "control": "basemap",
        "title": "OpenStreetMap",
        "type": "tile",
        "options": {
            "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "attribution": "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }
    },
    terrain: {
        "control": "basemap",
        "title": "Địa hình",
        "type": "tile",
        "options": {
            "url": "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
            "subdomains": ["mt0", "mt1", "mt2", "mt3"],
            "attribution": "Map data &copy; <a href='https://www.google.com/maps'>Google Maps</a>"
        }
    },
    hybrid: {
        "control": "basemap",
        "title": "Tổng hợp",
        "type": "tile",
        "options": {
            "url": "http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
            "subdomains": ["mt0", "mt1", "mt2", "mt3"],
            "attribution": "Map data &copy; <a href='https://www.google.com/maps'>Google Maps</a>"
        }
    }
}