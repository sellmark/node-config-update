import * as AWS from 'aws-sdk';
import { PrismaClient } from '@prisma/client';
import { SQSEvent, Context } from 'aws-lambda';

const s3 = new AWS.S3();
const prisma = new PrismaClient();


//TODO generate zod model for queue message to validate it incoming
export const handler = async (event: SQSEvent, context: Context): Promise<void> => {
    for (const record of event.Records) {
        const body = JSON.parse(record.body);
        const id = parseInt(body.companyId); // Zod will do that, now we assume it's there

        const data = await prisma.company.findUnique({
            where: { id: id },
            include: {
                Game: true // Correct for fetching related records
            }
        });

        if (data) {
            const jsonData = JSON.stringify(data);
            const uploadResult = await uploadJsonToS3(`data-${data.cdkey}.json`, jsonData);
            console.log(`Upload successful: ${uploadResult.Location}`);
        }
    }
};

async function uploadJsonToS3(fileName: string, jsonData: string): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
        Bucket: 'company-games', // Replace with your actual S3 bucket name
        Key: fileName,
        Body: jsonData,
        ContentType: 'application/json',
    };

    return s3.upload(params).promise();
}