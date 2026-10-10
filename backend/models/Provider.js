import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String, default: '3+ years' },
    location: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    bio: { type: String, default: '' },
    availability: { type: String, default: 'Mon-Sat' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;
