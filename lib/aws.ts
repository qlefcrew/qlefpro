import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export async function getPresignedPutUrl(
    key: string,
    contentType: string,
    size: number
) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        ContentType: contentType,
        ContentLength: size,
    })

    return getSignedUrl(s3Client, command, {
        expiresIn: parseInt(process.env.AWS_S3_PRESIGN_EXPIRES_IN || '3600'),
    })
}
