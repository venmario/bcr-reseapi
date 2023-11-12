# bcr-restapi
example of REST API documentation:

GET /cars
Mengembalikan list cars, dengan beberapa query string :
driver : Filter berdasarkan sewa mobil memiliki supir atau tidak
tanggal : Filter sewa mobil berdasarkan tanggal
waktu : Filter sewa mobil berdasarkan jam
jumlah(optional) : Filter sewa mobil berdasarkan kapasitas mobil

Request:
GET /cars?driver=true&tanggal=2023-11-14&waktu=12&jumlah=

Response:
render cars.html beserta daftar mobil yang tersedia berdasarkan filter

GET /cars/:id
Mengembalikan satu mobil berdasarkan id mobil

Request: 
GET /cars/08cbd537-497f-4305-b7b4-e7493c703a2c

Response:
{
  "id":"08cbd537-497f-4305-b7b4-e7493c703a2c",
  "plate":"ZAG-8112",
  "manufacture":"Ford",
  "model":"F150","image":"./images/car19.min.jpg",
  "rentPerDay":600000,
  "capacity":6,
  "description":"",
  "availableAt":"2023-11-17T05:00:00.000Z",
  "transmission":"Automatic",
  "available":false,
  "type":"Convertible",
  "driver":true,
  "year":2021,
  "options":[
              "CD (Single Disc)",
              "Airbag: Driver",
            ],
  "specs":["All-position 3-point seat belts -inc: outboard pretensioners & force limiters,]
  }


POST cars
Membuat mobil baru

Request:
POST /cars

{
  "plate": "DBH-3491",
  "manufacture": "Ford",
  "model": "F150",
  ...
}

Response :
status:200
data:
{
  "plate": "DBH-3491",
  "manufacture": "Ford",
  "model": "F150",
  ...
  "id": "08cbf532-497f-4305-b7b4-e7434c703a2c",
}

Patch cars/:id
Mengedit Mobil berdasarkan id

Request:
PATCH /cars/08cbf532-497f-4305-b7b4-e7434c703a2c:
{
  "plate": "DBH-3491 edit",
  "manufacture": "Ford",
  "model": "F150",
  ...
}

Response
status:200
data:
{
  "plate": "DBH-3491 edit",
  "manufacture": "Ford",
  "model": "F150",
  ...
}

Delete cars/:id
Menghapus Mobil berdasarkann id

Request:
cars/08cbf532-497f-4305-b7b4-e7434c703a2c

Response:
status : 200
data : {}
