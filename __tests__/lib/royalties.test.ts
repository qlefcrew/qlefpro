import { validateSplits } from '@/lib/utils'

describe('Royalties Splits', () => {
    it('returns valid for splits summing to 100', () => {
        const result = validateSplits([
            { collaborator: 'A', role: 'Artist', percentage: 50 },
            { collaborator: 'B', role: 'Producer', percentage: 50 },
        ])
        expect(result.valid).toBe(true)
    })

    it('returns validation error for splits summing to 99', () => {
        const result = validateSplits([
            { collaborator: 'A', role: 'Artist', percentage: 99 },
        ])
        expect(result.valid).toBe(false)
    })

    it('returns validation error for more than 10 collaborators', () => {
        const splits = Array(11).fill({ collaborator: 'A', role: 'Artist', percentage: 100 / 11 })
        const result = validateSplits(splits)
        expect(result.valid).toBe(false)
        expect(result.error).toMatch(/10 collaborators/)
    })
})
