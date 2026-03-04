import React from 'react'
import { render, screen } from '@testing-library/react'
import { DropZone } from '@/components/upload/DropZone'

jest.mock('lucide-react', () => ({
    UploadCloud: () => <div data-testid="upload-icon" />,
    FileAudio: () => <div data-testid="file-audio-icon" />
}))

describe('DropZone Component', () => {
    it('Renders the drop zone with correct text', () => {
        const mockSelect = jest.fn()
        render(<DropZone onFileSelect={mockSelect} selectedFile={null} isUploading={false} progress={0} />)

        expect(screen.getByText('Drag & drop your audio file')).toBeInTheDocument()
    })

    it('Shows filename after a valid audio file is passed', () => {
        const mockSelect = jest.fn()
        const file = new File(['dummy content'], 'master.mp3', { type: 'audio/mpeg' })

        render(<DropZone onFileSelect={mockSelect} selectedFile={file} isUploading={false} progress={0} />)

        expect(screen.getByText('master.mp3')).toBeInTheDocument()
    })

    it('Rejects a non-audio file drop via the input element accept attribute', () => {
        const mockSelect = jest.fn()
        render(<DropZone onFileSelect={mockSelect} selectedFile={null} isUploading={false} progress={0} />)
        const input = screen.getByLabelText('Upload audio file') as HTMLInputElement
        expect(input.accept).toBe('audio/mpeg, audio/wav')
    })
})
