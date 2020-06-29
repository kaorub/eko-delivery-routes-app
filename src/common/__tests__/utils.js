import { Calc } from '../utils';
describe('calculate possible routes', () => {
    let calc = null

    beforeEach(() => {
        const edges = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'
        calc = new Calc({edges})
    })

    // I manually calculated the possible routes and found just 3 routes (not 4 as described in the task description)
    it('routes for ED and with limitation of stops equals 4 without usage the same route twice', () => {
        expect(calc.run('E', 'D', { limitStops: 4 })).toEqual(3);
    })
    it('routes for EE without usage the same route twice', () => {
        expect(calc.run('E', 'E', { isRoundTrack: true })).toEqual(5);
    })
    it('routes for EE with usage the same route twice and limit cost set to 20', () => {
        expect(calc.run('E', 'E', { isRoundTrack: true, limitCost: 20, canRepeat: true })).toEqual(4);
    })
});

it('calculate cost for the route', () => {
    const edges = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'
    const calc = new Calc({ edges })

    expect(calc.calculateCost('A-B-E')).toEqual(4);
    expect(calc.calculateCost('A-D')).toEqual(10);
    expect(calc.calculateCost('E-A-C-F')).toEqual(8);
    expect(calc.calculateCost('A-D-F')).toEqual(-1);
});
