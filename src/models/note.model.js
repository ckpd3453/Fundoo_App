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
      type: String
    },
    trash: {
      type: String
    },
    userId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
