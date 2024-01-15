import {describe, it, vi} from 'vitest'


vi.mock('react', async importOriginal => {
    const react = (await importOriginal()) as any;

    return {
        ...react, 
        useReducer: () => {}
    }
})

describe('', () => {
    it('should ', () => {
        console.log("Hello")


        //This causes an error
        const x = <div>test</div>
    });
});
