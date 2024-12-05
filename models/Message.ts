import mongoose, { Model } from 'mongoose';

interface IMessage {
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MessageModel extends Model<IMessage> {
  generateConversationId(userId1: string, userId2: string): string;
}

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  conversationId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

// Create a compound index for the conversationId
messageSchema.index({ conversationId: 1, createdAt: -1 });

// Helper method to generate a unique conversation ID between two users
messageSchema.statics.generateConversationId = function(userId1: string, userId2: string) {
  return [userId1, userId2].sort().join('_');
};

const Message = (mongoose.models.Message || mongoose.model<IMessage, MessageModel>('Message', messageSchema)) as MessageModel;

export default Message; 