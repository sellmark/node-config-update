import { SQSEvent, Context } from 'aws-lambda';
import { handler } from './consumer';

// Mock SQSEvent according to your needs
const mockEvent: SQSEvent = {
    Records: [
        {
            messageId: '1',
            receiptHandle: 'string',
            body: JSON.stringify({
                companyId: "1",
                message: "Test message",
            }),
            attributes: {
                ApproximateReceiveCount: '1',
                SentTimestamp: '1234567890',
                SenderId: '123456789012',
                ApproximateFirstReceiveTimestamp: '1234567890'
            },
            messageAttributes: {},
            md5OfBody: 'string',
            eventSource: 'aws:sqs',
            eventSourceARN: 'string',
            awsRegion: 'string'
        },
    ],
};

// Mock Context
const mockContext: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'testFunction',
    functionVersion: '1',
    invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:testFunction',
    memoryLimitInMB: '128',
    awsRequestId: '123456789012',
    logGroupName: '/aws/lambda/testFunction',
    logStreamName: '2019/01/01/[$LATEST]abcdefghijk',
    getRemainingTimeInMillis: () => 30000,
    done: () => null,
    fail: () => null,
    succeed: () => null,
};

handler(mockEvent, mockContext)
    .then(() => console.log('Function executed successfully'))
    .catch(error => console.error('Function execution failed:', error));