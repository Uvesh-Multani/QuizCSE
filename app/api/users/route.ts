import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    await client.connect();
    const database = client.db('quizmaster');
    const users = database.collection('users');

    const result = await users.insertOne({ name, createdAt: new Date() });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ success: false, error: 'Failed to save user' }, { status: 500 });
  } finally {
    await client.close();
  }
}
