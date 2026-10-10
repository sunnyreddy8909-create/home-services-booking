import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Painting', 'Appliance Repair', 'General Maintenance'],
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, default: '2 hours' },
    location: { type: String, default: 'Your Area' },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
