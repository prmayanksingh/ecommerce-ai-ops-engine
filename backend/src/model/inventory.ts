import { model, Schema } from "mongoose"


export interface IInventory {
    sku: string,
    name: string,
    stockCount: number,
    reservedCount: number,
    lastRestockedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

const inventorySchema = new Schema<IInventory>({
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    stockCount: {
        type: Number,
        required: true,
        min: [0, "Stock count can not be negative"],
        default: 0
    },
    reservedCount: {
        type: Number,
        required: true,
        min: [0, "Reserved count can not be negative"],
        default: 0,
    },
    lastRestockedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

const inventoryModel = model<IInventory>("inventory", inventorySchema);

export default inventoryModel;