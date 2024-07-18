const express = require("express");
const Booking = require("../models/bookings"); 
const Tour=require("../models/tourmodel")
// Adjust the path as necessary
 // Adjust the path as necessary
const stripe = require("stripe")("sk_test_51PbcTDSIZbr9gJylrHGNSAkBpuaMHW5Y8NATGwD1QXGJ4tiHo46pcWw2bAq5qsX2Ibprwx3JaGLPN4Jf30RpCJK000lYlucTvl");


// Controller functions (you'll need to define these based on your application logic)

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { userid, tourid, price } = req.params;
        const newBooking = await Booking.create({
            user: userid,
            tour: tourid,
            price: price,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user tour');

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: 
                bookings
            
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get checkout session
const getCheckOutSession = async (req, res) => {
    try {
        const tourId = req.params.tourId;

        // Find the tour by ID (this assumes you have a Tour model defined)
        const tour = await Tour.findById(tourId);

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `http://localhost:3000/bookings`,
            cancel_url: `http://localhost:3000/homepage`,
            customer_email: req.user.email,
            client_reference_id: tourId,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: tour.name,
                            description: tour.summary,
                            images: [tour.imageCover]
                        },
                        unit_amount: tour.price * 100,
                    },
                    quantity: 1
                }
            ]
        });

        res.status(200).json({
            status: 'success',
            session
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Routes


module.exports = {createBooking,getCheckOutSession,getBookings};
