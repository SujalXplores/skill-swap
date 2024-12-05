import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Message from '@/models/Message';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { recipientId, content } = await request.json();

    if (!recipientId || !content) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await connectToDatabase();

    const conversationId = Message.generateConversationId(session.user.id, recipientId);

    const message = await Message.create({
      sender: session.user.id,
      recipient: recipientId,
      content,
      conversationId,
    });

    await message.populate('sender', 'name image');
    await message.populate('recipient', 'name image');

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 