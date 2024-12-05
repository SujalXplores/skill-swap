import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Message from '@/models/Message';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: session.user.id },
            { recipient: session.user.id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', session.user.id] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$recipient', session.user.id] },
                    { $eq: ['$read', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const conversationUsers = await User.find({
      _id: { $in: messages.map(m => m._id) }
    });

    const conversations = messages.map(m => {
      const user = conversationUsers.find(u => u._id.toString() === m._id.toString());
      return {
        userId: user._id,
        userName: user.name,
        userImage: user.image,
        lastMessage: m.lastMessage,
        unreadCount: m.unreadCount
      };
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 