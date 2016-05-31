import boto3
import argparse

parser = argparse.ArgumentParser(description='Generate an S3 signed URL')
parser.add_argument('-b', '--bucket', help='bucket name')
parser.add_argument('-k', '--key', help='prefix/key')
args = parser.parse_args()

s3 = boto3.client('s3')

url = s3.generate_presigned_url(
    ClientMethod='get_object',
    Params={
        'Bucket': args.bucket,
        'Key': args.key
    }
)

print url
