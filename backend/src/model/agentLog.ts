import { model, Schema } from "mongoose";


export type AgentLogStatus = "SUCCESS" | "GUARDRAIL_BLOCKED" | "FAILED";

export interface IAgentLog {
    executionId: string, //groups multiple tool steps into one run.
    operatorPrompt: string,
    toolName: string,
    toolInput: Record<string, any>, // flexible JSON for any tool arguments
    toolOutput?: Record<string, any>, // flexible JSON for any tool arguments
    status: AgentLogStatus,
    guardrailTriggered: boolean, // tracks if safety rules blocked an action
    guardrailReason?: string,
    createdAt?: Date,
    updatedAt?: Date
}

const agentLogSchema = new Schema<IAgentLog>({
    executionId: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    operatorPrompt: {
        type: String,
        required: true,
        trim: true,
    },
    toolName: {
        type: String,
        required: true,
        trim: true,
    },
    toolInput: {
        type: Schema.Types.Mixed,
        required: true,
    },
    toolOutput: {
        type: Schema.Types.Mixed,
        default: null
    },
    status: {
        type: String,
        enum: ["SUCCESS", "GUARDRAIL_BLOCKED", "FAILED"],
        required: true,
    },
    guardrailTriggered: {
        type: Boolean,
        required: true,
        default: false,
    },
    guardrailReason: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});


const agentModel = model<IAgentLog>("AgentLog", agentLogSchema);

export default agentModel;