import { ArrowLeft, CheckCircle2, Clock, User, Phone, MapPin, Package } from 'lucide-react';
import { useState } from 'react';
import { Order } from '../services/api';

interface OrderTrackingProps {
  onBack: () => void;
  activeOrder?: Order | null;
}

export default function OrderTracking({ onBack, activeOrder }: OrderTrackingProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  // If no active order, show empty state
  if (!activeOrder) {
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
            <h2 className="text-[#1F2937]">Order Tracking</h2>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[#1F2937] mb-2">No Active Orders</h3>
            <p className="text-[#6B7280] mb-6">
              You don't have any orders in progress. Browse restaurants and place an order to track it here.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[#2D6A4F] text-white rounded-xl hover:bg-[#40916C] transition-colors active:scale-95"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  const orderTime = activeOrder.createdAt 
    ? new Date(activeOrder.createdAt).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })
    : 'N/A';

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
          <h2 className="text-[#1F2937]">Order #{activeOrder.orderNumber}</h2>
          <p className="text-[#6B7280]">Placed at {orderTime}</p>
        </div>
      </div>

      {/* Enhanced Map Placeholder */}
      <div className="h-64 bg-gradient-to-br from-[#2D6A4F]/10 to-[#40916C]/10 relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #2D6A4F 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.1
        }}></div>
        
        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#2D6A4F', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#FFB703', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path
            d="M 40 60 Q 120 40, 200 80 T 360 120"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8,4"
            className="animate-pulse"
          />
        </svg>

        {/* Restaurant Pin */}
        <div className="absolute top-12 left-10">
          <div className="relative">
            <div className="w-8 h-8 bg-[#2D6A4F] rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#2D6A4F]"></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm text-xs text-[#1F2937]">
              Restaurant
            </div>
            {/* Pulsing ring */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-[#2D6A4F] rounded-full animate-ping opacity-30"></div>
          </div>
        </div>

        {/* Animated Courier */}
        <div className="absolute bottom-20 right-16 animate-bounce">
          <div className="relative">
            <div className="w-10 h-10 bg-[#FFB703] rounded-full flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm text-xs text-[#1F2937]">
              Courier
            </div>
            {/* Speed lines */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2">
              <div className="w-4 h-0.5 bg-[#FFB703] opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Delivery Location Pin */}
        <div className="absolute bottom-16 left-3/4">
          <div className="relative">
            <div className="w-6 h-6 bg-[#40916C] rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#40916C]"></div>
            {/* Pulsing ring */}
            <div className="absolute top-0 left-0 w-6 h-6 bg-[#40916C] rounded-full animate-ping opacity-30"></div>
          </div>
        </div>

        {/* Distance and ETA Info */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#2D6A4F]" />
            <span className="text-sm text-[#1F2937]">~2.5 km • 5-10 min</span>
          </div>
        </div>

        {/* Tracking Status */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
          <p className="text-sm text-[#1F2937] font-medium">🚴 Tracking your order...</p>
        </div>
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
            {activeOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-[#1F2937]">{item.quantity}x {item.name}</span>
                <span className="text-[#6B7280]">{item.price * item.quantity} MAD</span>
              </div>
            ))}
            <div className="h-px bg-[#E5E7EB] my-2"></div>
            <div className="flex items-center justify-between">
              <span className="text-[#1F2937]">Total</span>
              <span className="text-[#2D6A4F]">{activeOrder.total} MAD</span>
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