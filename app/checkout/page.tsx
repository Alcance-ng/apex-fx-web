'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, ArrowPathIcon, BookOpenIcon, ChartBarSquareIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const purchaseCourse = async (courseId: string, token: string) => {
    const response = await fetch(`${BASE_URL}/courses/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate course purchase');
    }

    return response.json();
  };

  const subscribeToSignal = async (amount: number, planCode: string, token: string) => {
    const response = await fetch(`${BASE_URL}/subscription/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to kobo (smallest currency unit)
        plan: planCode
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate signal subscription');
    }

    return response.json();
  };

  if (!searchParams) {
    return (
  <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  const itemId = searchParams.get('id');
  const itemName = searchParams.get('name');
  const itemDescription = searchParams.get('description');
  const itemAmount = searchParams.get('amount');
  const itemType = searchParams.get('type');
  const itemDuration = searchParams.get('duration');
  const itemInterval = searchParams.get('interval');

  if (!itemId || !itemName || !itemAmount) {
    return (
  <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Checkout Request</h1>
          <Link
            href="/user/dashboard"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-lime-600 hover:to-emerald-600 transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!session?.accessToken) {
      setError('Authentication required. Please log in again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let paymentUrl: string;

      if (itemType === 'course') {
        const response = await purchaseCourse(itemId!, session.accessToken);
        paymentUrl = response.payment.paymentUrl;
      } else {
        // For signals, we need the plan_code from the URL params
        const planCode = searchParams.get('plan_code');
        if (!planCode) {
          throw new Error('Plan code is required for signal subscription');
        }

        const response = await subscribeToSignal(parseFloat(itemAmount!), planCode, session.accessToken);
        paymentUrl = response.authorization_url;
      }

      // Redirect to payment URL
      window.location.href = paymentUrl;
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/user/dashboard"
            className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
              <p className="text-lime-200/80">Review your order details below</p>
            </div>

            {/* Item Card */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  itemType === 'course'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                    : 'bg-gradient-to-br from-emerald-500 to-lime-500'
                }`}>
                  {itemType === 'course' ? (
                    <BookOpenIcon className="h-6 w-6 text-white" />
                  ) : (
                    <ChartBarSquareIcon className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      itemType === 'course'
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-200 border border-blue-400/30'
                        : 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-200 border border-green-400/30'
                    }`}>
                      {itemType === 'course' ? (
                        <>
                          <BookOpenIcon className="h-3 w-3 mr-1" />
                          Course
                        </>
                      ) : (
                        <>
                          <ChartBarSquareIcon className="h-3 w-3 mr-1" />
                          Signal Plan
                        </>
                      )}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{itemName}</h3>
                  <p className="text-sm text-lime-200/80 leading-relaxed">{itemDescription}</p>
                </div>
              </div>

              {/* Item Details */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-lime-300/70">Price</span>
                  <span className="text-lg font-semibold text-white">${itemAmount}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-lime-300/70">Type</span>
                  <span className="text-sm text-white capitalize">{itemType}</span>
                </div>
                {itemType === 'course' && itemDuration && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-lime-300/70">Duration</span>
                    <span className="inline-flex items-center text-sm text-emerald-200">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {itemDuration}
                    </span>
                  </div>
                )}
                {itemType === 'signal' && itemInterval && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-lime-300/70">Interval</span>
                    <span className="inline-flex items-center text-sm text-lime-200">
                      <ArrowPathIcon className="h-4 w-4 mr-1" />
                      {itemInterval}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm font-medium text-lime-300/70">Total</span>
                  <span className="text-2xl font-bold text-white">${itemAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>

              {/* Payment Options Placeholder */}
              <div className="space-y-3">
                <div className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:border-lime-400/50 transition-colors duration-300">
                  <div className="w-4 h-4 border-2 border-lime-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Credit/Debit Card</div>
                    <div className="text-xs text-lime-300/70">Visa, Mastercard, American Express</div>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:border-lime-400/50 transition-colors duration-300">
                  <div className="w-4 h-4 border-2 border-white/30 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">PayPal</div>
                    <div className="text-xs text-lime-300/70">Pay with your PayPal account</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-lime-300/70">Subtotal</span>
                  <span className="text-white">${itemAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-lime-300/70">Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-white">${itemAmount}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  itemType === 'course'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-400 disabled:to-blue-500'
                    : 'bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 disabled:from-emerald-400 disabled:to-lime-400'
                } text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Complete Purchase - $${itemAmount}`
                )}
              </button>
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-lime-300/70">
                <CheckCircleIcon className="h-4 w-4" />
                <span>Secure checkout powered by SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
