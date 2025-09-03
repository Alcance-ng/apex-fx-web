import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests for Paystack callbacks
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { trxref, reference } = req.query;

    // Validate required parameters
    if (!trxref || !reference) {
      console.error('Missing required parameters:', { trxref, reference });
      return res.status(400).json({
        error: 'Missing required parameters',
        received: { trxref, reference }
      });
    }

    // Ensure trxref and reference match (they should be the same for Paystack)
    if (trxref !== reference) {
      console.error('Transaction reference mismatch:', { trxref, reference });
      return res.status(400).json({
        error: 'Transaction reference mismatch',
        trxref,
        reference
      });
    }

    console.log('Paystack callback received:', {
      trxref,
      reference,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    // Verify payment status with Paystack API first
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      console.error('Paystack secret key not configured');
      return res.status(500).json({ error: 'Payment verification not configured' });
    }

    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const verificationData = await verifyResponse.json();

    if (!verifyResponse.ok || verificationData.data.status !== 'success') {
      console.error('Payment verification failed:', {
        status: verifyResponse.status,
        paystackStatus: verificationData.data?.status,
        reference
      });

      // Redirect to dashboard with error
      const errorRedirectUrl = new URL('/user/dashboard', process.env.NEXTAUTH_URL || 'http://localhost:3000');
      errorRedirectUrl.searchParams.set('payment', 'failed');
      errorRedirectUrl.searchParams.set('reference', reference.toString());
      errorRedirectUrl.searchParams.set('error', 'payment_verification_failed');

      return res.redirect(302, errorRedirectUrl.toString());
    }

    console.log('Payment verified successfully:', {
      reference,
      status: verificationData.data.status,
      amount: verificationData.data.amount,
      currency: verificationData.data.currency
    });

    // Payment is successful - redirect to dashboard with success message
    // We don't need to parse the reference format since Paystack has confirmed the payment
    const redirectUrl = new URL('/user/dashboard', process.env.NEXTAUTH_URL || 'http://localhost:3000');
    redirectUrl.searchParams.set('payment', 'success');
    redirectUrl.searchParams.set('reference', reference.toString());

    console.log('Redirecting to:', redirectUrl.toString());

    // Redirect to dashboard
    res.redirect(302, redirectUrl.toString());

  } catch (error) {
    console.error('Paystack callback error:', error);

    // Redirect to dashboard with error
    const redirectUrl = new URL('/user/dashboard', process.env.NEXTAUTH_URL || 'http://localhost:3000');
    redirectUrl.searchParams.set('payment', 'error');
    redirectUrl.searchParams.set('error', 'payment_verification_failed');

    res.redirect(302, redirectUrl.toString());
  }
}
