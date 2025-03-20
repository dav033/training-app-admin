import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const uploadFileAws = async (file: File): Promise<string> => {
  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;
  const region = process.env.NEXT_PUBLIC_AWS_REGION!;

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const fileKey = `uploads/${Date.now()}_${file.name}`;

  const fileBuffer = new Uint8Array(await file.arrayBuffer());

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: file.type,
    ACL: "public-read" as const,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));

    return `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error("Error subiendo la imagen: ", error);
    throw error;
  }
};

