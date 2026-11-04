import{ model, Schema } from "mongoose";

export interface IOrderItem {
    sku: string,
    name: string,
    quantity: number,
    unitPrice: number
}

export interface IOrder {
    orderId: string,
    customerId: string,
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED",
    items: IOrderItem[],
    shippingAddress: string,
    returnStatus: "NONE" | "REQUESTED",
    rmaNumber?: string,
    createdAt?: Date,
    updatedAt?: Date
}

const orderItemSchema = new Schema<IOrderItem>({
    sku: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    _id: false
})

const orderSchema = new Schema<IOrder>({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    customerId: {
        type: String,
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PENDING"
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: [
            (val: IOrderItem[]) => val.length > 0,
            "Order must Contain at least one item",
        ]
    },
    shippingAddress: {
        type: String,
        required: true
    },
    returnStatus: {
        type: String,
        enum: ["NONE", "REQUESTED"],
        default: "NONE"
    },
    rmaNumber: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const orderModel = model<IOrder>("Orders", orderSchema);

export default orderModel;