import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    photo: {
      type: String,
      default: 'https://www.gravatar.com/avatar/?d=mp&f=y',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'mongodb_contacts',
  },
);

// Add index for faster queries by userId
contactsSchema.index({ userId: 1 });

const contacts = model('contacts', contactsSchema);
export default contacts;
