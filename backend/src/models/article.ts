import { model, Schema, Document } from 'mongoose';

export interface ArticleDocument extends Document {
  title: string;
  text: string;
  pictures: string[];
  uploadDate: Date;
}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    pictures: { type: Array, required: true },
    uploadDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

ArticleSchema.pre('save', async function (next) {
  let article = this as ArticleDocument;
});

const ArticleModel = model<ArticleDocument>('Article', ArticleSchema);

export default ArticleModel;
