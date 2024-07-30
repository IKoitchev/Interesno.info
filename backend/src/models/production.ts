import { model, Schema, Document } from 'mongoose';

export interface ProductionDocument extends Document {
    link: string;
    title: string;
    place: string;
    dates: Date[];
}

const ProductionSchema: Schema = new Schema(
    {
        link: { type: String, required: true },
        title: { type: String, required: true },
        place: { type: String, required: true },
        dates: { type: Array, required: true },
    },
    { timestamps: true, versionKey: false }
);

ProductionSchema.pre('save', async function (next) {
    let production = this as ProductionDocument;
});

const ProductionModel = model<ProductionDocument>('Production', ProductionSchema);

export default ProductionModel;
