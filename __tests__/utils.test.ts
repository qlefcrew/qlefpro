/**
 * @jest-environment node
 */
import { validateSplits } from '@/lib/utils'

describe('validateSplits', () => {
    it('returns error for empty array', () => {
        const result = validateSplits([])
        expect(result.valid).toBe(false)
        expect(result.error).toBe('At least one split is required')
    })

    it('returns valid for splits summing to 100', () => {
        const result = validateSplits([
            { collaborator: 'A', role: 'Artist', percentage: 50 },
            { collaborator: 'B', role: 'Producer', percentage: 50 }
        ])
        expect(result.valid).toBe(true)
    })

    it('returns error for splits summing to 99', () => {
        const result = validateSplits([
            { collaborator: 'A', role: 'Artist', percentage: 50 },
            { collaborator: 'B', role: 'Producer', percentage: 49 }
        ])
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Splits must sum exactly to 100%')
    })

    it('returns error for splits summing to 101', () => {
        const result = validateSplits([
            { collaborator: 'A', role: 'Artist', percentage: 50 },
            { collaborator: 'B', role: 'Producer', percentage: 51 }
        ])
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Splits must sum exactly to 100%')
    })
})
