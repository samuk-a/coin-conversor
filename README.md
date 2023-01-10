# coin-conversor
An REST API to convert different coin types.

The conversor is based on [BACEN site (Brazilian)](https://www.bcb.gov.br/conversao)

## Usage
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