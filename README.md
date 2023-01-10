# coin-conversor
An REST API to convert different coin types.

The conversor is based on [BACEN site (Brazilian)](https://www.bcb.gov.br/conversao)

# Usage
The usage method consists in make a GET request to the endpoint `/convert/{VALUE}` which **VALUE** parameter is the value that you want to convert.

In request payload, the expected fields are **origin** and **dest**, that consists in origin and destination currencies, respectively.

**Example:**
```js
GET /convert/200
{
    "origin": "BRL",
    "dest": "USD"
}
```
If it was successful converted, the response will be an object containing **converted** field.

**Example:**
```json
{
  "converted": 38.1715813
}
```

# Contribution
To contribute to this project, you must have to follow the steps:
- Cloning repository
- Installation
## Cloning repository
Just do a `git clone https://github.com/samuk-a/coin-conversor`, no more secrets about this.
## Installation
To install just run
```
cd coin-conversor
npm install
npm install -D
```
The command to populate internal database is `npm run populate`.
This is required because it's not needed a external database structure (mysql, mongodb...)