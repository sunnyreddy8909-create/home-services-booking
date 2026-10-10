import express from 'express';
import Booking from '../models/Booking.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'customer') {
      filter = { customer: req.user.id };
    } else if (req.user.role === 'provider') {
      filter = { provider: req.user.id };
    }
    // admin sees all bookings

    const bookings = await Booking.find(filter)
      .populate('customer', 'name email phone')
      .populate('provider', 'name specialty rating')
      .populate('service', 'title category price')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings.' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('provider', 'name specialty rating')
      .populate('service', 'title category price duration');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (req.user.role !== 'admin' && 
        booking.customer.toString() !== req.user.id && 
        booking.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to view this booking.' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch booking.' });
  }
});

router.post('/', protect, authorize('customer', 'admin'), async (req, res) => {
  try {
    const { provider, service, bookingDate, bookingTime, location, notes } = req.body;

    if (!provider || !service || !bookingDate || !bookingTime || !location) {
      return res.status(400).json({ message: 'Booking details are incomplete.' });
    }

    const booking = await Booking.create({
      customer: req.user.id,
      provider,
      service,
      bookingDate,
      bookingTime,
      location,
      notes,
      status: 'Pending',
    });

    const populatedBooking = await booking.populate('customer', 'name email phone')
      .populate('provider', 'name specialty')
      .populate('service', 'title category price');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking.', error: error.message });
  }
});

router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (req.user.role === 'provider' && booking.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Providers can only update their own bookings.' });
    }

    if (req.user.role === 'customer' && booking.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Customers can only cancel their own bookings.' });
    }

    booking.status = status;
    await booking.save();

    const updatedBooking = await booking.populate('customer', 'name email')
      .populate('provider', 'name specialty')
      .populate('service', 'title category');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status.' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { bookingDate, bookingTime, location, notes } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (req.user.role === 'customer' && booking.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own bookings.' });
    }

    if (bookingDate) booking.bookingDate = bookingDate;
    if (bookingTime) booking.bookingTime = bookingTime;
    if (location) booking.location = location;
    if (notes !== undefined) booking.notes = notes;

    await booking.save();

    const updatedBooking = await booking.populate('customer', 'name email')
      .populate('provider', 'name specialty')
      .populate('service', 'title category');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking.' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (req.user.role === 'customer' && booking.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own bookings.' });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'customer') {
      return res.status(403).json({ message: 'You do not have permission to delete this booking.' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete booking.' });
  }
});

export default router;
