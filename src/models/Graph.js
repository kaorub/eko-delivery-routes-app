/**
 * Graph class
 */
class Graph {
    constructor () {
        this.nodes = new Map()
    }

    // adds Node
    addNode (node) {
        if (this.nodes.has(node)) {
            return null
        }
        this.nodes.set(node,  {})
    }

    // adds edges data and cost for it
    addEdge (start, finish, weight) {
        this.nodes.set(start, { ...this.nodes.get(start), [finish]: weight })
    }
}
export default Graph
