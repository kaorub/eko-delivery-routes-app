import { Calc } from '../utils';
it('calculate possible routes', () => {
    const edges = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'
    const calc = new Calc({ edges })

    // I manually calculated the possible routes and found just 3 routes (not 4 as described in the task description)
    expect(calc.run('E', 'D', { limitStops: 4 })).toEqual(3);
    expect(calc.run('E', 'E', { isRoundTrack: true })).toEqual(5);
    expect(calc.run('E', 'E', { isRoundTrack: true, limitCost: 20, canRepeat: true })).toEqual(5);
});

it('calculate cost for the route', () => {
    const edges = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'
    const calc = new Calc({ edges })

    expect(calc.calculateCost('A-B-E')).toEqual(4);
    expect(calc.calculateCost('A-D')).toEqual(10);
    expect(calc.calculateCost('E-A-C-F')).toEqual(8);
    expect(calc.calculateCost('A-D-F')).toEqual(-1);
});
