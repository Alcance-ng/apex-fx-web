import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests for verification
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ error: 'Reference is required' });
    }

    console.log('Verifying payment with Paystack:', { reference });

    // Verify payment with Paystack API
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      console.error('Paystack secret key not configured');
      return res.status(500).json({ error: 'Payment verification not configured' });
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const verificationData = await response.json();

    if (!response.ok) {
      console.error('Paystack verification failed:', verificationData);
      return res.status(400).json({
        error: 'Payment verification failed',
        details: verificationData
      });
    }

    console.log('Paystack verification successful:', {
      reference,
      status: verificationData.data.status,
      amount: verificationData.data.amount,
      currency: verificationData.data.currency
    });

    // Check if payment was successful
    if (verificationData.data.status !== 'success') {
      return res.status(400).json({
        error: 'Payment not successful',
        status: verificationData.data.status
      });
    }

    // Parse course and user IDs from reference
    const referenceStr = reference;
    const courseMatch = referenceStr.match(/^COURSE-([a-f0-9-]+)-USER-([a-f0-9-]+)-T(\d+)$/);

    if (!courseMatch) {
      console.error('Invalid reference format for verification:', reference);
      return res.status(400).json({
        error: 'Invalid reference format',
        reference,
        expectedFormat: 'COURSE-{courseId}-USER-{userId}-T{timestamp}'
      });
    }

    const courseId = courseMatch[1];
    const userId = courseMatch[2];

    // TODO: Update your database with the payment verification
    // This should include:
    // 1. Mark the course enrollment as paid
    // 2. Update payment status
    // 3. Grant course access to the user
    // 4. Send confirmation email

    console.log('Payment verified and processed:', {
      courseId,
      userId,
      amount: verificationData.data.amount,
      reference
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        reference,
        courseId,
        userId,
        amount: verificationData.data.amount,
        currency: verificationData.data.currency,
        status: verificationData.data.status
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      error: 'Internal server error during payment verification',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
