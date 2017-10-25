# Geodo

This is an study/POC project to create a way for the someone to register in the app and create a todo list that is going to be have a geographic location, somehow similar to reminders on iPhone but meant to be used in a regular browser or by a mobile device

# Technology

This project uses nodejs for the api and a big number of other components:

* Express
* Mongoose
* Underscore
* bCrypt
* jsonwebtoken
* config

>> go to *package.json* to check more details

# Basic locations for localhost validations

Since Vancouver downtown is 49.282729, -123.120738 we need to query whatever is near my current location passing the radius in meters that we want to be considered

http://localhost:3000/todos/near?longitude=49.275729&latitude=-123.120738&distance=100

English bay:
```json
{
	"title": "English bay",
    "description": "2017",
    "done": false,
    "location": [
        49.286502,
        -123.141855
    ]
}
```

Kits:
```json
{
	"title": "Kitsilano",
    "description": "2017",
    "done": false,
    "location": [
        49.266567,
        -123.153185
    ]
}
```

Yaletown:
```json
{
	"title": "Yaletown",
    "description": "2017",
    "done": false,
    "location": [
        49.275303,
        -123.124174
    ]
}
```

Gastown:
```json
{
	"title": "Gastown",
    "description": "2017",
    "done": false,
    "location": [
        49.281911,
        -123.104948
    ]
}
```

# References

http://blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/