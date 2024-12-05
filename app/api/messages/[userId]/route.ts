import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Message from '@/models/Message';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDatabase();

    const conversationId = Message.generateConversationId(session.user.id, params.userId);

    // Get messages and mark unread ones as read
    const messages = await Message.find({
      conversationId,
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name image')
      .populate('recipient', 'name image');

    // Mark messages as read
    await Message.updateMany(
      {
        conversationId,
        recipient: session.user.id,
        read: false,
      },
      { read: true }
    );

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 