## Project description

### Calculate the delivery routes cost

1. ```
   yarn
   ```
2. ```
   yarn start
   ```
3. open [http://localhost:3000](http://localhost:3000)
4. input the edges defined possible routes from A to B.

    4.1. Format input: strings like <start><finish><cost> divided by ','\
        where\
        - start - starting town
        - finish - town of destination
        - cost - price for that route\
    4.2. Example: AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1 (set up in app by default)
5. click "Set up graph from edges" button to build graph structure that will be used in application
6. input route that you want to calculate cost for\
    6.1. Format input: string containing towns and divided by '-'\
    6.2. Example: A-C-E
7. click "Find cost for route" to calculate the total cost 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
