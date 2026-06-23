app.post("/book", async (req, res) => {
  try {

    const booking = req.body;

    const existingBooking = bookings.find(
      (b) =>
        b.checkIn === booking.checkIn &&
        b.slot === booking.slot
    );

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message:
          "Selected slot is already booked for this date."
      });
    }

    const bookingId =
      "BK" + String(bookingCounter).padStart(4, "0");

    bookingCounter++;

    const bookingData = {
      bookingId,
      ...booking
    };

    bookings.push(bookingData);

    // Email Section
    try {

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL,
        subject: `New Booking ${bookingId}`,
        html: `
          <h2>New Booking Received</h2>

          <p><b>Booking ID:</b> ${bookingId}</p>
          <p><b>Name:</b> ${booking.name}</p>
          <p><b>Email:</b> ${booking.email}</p>
          <p><b>Phone:</b> ${booking.phone}</p>
          <p><b>Guests:</b> ${booking.guests}</p>
          <p><b>Check In:</b> ${booking.checkIn}</p>
          <p><b>Check Out:</b> ${booking.checkOut}</p>
          <p><b>Slot:</b> ${booking.slot}</p>
        `
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: `Booking Confirmation ${bookingId}`,
        html: `
          <h2>Your Booking is Confirmed</h2>

          <p>Hello ${booking.name},</p>

          <p>Your booking has been successfully confirmed.</p>

          <h3>Booking ID : ${bookingId}</h3>

          <p>Check In : ${booking.checkIn}</p>
          <p>Check Out : ${booking.checkOut}</p>
          <p>Guests : ${booking.guests}</p>
          <p>Slot : ${booking.slot}</p>

          <p>Thank you for choosing us.</p>
        `
      });

    } catch (mailErr) {
      console.log("Email Error:", mailErr.message);
    }

    res.status(200).json({
      success: true,
      booking: bookingData
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});