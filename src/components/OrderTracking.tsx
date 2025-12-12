import { ArrowLeft, CheckCircle2, Clock, User, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

interface OrderTrackingProps {
  onBack: () => void;
}

export default function OrderTracking({ onBack }: OrderTrackingProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="h-full bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center space-x-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
        </button>
        <div className="flex-1">
          <h2 className="text-[#1F2937]">Order #314</h2>
          <p className="text-[#6B7280]">Placed at 12:30 PM</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-64 bg-gradient-to-br from-[#2D6A4F]/10 to-[#40916C]/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-[#2D6A4F] mx-auto mb-2" />
            <p className="text-[#6B7280]">Tracking your order...</p>
          </div>
        </div>
        {/* Decorative map elements */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-[#2D6A4F] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-3 h-3 bg-[#FFB703] rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#40916C] rounded-full animate-pulse delay-150"></div>
      </div>

      {/* Order Timeline */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-6">
          <TimelineStep
            icon={<CheckCircle2 className="w-6 h-6" />}
            title="Order Received"
            time="12:30 PM"
            status="completed"
          />
          <TimelineStep
            icon={<CheckCircle2 className="w-6 h-6" />}
            title="Being Prepared"
            time="12:35 PM"
            status="completed"
          />
          <TimelineStep
            icon={<Clock className="w-6 h-6" />}
            title="Courier Assigned"
            time="Expected: 12:45 PM"
            status="active"
          />
          <TimelineStep
            icon={<Clock className="w-6 h-6" />}
            title="On the Way"
            time="Expected: 12:50 PM"
            status="pending"
          />
          <TimelineStep
            icon={<Clock className="w-6 h-6" />}
            title="Delivered"
            time="Expected: 1:00 PM"
            status="pending"
          />
        </div>

        {/* Courier Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <p className="text-[#6B7280] mb-4">Your Courier</p>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-[#1F2937]">Ahmed El Mansouri</h4>
              <div className="flex items-center space-x-1 text-[#6B7280] mt-1">
                <span>⭐</span>
                <span>4.9 (250+ deliveries)</span>
              </div>
              <div className="flex items-center space-x-2 text-[#6B7280] mt-2">
                <Clock className="w-4 h-4" />
                <span>Pickup ETA: 5 mins</span>
              </div>
            </div>
            <button className="w-12 h-12 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center hover:bg-[#2D6A4F]/20 transition-colors active:scale-95">
              <Phone className="w-5 h-5 text-[#2D6A4F]" />
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <p className="text-[#6B7280] mb-3">Order Items</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#1F2937]">2x Shawarma</span>
              <span className="text-[#6B7280]">90 MAD</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#1F2937]">1x Pizza Margarita</span>
              <span className="text-[#6B7280]">50 MAD</span>
            </div>
            <div className="h-px bg-[#E5E7EB] my-2"></div>
            <div className="flex items-center justify-between">
              <span className="text-[#1F2937]">Total</span>
              <span className="text-[#2D6A4F]">140 MAD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Button */}
      <div className="bg-white border-t border-[#E5E7EB] px-6 py-4">
        <button
          onClick={() => setShowCancelModal(true)}
          className="w-full py-3 border-2 border-[#DC2626] text-[#DC2626] rounded-xl hover:bg-[#DC2626]/5 transition-all active:scale-95"
        >
          Cancel Order (within 2 minutes)
        </button>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-[#1F2937]">Cancel Order?</h3>
            <p className="text-[#6B7280]">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 bg-[#F3F4F6] text-[#1F2937] rounded-xl hover:bg-[#E5E7EB] transition-colors active:scale-95"
              >
                Keep Order
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] transition-colors active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TimelineStepProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  status: 'completed' | 'active' | 'pending';
}

function TimelineStep({ icon, title, time, status }: TimelineStepProps) {
  const colors = {
    completed: 'bg-[#40916C] text-white',
    active: 'bg-[#FFB703] text-white',
    pending: 'bg-[#E5E7EB] text-[#9CA3AF]'
  };

  return (
    <div className="flex items-start space-x-4 relative">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colors[status]}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-[#1F2937]">{title}</h4>
        <p className="text-[#6B7280]">{time}</p>
      </div>
      {status !== 'pending' && (
        <CheckCircle2 className="w-5 h-5 text-[#40916C]" />
      )}
    </div>
  );
}