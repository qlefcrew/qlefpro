/**
 * @jest-environment node
 */
import { POST } from '@/app/api/stripe/webhook/route'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase'

jest.mock('@/lib/stripe', () => ({
    stripe: {
        webhooks: {
            constructEvent: jest.fn(),
        }
    }
}))

const mockSupabaseInstance = {
    from: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({ error: null })
}

jest.mock('@/lib/supabase', () => ({
    createServerClient: jest.fn().mockImplementation(() => mockSupabaseInstance)
}))

describe('Stripe Webhook API', () => {
    it('POST /api/stripe/webhook with invalid signature returns 400', async () => {
        (stripe.webhooks.constructEvent as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid signature')
        })
        const req = new Request('http://localhost/api/stripe/webhook', {
            method: 'POST',
            headers: { 'stripe-signature': 'invalid' },
            body: 'raw body'
        })
        const res = await POST(req)
        expect(res.status).toBe(400)
    })

    it('Valid checkout.session.completed event updates subscription_status to "active"', async () => {
        (stripe.webhooks.constructEvent as jest.Mock).mockReturnValue({
            type: 'checkout.session.completed',
            data: {
                object: {
                    customer: 'cus_123',
                    client_reference_id: 'clerk_123'
                }
            }
        })

        const req = new Request('http://localhost/api/stripe/webhook', {
            method: 'POST',
            headers: { 'stripe-signature': 'valid' },
            body: 'body'
        })

        // We expect successful handling, returning 200
        const res = await POST(req)
        expect(res.status).toBe(200)

        // Check that update is called
        expect(mockSupabaseInstance.update).toHaveBeenCalledWith(expect.objectContaining({
            subscription_status: 'active'
        }))
        expect(mockSupabaseInstance.eq).toHaveBeenCalledWith('clerk_id', 'clerk_123')
    })
})
