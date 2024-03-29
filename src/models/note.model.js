import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    colour: {
      type: String
    },
    archive: {
      type: Boolean,
      default: false
    },
    trash: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String
    },
    collaborator: [
      {
        email: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
