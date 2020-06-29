import Graph from '../models/Graph'

/**
 * Calc class to use method run with parameters to calculate possible delivery routes
 */
export class Calc {
    constructor({ edges }) {
        this.graph = this.getGraphFromRoute(edges)
        this.limitStops = Infinity
        this.isRoundTrack = false
        this.canRepeat = false

        this.keys = Array.from(this.graph.nodes.keys())
        this.visited = {}
        this.path = []
        this.counter = 0

        this.isFirstRound = true
    }

    /**
     * Build graph structure from routes
     * @param {string} routes
     * @returns {Graph}
     */
    getGraphFromRoute (routes) {
        if (typeof routes === 'string') {
            routes = routes.split(', ')
        }
        if (!Array.isArray(routes)) return new Graph()
        const graph = new Graph()
        routes.forEach(route => {
            const [ , start, finish, weight ] = route.match(/(\w)(\w)(\d+)/im)
            graph.addNode(start)
            graph.addNode(finish)
            graph.addEdge(start, finish, weight)
        })
        return graph
    }

    /**
     * Get possible routes with different conditions
     * @param {string} start - start town
     * @param {string} finish - finish town (destination)
     * @param {array} path - variable to store possible paths
     * @param {array} stops - variable to store count of stops done during the search
     * @param {number} cost - variable to store total cost to reach the destination town
     */
    getPossibleRoutes (start, finish, path = [], stops = 0, cost = 0) {
        this.visited[start] = true
        path.push(start)
        stops += 1
        cost += this.getCost(start, finish)

        if ((start === finish && !this.isFirstRound) || stops >= this.limitStops || cost >= this.limitCost) {
            console.log(path)
            this.counter += 1
            stops = 0
            cost = 0
        } else {
            const destinations = Object.keys(this.graph.nodes.get(start))
            for (let i=0; i<destinations.length; i++) {
                const dest = destinations[i]
                if (!this.visited[dest] || this.canRepeat || this.isRoundTrack) {
                    this.isFirstRound = false
                    this.getPossibleRoutes(dest, finish, path, stops, cost)
                }
            }
        }

        path.pop()

        this.visited[start] = false
    }

    /**
     * Get cost in number
     * @param start
     * @param dest
     * @returns {number}
     */
    getCost (start, dest) {
        const exists = this.graph.nodes.get(start)[dest]
        return exists ? parseInt(exists) : 0
    }

    /**
     * @private
     * Set local visited mark of each town to false
     */
    setVisited () {
        const keys = this.keys
        keys.forEach((key) => {
            this.visited[key] = false
        })
    }

    /**
     * @private
     * Set limitation of stops
     * @param limitStops
     */
    setLimitStops (limitStops) {
        this.limitStops = limitStops
    }

    /**
     * @private
     * Set the condition if the start and destination towns are the same
     * @param boolean isRoundTrack
     */
    setIsRoundTrack (isRoundTrack) {
        this.isRoundTrack = isRoundTrack
    }

    /**
     * @private
     * Set the condition if the same route can used twice in a delivery route
     * @param boolean canRepeat
     */
    setCanRepeat (canRepeat) {
        this.canRepeat = canRepeat
    }

    /**
     * @private
     * Set limitation od costs
     * @param limitCost
     */
    setLimitCost (limitCost) {
        this.limitCost = limitCost
    }
    /**
     * @public
     * @param {string} start - start town
     * @param {string} finish - destination town
     * @param {object} args - arguments
     * @returns {number} count of possible routes
     */
    run (start, finish, ...args) {
        const { isRoundTrack, limitStops, limitCost, canRepeat } = args[0]
        this.setVisited()
        this.setLimitStops(limitStops || Infinity)
        this.setLimitCost(limitCost || Infinity)
        this.setIsRoundTrack(isRoundTrack)
        this.setCanRepeat(canRepeat)
        this.getPossibleRoutes(start, finish, this.path)
        return this.counter
    }
    /**
     * @public
     * get calculated cost for route
     * @param {string} route String like 'ED'
     * @returns {number} cost to reach the destination town
     */
    calculateCost (route) {
        if (!route || typeof route !== 'string') return -1
        const paths = route.trim().split('-')
        let cost = 0
        for (let i=0; i<paths.length - 1; i++) {
            const start = paths[i]
            const finish = paths[i + 1]
            if (this.graph.nodes.has(start) && this.graph.nodes.get(start)[finish]) {
                cost += parseInt(this.graph.nodes.get(start)[finish])
            }
            else {
                return -1
            }
        }
        return cost
    }
}
