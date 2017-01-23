# Image Search Abstraction Layer

## How to Use

### Searching Images

Search an image. This is an example on how to search images with the term *flowers*. You can replace *flowers* with your own keywords.

    https://img-srch-abstraction.herokuapp.com/api/search/flowers

### Pagination With the Offset Query

You may also include an optional query `?offset=1` to paginate through the search results.

Below is an example of how to paginate through 3 pages of the search term *mansion*.

    https://img-srch-abstraction.herokuapp.com/api/search/mansion?offset=3

### View the Latest Search Terms

To view the latest search terms.

    https://img-srch-abstraction.herokuapp.com/api/latest

## How to Run on Local Machine

#### prerequisites

* Node ^7.4.0

----
    npm install
    node app.js

Navigate to `http://localhost:3000`