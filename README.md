# Binar Car Rental - restapi

## Run this project

```
$ npm i
$ npm run dev
$ knex migrate:latest
$ knex seed:run
```
## Example of REST API documentation:


## Landing Page 
### Request
`GET /`
- Method : GET
- Header :
  - Content-Type: application/html
  - Accept: application/html
### Response
`Render sebuah landing page`

## Rent a car page
`GET /cars`
- Method : GET
- Header :
  - Content-Type: application/html
  - Accept: application/html

Mengembalikan list cars, dengan beberapa query string :
- driver : Filter berdasarkan sewa mobil memiliki supir atau tidak
- tanggal : Filter sewa mobil berdasarkan tanggal
- waktu : Filter sewa mobil berdasarkan jam
- jumlah(optional) : Filter sewa mobil berdasarkan kapasitas mobil

### Request:
`GET /cars?driver=true&tanggal=2023-11-14&waktu=12&jumlah=`

### Response:
`render cars.html beserta daftar mobil yang tersedia berdasarkan filter`

## User Authentication
### Request
`POST /login`
- Method : POST
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body
```json
{
  "email": "superadmin@gmail.com",
  "password": "superadmin"
}
```
### Response
> status code 200

```json
{
  "token": "string"
}
```
## Get All Cars

### Request
`GET api/cars`
- Method : GET
- Header:
  - Content-Type: application/json
  - Authorization: Bearer token
### Response
> status code 200
```json
[
  {
        "id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
        "plate": "DBH-3491",
        "manufacture": "Ford",
        "model": "F150",
        "image": "./images/car01.min.jpg",
        "rentPerDay": 200000,
        "capacity": 2,
        "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
        "availableAt": "2023-11-27T05:00:00.000Z",
        "transmission": "Automatic",
        "available": true,
        "type": "Sedan",
        "driver": false,
        "year": 2022,
        "options": [
            "Cruise Control",
            "Tinted Glass",
            "Tinted Glass",
            "Tinted Glass",
            "AM/FM Stereo"
        ],
        "specs": [
            "Brake assist",
            "Leather-wrapped shift knob",
            "Glove box lamp",
            "Air conditioning w/in-cabin microfilter",
            "Body color folding remote-controlled pwr mirrors",
            "Dual-stage front airbags w/occupant classification system"
        ],
        "created_at": "2023-11-22T17:01:41.814Z",
        "updated_at": null,
        "deleted_at": null,
        "created_by": 1,
        "updated_by": null,
        "deleted_by": null
    },
    {
        "id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
        "plate": "WXB-3984",
        "manufacture": "BMW",
        "model": "X5",
        "image": "./images/car02.min.jpg",
        "rentPerDay": 800000,
        "capacity": 6,
        "description": " Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
        "availableAt": "2023-11-27T08:00:00.000Z",
        "transmission": "Automatic",
        "available": false,
        "type": "Convertible",
        "driver": true,
        "year": 2019,
        "options": [
            "Keyless Entry",
            "Power Windows",
            "MP3 (Single Disc)",
            "CD (Multi Disc)",
            "Navigation"
        ],
        "specs": [
            "Rear passenger map pockets",
            "Electrochromic rearview mirror",
            "Dual chrome exhaust tips",
            "Locking glove box",
            "Pwr front vented disc/rear drum brakes"
        ],
        "created_at": "2023-11-22T17:01:41.814Z",
        "updated_at": null,
        "deleted_at": null,
        "created_by": 1,
        "updated_by": null,
        "deleted_by": null
    },
]
```

## Get car by id
Mengembalikan satu mobil berdasarkan id mobil
### Request
`GET api/cars/:id`
- Method : GET
- Header:
  - Content-Type: application/json
  - Authorization: Bearer token


### Response:
```json
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
"specs":["All-position 3-point seat belts -inc: outboard pretensioners & force limiters"]
}
```
## Create car
Membuat mobil baru

### Request:
`POST api/cars`
- Method : POST
- Header:
  - Content-Type: application/json
  - Authorization: Bearer token
  - Body
```json
{
        "id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
        "plate": "WXB-3984",
        "manufacture": "BMW",
        "model": "X5",
        "image": "./images/car02.min.jpg",
        "rentPerDay": 800000,
        "capacity": 6,
        "description": " Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
        "availableAt": "2023-11-27T08:00:00.000Z",
        "transmission": "Automatic",
        "available": false,
        "type": "Convertible",
        "driver": true,
        "year": 2019,
        "options": [
            "Keyless Entry",
            "Power Windows",
            "MP3 (Single Disc)",
            "CD (Multi Disc)",
            "Navigation"
        ],
        "specs": [
            "Rear passenger map pockets",
            "Electrochromic rearview mirror",
            "Dual chrome exhaust tips",
            "Locking glove box",
            "Pwr front vented disc/rear drum brakes"
        ],
  }
```

### Response :
> status code 200
```json
{
"plate": "DBH-3491",
"manufacture": "Ford",
"model": "F150",
...
"id": "08cbf532-497f-4305-b7b4-e7434c703a2c",
}
```
## Update Car
Mengedit Mobil berdasarkan id
### Request:

`Patch api/cars/:id`
- Method : PATCH
- Header:
  - Content-Type: application/json
  - Authorization: Bearer token
  - Body
```json
{
"plate": "DBH-3491 edit",
"manufacture": "Ford",
"model": "F150",
...
}
```

### Response:
> status code 200
data:
{
"plate": "DBH-3491 edit",
"manufacture": "Ford",
"model": "F150",
...
}

## Delete Car
Menghapus Mobil berdasarkann id
### Request
`DElETE cars/:id`
- Method : DELETE
- Header:
  - Content-Type: application/json
  - Authorization: Bearer token

### Response:
> status code 200
```json
{}
```
