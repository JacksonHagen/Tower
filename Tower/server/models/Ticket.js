import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const TicketSchema = new Schema (
  {
    eventId: {type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent'},
    accountId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

TicketSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
TicketSchema.virtual('towerEvent', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  justOne: true
})